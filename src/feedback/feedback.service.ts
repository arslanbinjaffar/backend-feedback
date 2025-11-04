import { Injectable } from '@nestjs/common';
import { createFeedbackDTO } from './feedback.dto';
import { PrismaService} from "../prisma/prisma.service"
@Injectable()
export class FeedbackService {
    constructor(private readonly prisma:PrismaService){}
 async getAll(): Promise<{feedbacks:createFeedbackDTO[]}> {
    return await this.prisma.feedback.findMany()
  }

    async create({title,upvotes,userId,description}:createFeedbackDTO): Promise<{feedbacks:createFeedbackDTO[]}> {
    return await this.prisma.feedback.create({
        data:{
            title,upvotes,userId,description
        }
    })
  }
 
  async updateFeedbackVote(id:string){
    return await this.prisma.feedback.update({
        where:{
            id
        },
        data:{
            upvotes:{
      increment: 1, },
        }
    })
  }
    async deleteFeedbackbyId(id:string){
    return await this.prisma.feedback.update({
        where:{
            id
        },
        data:{
            upvotes:{
      increment: 1, },
        }
    })
  }
  
}
