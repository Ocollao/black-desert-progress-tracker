import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface KnowledgeTheme {
  id: string;
  sourceUrn: string;
  name: string;
  parentUrn: string | null;
}

export interface ThemeNode {
  id: string;
  sourceUrn: string;
  name: string;
  parentUrn: string | null;
  total: number;
  obtained: number;
  energy: number;
  children: ThemeNode[];
}

export interface KnowledgeEntry {
  id: string;
  sourceUrn: string;
  name: string;
  description: string | null;
  acquisition: string | null;
  imagePath: string | null;
  themeUrn: string | null;
  itemUrn: string | null;
  characterUrn: string | null;
  minFavor: number | null;
  maxFavor: number | null;
  interest: number | null;
  progress?: { obtained: boolean } | null;
}

export interface KnowledgePage {
  items: KnowledgeEntry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  obtained: number;
  pending: number;
  energyMax?: number;
  energyObtained?: number;
}

export type KnowledgeStatus = 'all' | 'obtained' | 'pending' | 'blocked';

export interface KnowledgeProgress {
  obtained: boolean;
  obtainedAt: string | null;
  notes: string | null;
  blocked?: boolean;
  requirements: Array<{ id: string; name: string; obtained: boolean }>;
}

export interface RecentKnowledge {
  id: string;
  name: string;
  imagePath: string | null;
  obtainedAt: string | null;
}

export interface EnergyBreakdown {
  id: string;
  sourceUrn: string;
  name: string;
  total: number;
  obtained: number;
  energy: number;
  obtainedEnergy: number;
  complete: boolean;
}

export interface EnergySummary {
  energyMax: number;
  energyObtained: number;
  energyBase: number;
  estimated: boolean;
  breakdown: EnergyBreakdown[];
}

@Injectable({ providedIn: 'root' })
export class KnowledgeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/knowledge';

  getThemes(): Observable<KnowledgeTheme[]> {
    return this.http.get<KnowledgeTheme[]>(`${this.apiUrl}/themes`);
  }

  getThemesTree(): Observable<ThemeNode[]> {
    return this.http.get<ThemeNode[]>(`${this.apiUrl}/themes/tree`);
  }

  getRecent(limit = 5): Observable<RecentKnowledge[]> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<RecentKnowledge[]>(`${this.apiUrl}/recent`, { params });
  }

  getEnergy(): Observable<EnergySummary> {
    return this.http.get<EnergySummary>(`${this.apiUrl}/energy`);
  }

  search(search: string, themeId: string | null, status: KnowledgeStatus, page = 1, limit = 24): Observable<KnowledgePage> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search.trim()) params = params.set('search', search.trim());
    if (themeId) params = params.set('themeId', themeId);
    if (status !== 'all') params = params.set('status', status);
    return this.http.get<KnowledgePage>(this.apiUrl, { params });
  }

  getById(id: string): Observable<KnowledgeEntry> {
    return this.http.get<KnowledgeEntry>(`${this.apiUrl}/${id}`);
  }

  updateProgress(id: string, obtained: boolean): Observable<KnowledgeProgress> {
    return this.http.put<KnowledgeProgress>(`${this.apiUrl}/${id}/progress`, { obtained });
  }

  removeProgress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/progress`);
  }

  getProgress(id: string): Observable<KnowledgeProgress> {
    return this.http.get<KnowledgeProgress>(`${this.apiUrl}/${id}/progress`);
  }
}
