import { Injectable } from '@angular/core';
import { ApiService } from './api';

export interface FearItem {
  id: string;
  situation: string;
  sudsRating: number;
  order: number;
  completed: boolean;
}

/** SUDS anxiety level label (0–100 scale, Wolpe 1969) */
export function getSudsLabel(suds: number): string {
  if (suds <= 20) return 'low';
  if (suds <= 40) return 'mild';
  if (suds <= 60) return 'moderate';
  if (suds <= 80) return 'high';
  return 'extreme';
}

@Injectable({ providedIn: 'root' })
export class FearHierarchyService {
  constructor(private api: ApiService) {}

  getAll() { return this.api.get<FearItem[]>('fear-hierarchy'); }
  create(situation: string, sudsRating: number) {
    return this.api.post<FearItem>('fear-hierarchy', { situation, sudsRating });
  }
  update(id: string, data: Partial<FearItem>) {
    return this.api.patch<FearItem>(`fear-hierarchy/${id}`, data);
  }
  remove(id: string) { return this.api.delete(`fear-hierarchy/${id}`); }
}
