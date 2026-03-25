import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YbocsAssessment, YbocsSeverity } from './ybocs-assessment.entity';
import { SubmitYbocsDto } from './dto/submit-ybocs.dto';

@Injectable()
export class YbocsService {
  constructor(
    @InjectRepository(YbocsAssessment)
    private repo: Repository<YbocsAssessment>,
  ) {}

  // Scoring per Goodman et al. 1989
  private calculateSeverity(total: number): YbocsSeverity {
    if (total <= 7) return 'subclinical';
    if (total <= 15) return 'mild';
    if (total <= 23) return 'moderate';
    if (total <= 31) return 'severe';
    return 'extreme';
  }

  async submit(userId: string, dto: SubmitYbocsDto) {
    const obsessionScore = dto.answers.slice(0, 5).reduce((a, b) => a + b, 0);
    const compulsionScore = dto.answers.slice(5, 10).reduce((a, b) => a + b, 0);
    const totalScore = obsessionScore + compulsionScore;
    const severity = this.calculateSeverity(totalScore);

    const assessment = this.repo.create({
      userId,
      answers: dto.answers,
      obsessionScore,
      compulsionScore,
      totalScore,
      severity,
    });

    return this.repo.save(assessment);
  }

  async getHistory(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { takenAt: 'DESC' },
    });
  }

  async getLatest(userId: string) {
    return this.repo.findOne({
      where: { userId },
      order: { takenAt: 'DESC' },
    });
  }
}
