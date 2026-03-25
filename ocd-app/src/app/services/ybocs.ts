import { Injectable } from '@angular/core';
import { ApiService } from './api';

export interface YbocsAssessment {
  id: string;
  answers: number[];
  obsessionScore: number;
  compulsionScore: number;
  totalScore: number;
  severity: string;
  takenAt: string;
}

/**
 * Y-BOCS severity bands (Goodman et al., 1989)
 * 0–7: Subclinical | 8–15: Mild | 16–23: Moderate | 24–31: Severe | 32–40: Extreme
 */
export function getSeverityLabel(total: number): string {
  if (total <= 7) return 'subclinical';
  if (total <= 15) return 'mild';
  if (total <= 23) return 'moderate';
  if (total <= 31) return 'severe';
  return 'extreme';
}

export function getSeverityColor(total: number): string {
  if (total <= 7) return '#6BAE8E';   // green — subclinical
  if (total <= 15) return '#A8C56E';  // lime — mild
  if (total <= 23) return '#F5A623';  // amber — moderate
  if (total <= 31) return '#E07B54';  // orange — severe
  return '#D9534F';                   // red — extreme
}

@Injectable({ providedIn: 'root' })
export class YbocsService {
  constructor(private api: ApiService) {}

  submit(answers: number[]) {
    return this.api.post<YbocsAssessment>('ybocs', { answers });
  }

  getHistory() {
    return this.api.get<YbocsAssessment[]>('ybocs/history');
  }

  getLatest() {
    return this.api.get<YbocsAssessment>('ybocs/latest');
  }
}
