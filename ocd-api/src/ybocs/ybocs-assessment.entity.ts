import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

// Goodman et al. 1989 — Yale-Brown Obsessive Compulsive Scale
// Scoring: 0-7 subclinical, 8-15 mild, 16-23 moderate, 24-31 severe, 32-40 extreme
export type YbocsSeverity = 'subclinical' | 'mild' | 'moderate' | 'severe' | 'extreme';

@Entity('ybocs_assessments')
export class YbocsAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.ybocsAssessments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  // 10 answers, each 0-4 (Q1-5 = obsessions, Q6-10 = compulsions)
  @Column('simple-json')
  answers: number[];

  @Column()
  obsessionScore: number;

  @Column()
  compulsionScore: number;

  @Column()
  totalScore: number;

  @Column()
  severity: YbocsSeverity;

  @CreateDateColumn()
  takenAt: Date;
}
