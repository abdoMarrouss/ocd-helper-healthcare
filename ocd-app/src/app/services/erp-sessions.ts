import { Injectable } from '@angular/core';
import { ApiService } from './api';

export interface ErpSession {
  id: string;
  sudsBaseline: number;
  sudsPeak: number;
  sudsEnd: number;
  compulsionResisted: boolean;
  durationMinutes: number;
  notes: string;
  sessionAt: string;
  hierarchyItem?: { situation: string };
}

export interface ErpStats {
  totalSessions: number;
  avgSudsDrop: number;
  resistanceRate: number;
}

@Injectable({ providedIn: 'root' })
export class ErpSessionsService {
  constructor(private api: ApiService) {}

  getAll() { return this.api.get<ErpSession[]>('erp-sessions'); }
  getStats() { return this.api.get<ErpStats>('erp-sessions/stats'); }
  create(data: Partial<ErpSession> & { hierarchyItemId?: string }) {
    return this.api.post<ErpSession>('erp-sessions', data);
  }
}
