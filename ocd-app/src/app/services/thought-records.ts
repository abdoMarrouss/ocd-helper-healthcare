import { Injectable } from '@angular/core';
import { ApiService } from './api';

export interface ThoughtRecord {
  id: string;
  intrusiveThought: string;
  anxietyLevel: number;
  compulsionPerformed: string;
  resisted: boolean;
  recordedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ThoughtRecordsService {
  constructor(private api: ApiService) {}

  getAll() { return this.api.get<ThoughtRecord[]>('thought-records'); }
  create(data: Omit<ThoughtRecord, 'id' | 'recordedAt'>) {
    return this.api.post<ThoughtRecord>('thought-records', data);
  }
  remove(id: string) { return this.api.delete(`thought-records/${id}`); }
}
