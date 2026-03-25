import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThoughtRecord } from './thought-record.entity';
import { CreateThoughtRecordDto } from './dto/thought-record.dto';

@Injectable()
export class ThoughtRecordsService {
  constructor(
    @InjectRepository(ThoughtRecord)
    private repo: Repository<ThoughtRecord>,
  ) {}

  async create(userId: string, dto: CreateThoughtRecordDto) {
    const record = this.repo.create({ ...dto, userId });
    return this.repo.save(record);
  }

  async findAll(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { recordedAt: 'DESC' },
    });
  }
}
