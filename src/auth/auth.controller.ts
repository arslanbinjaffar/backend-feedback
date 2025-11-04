import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  signIn(@Body() body:CreateUserDto): Promise<{ access_token: string; }> {
    return this.authService.signIn({
        email:body.email,
        pass:body.password
    });
  }

  @Post("register")
  signUp(@Body() body:CreateUserDto): Promise<{ access_token: string; }> {
    return this.authService.signUp({
        email:body.email,
        pass:body.password,
        name:body.name
    });
  }
}
