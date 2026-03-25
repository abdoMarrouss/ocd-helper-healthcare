import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ErpSessionsService } from './erp-sessions.service';
import { CreateErpSessionDto } from './dto/erp-session.dto';

@UseGuards(JwtAuthGuard)
@Controller('erp-sessions')
export class ErpSessionsController {
  constructor(private service: ErpSessionsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateErpSessionDto) {
    return this.service.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.service.findAll(req.user.id);
  }

  @Get('stats')
  getStats(@Request() req) {
    return this.service.getStats(req.user.id);
  }
}
