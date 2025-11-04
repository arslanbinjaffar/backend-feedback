
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/auth/auth.dto';

export class createFeedbackDTO {
    @IsNotEmpty()
    id:number    
      @IsNotEmpty()
title:string;
    @IsOptional()
description:string;
    @IsOptional()
upvotes: number;
  @IsOptional()
userId: string;
  @IsOptional()
user?: CreateUserDto[]
}



