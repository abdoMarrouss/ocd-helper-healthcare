import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FearHierarchyItem } from './fear-hierarchy-item.entity';
import { FearHierarchyService } from './fear-hierarchy.service';
import { FearHierarchyController } from './fear-hierarchy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FearHierarchyItem])],
  providers: [FearHierarchyService],
  controllers: [FearHierarchyController],
})
export class FearHierarchyModule {}
