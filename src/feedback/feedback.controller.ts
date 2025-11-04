import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { createFeedbackDTO } from './feedback.dto';

@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get("")
 async getAllFeedback(): Promise<{feedbacks:createFeedbackDTO[]}> {
    return await this.feedbackService.getAll();
  }
  @Post("")
  async createFeedback(@Body() body:createFeedbackDTO):Promise<any>{
   return await this.feedbackService.create(body)
  }
  @Patch("/:id/upvote")
  async updateFeedbackVoteCount(@Param(":id") id:string):Promise<any>{
    return await this.feedbackService.updateFeedbackVote(id)
  }
    @Delete("/:id")
  async deletedFeedbackbyId(@Param(":id") id:string):Promise<any>{
    return await this.feedbackService.deleteFeedbackbyId(id)
  }
}
