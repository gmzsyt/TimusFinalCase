import { Controller, Post, Get, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dtos/userLogin.dto';
import { UserRegisterDTO } from './dtos/userRegister.dto';
import { JwtAuthGuard } from './jwt/jwtAuthGuard';

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
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Req() request): Promise<any> {
    const user = request.user;
    return this.authService.getAllUsers();
  }

  @Get('getUserDetails/:username')
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Param('username') username: string): Promise<any> {
    return this.authService.getUserDetails(username);
  }

  @Put('updateUser/:username')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('username') currentUsername: string,
    @Body() userUpdateDTO: UserRegisterDTO,
    @Req() request,
  ): Promise<any> {
    const user = request.user;
    return this.authService.updateUser(currentUsername, userUpdateDTO);
  }

  @Delete('deleteUser/:username')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('username') username: string, @Req() request): Promise<any> {
    const user = request.user;  
    return this.authService.deleteUser(username);
  }
}
