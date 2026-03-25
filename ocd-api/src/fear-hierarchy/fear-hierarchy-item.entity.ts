import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ErpSession } from '../erp-sessions/erp-session.entity';

// Fear hierarchy based on ERP protocol — Foa, Yadin & Lichner 2012
// SUDS = Subjective Units of Distress Scale — Wolpe 1969
@Entity('fear_hierarchy_items')
export class FearHierarchyItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.fearHierarchyItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  situation: string;

  // SUDS rating 0-100 (Wolpe 1969)
  @Column()
  sudsRating: number;

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ErpSession, (e) => e.hierarchyItem)
  erpSessions: ErpSession[];
}
