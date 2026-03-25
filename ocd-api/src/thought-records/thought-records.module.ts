import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThoughtRecord } from './thought-record.entity';
import { ThoughtRecordsService } from './thought-records.service';
import { ThoughtRecordsController } from './thought-records.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThoughtRecord])],
  providers: [ThoughtRecordsService],
  controllers: [ThoughtRecordsController],
})
export class ThoughtRecordsModule {}
