import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dtos/user-login.dto';
import { UserRegisterDTO } from './dtos/user-register.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
async login(@Body() userLoginDTO: UserLoginDTO): Promise<any> {
  return this.authService.login(userLoginDTO);
}

  @Post('register')
  async register(@Body() userDTO: UserRegisterDTO): Promise<any> {
    return this.authService.register(userDTO);
  }

  @Get('getAllUsers')
  async getAllUsers(): Promise<any> {
    return this.authService.getAllUsers();
  }

  @Get('getUserDetails/:username')
  async getUserDetails(@Param('username') username: string): Promise<any> {
    return this.authService.getUserDetails(username);
  }
  
  @Put('updateUser/:username')
  async updateUser(
    @Param('username') currentUsername: string,
    @Body() userUpdateDTO: UserRegisterDTO
  ): Promise<any> {
    return this.authService.updateUser(currentUsername, userUpdateDTO);
  }    

  @Delete('deleteUser/:username') 
  async deleteUser(@Param('username') username: string): Promise<any> {
  return this.authService.deleteUser(username);
 }
}