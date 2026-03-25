import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { YbocsAssessment } from '../ybocs/ybocs-assessment.entity';
import { FearHierarchyItem } from '../fear-hierarchy/fear-hierarchy-item.entity';
import { ErpSession } from '../erp-sessions/erp-session.entity';
import { ThoughtRecord } from '../thought-records/thought-record.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'ar' })
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => YbocsAssessment, (a) => a.user)
  ybocsAssessments: YbocsAssessment[];

  @OneToMany(() => FearHierarchyItem, (f) => f.user)
  fearHierarchyItems: FearHierarchyItem[];

  @OneToMany(() => ErpSession, (e) => e.user)
  erpSessions: ErpSession[];

  @OneToMany(() => ThoughtRecord, (t) => t.user)
  thoughtRecords: ThoughtRecord[];
}
