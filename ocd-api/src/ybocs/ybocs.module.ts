import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YbocsAssessment } from './ybocs-assessment.entity';
import { YbocsService } from './ybocs.service';
import { YbocsController } from './ybocs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([YbocsAssessment])],
  providers: [YbocsService],
  controllers: [YbocsController],
})
export class YbocsModule {}
