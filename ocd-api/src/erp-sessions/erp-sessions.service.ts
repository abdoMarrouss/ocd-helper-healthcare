import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErpSession } from './erp-session.entity';
import { CreateErpSessionDto } from './dto/erp-session.dto';

@Injectable()
export class ErpSessionsService {
  constructor(
    @InjectRepository(ErpSession)
    private repo: Repository<ErpSession>,
  ) {}

  async create(userId: string, dto: CreateErpSessionDto) {
    const session = this.repo.create({ ...dto, userId });
    return this.repo.save(session);
  }

  async findAll(userId: string) {
    return this.repo.find({
      where: { userId },
      relations: ['hierarchyItem'],
      order: { sessionAt: 'DESC' },
    });
  }

  // Returns habituation stats: avg SUDS drop per session
  async getStats(userId: string) {
    const sessions = await this.repo.find({ where: { userId } });
    if (!sessions.length) return { totalSessions: 0, avgSudsDrop: 0, resistanceRate: 0 };

    const avgSudsDrop =
      sessions.reduce((acc, s) => acc + (s.sudsPeak - s.sudsEnd), 0) / sessions.length;
    const resistanceRate =
      (sessions.filter((s) => s.compulsionResisted).length / sessions.length) * 100;

    return {
      totalSessions: sessions.length,
      avgSudsDrop: Math.round(avgSudsDrop * 10) / 10,
      resistanceRate: Math.round(resistanceRate),
    };
  }
}
