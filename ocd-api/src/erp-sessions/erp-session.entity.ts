import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { FearHierarchyItem } from '../fear-hierarchy/fear-hierarchy-item.entity';

// ERP Session tracking — Foa & Kozak Emotional Processing Theory 1986
// sudsBaseline → sudsPeak → sudsEnd = habituation curve
@Entity('erp_sessions')
export class ErpSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.erpSessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => FearHierarchyItem, (f) => f.erpSessions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'hierarchyItemId' })
  hierarchyItem: FearHierarchyItem;

  @Column({ nullable: true })
  hierarchyItemId: string;

  @Column()
  sudsBaseline: number;

  @Column()
  sudsPeak: number;

  @Column()
  sudsEnd: number;

  @Column({ default: false })
  compulsionResisted: boolean;

  @Column({ default: 0 })
  durationMinutes: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  sessionAt: Date;
}
