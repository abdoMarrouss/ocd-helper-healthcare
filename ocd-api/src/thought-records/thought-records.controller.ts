import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ThoughtRecordsService } from './thought-records.service';
import { CreateThoughtRecordDto } from './dto/thought-record.dto';

@UseGuards(JwtAuthGuard)
@Controller('thought-records')
export class ThoughtRecordsController {
  constructor(private service: ThoughtRecordsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateThoughtRecordDto) {
    return this.service.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.service.findAll(req.user.id);
  }
}
