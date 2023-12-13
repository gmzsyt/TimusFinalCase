import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { UserRegisterDTO } from './dtos/user-register.dto';
import { UserLoginDTO } from './dtos/user-login.dto';
@Injectable()
export class AuthService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async login(userLoginDTO: UserLoginDTO): Promise<any> {
    try {
      const { username, password } = userLoginDTO;
      const userSearchResult = await this.elasticsearchService.searchUser(username);
  
      const isValidUser = this.validateUser(userSearchResult, username, password);
  
      if (isValidUser) {
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  }

  private validateUser(userSearchResult: any, username: string, password: string): boolean {
    return userSearchResult.hits.total.value > 0 &&
      userSearchResult.hits.hits[0]._source.username === username &&
      userSearchResult.hits.hits[0]._source.password === password;
  }
  
  async register(userDTO: UserRegisterDTO): Promise<any> {
    try {
      const { username, password, email, role } = userDTO;
  
      // Check that the username is unique
      const isUsernameUnique = await this.checkUsernameUniqueness(username);
  
      if (!isUsernameUnique) {
        return { success: false, message: 'Username is not unique' };
      }
  
      // Get required information from UserDTO and add user to Elasticsearch
      await this.elasticsearchService.addUser(username, password, email, role);
  
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Error during registration:', error);
  
      if (error.meta && error.meta.body) {
        console.error('Elasticsearch Error:', error.meta.body.error);
      }
  
      return { success: false, message: 'An error occurred during registration' };
    }
  } 

async checkUsernameUniqueness(username: string): Promise<boolean> {
  try {
    const userSearchResult = await this.elasticsearchService.searchUser(username);
    return userSearchResult.hits.total.value === 0; // If 0 it is unique.
  } catch (error) {
    console.error('Error checking username uniqueness:', error);
    throw error;
  }
}
  
  async getAllUsers(): Promise<any> {
    try {
      const result = await this.elasticsearchService.searchAllUsers();
      const users = result.hits.hits.map(hit => hit._source);
      return { success: true, users };
    } catch (error) {
      console.error('Error getting all users:', error);
      return { success: false, message: 'An error occurred while getting all users' };
    }
  }

  async getUserDetails(username: string): Promise<any> {
    try {
      const userSearchResult = await this.elasticsearchService.searchUser(username);

      if (userSearchResult.hits.total.value > 0) {
        const userDetails = userSearchResult.hits.hits[0]._source;
        return { success: true, userDetails };
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (error) {
      console.error('Error getting user details:', error);
      return { success: false, message: 'An error occurred while getting user details' };
    }
  }

async updateUser(currentUsername: string, userUpdateDTO: UserRegisterDTO): Promise<any> {
  try {
    // Check if the user exists
    const isUserExist = await this.checkUsernameExistence(currentUsername);

    // If the user exists, update the user
    if (isUserExist) {
      // Check if the new username is provided and unique
      if (userUpdateDTO.username && currentUsername !== userUpdateDTO.username) {
        const isUsernameUnique = await this.checkUsernameUniqueness(userUpdateDTO.username);

        if (!isUsernameUnique) {
          return { success: false, message: 'New username is not unique' };
        }
      }

      // Update user fields if they are provided in the DTO
      const { username, email, password, role } = userUpdateDTO;
      const updatedFields: { [key: string]: any } = {};

      if (username) updatedFields.username = username;
      if (email) updatedFields.email = email;
      if (password) updatedFields.password = password;
      if (role) updatedFields.role = role;

      await this.elasticsearchService.updateUser(currentUsername, updatedFields);

      return { success: true, message: 'User updated successfully' };
    } else {
      // If the user does not exist, consider adding a new user
      // You can handle this case based on your application logic
      // For example, you can add a new user or return an error message
      // based on your requirements.
      return { success: false, message: 'User does not exist. Consider adding a new user.' };
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'An error occurred while updating user' };
  }
}


  async deleteUser(username: string): Promise<any> {
    try {
      // Checks the existence of the user.
      const isUserExist = await this.checkUsernameExistence(username);
  
      if (!isUserExist) {
        return { success: false, message: 'User does not exist' };
      }
  
      await this.elasticsearchService.deleteUser(username);
  
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, message: 'An error occurred while deleting user' };
    }
  }
  
  async checkUsernameExistence(username: string): Promise<boolean> {
    try {
      const userSearchResult = await this.elasticsearchService.searchUser(username);
      return userSearchResult.hits.total.value > 0; //If greater than 0, the user exists.
    } catch (error) {
      console.error('Error checking username existence:', error);
      throw error;
    }
  }
}