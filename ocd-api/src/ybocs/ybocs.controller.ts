import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { YbocsService } from './ybocs.service';
import { SubmitYbocsDto } from './dto/submit-ybocs.dto';

@UseGuards(JwtAuthGuard)
@Controller('ybocs')
export class YbocsController {
  constructor(private ybocsService: YbocsService) {}

  @Post()
  submit(@Request() req, @Body() dto: SubmitYbocsDto) {
    return this.ybocsService.submit(req.user.id, dto);
  }

  @Get('history')
  getHistory(@Request() req) {
    return this.ybocsService.getHistory(req.user.id);
  }

  @Get('latest')
  getLatest(@Request() req) {
    return this.ybocsService.getLatest(req.user.id);
  }
}
