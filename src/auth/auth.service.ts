
import { Get, Injectable, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {PrismaService} from  "../prisma/prisma.service"
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './auth.guard';
const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma:PrismaService
  ) {}

  async signIn(
   {email,pass}:{email: string
    pass: string}
  ): Promise<{ access_token: string }> {
  
    const user = await this.prisma.user.findOne(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

   async signUp(
  {
    name,
    email,pass}:{
    name?:string
    email: string
    pass: string}
  ): Promise<{ access_token: string }> {
      const hash = await bcrypt.hash(pass, saltOrRounds);
    const user = await this.prisma.user.create({
             data:{
                 name,
                email,
                password:hash,
             }
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
@UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
