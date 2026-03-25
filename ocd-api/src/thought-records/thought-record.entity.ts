import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

// Thought Record — Salkovskis cognitive model 1985 + Beck CBT principles
@Entity('thought_records')
export class ThoughtRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.thoughtRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'text' })
  intrusiveThought: string;

  // Anxiety level 0-10 (CBT standard)
  @Column()
  anxietyLevel: number;

  @Column({ type: 'text', nullable: true })
  compulsionPerformed: string;

  @Column({ default: false })
  resisted: boolean;

  @CreateDateColumn()
  recordedAt: Date;
}
