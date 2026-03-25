import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FearHierarchyService } from './fear-hierarchy.service';
import { CreateFearHierarchyItemDto, UpdateFearHierarchyItemDto } from './dto/fear-hierarchy.dto';

@UseGuards(JwtAuthGuard)
@Controller('fear-hierarchy')
export class FearHierarchyController {
  constructor(private service: FearHierarchyService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateFearHierarchyItemDto) {
    return this.service.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.service.findAll(req.user.id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateFearHierarchyItemDto) {
    return this.service.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.service.remove(req.user.id, id);
  }
}
