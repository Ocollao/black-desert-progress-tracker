import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  seasonCharacter: string | null;
  gearScore: number;
  garmothUrl: string | null;
  garmothCode: string | null;
  linkedGearScore: number | null;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type CharacterClass =
  | 'WARRIOR'
  | 'RANGER'
  | 'SORCERESS'
  | 'BERSERKER'
  | 'TAMER'
  | 'MUSA'
  | 'VALKYRIE'
  | 'WITCH'
  | 'KUNOICHI'
  | 'NINJA'
  | 'WIZARD'
  | 'DARK_KNIGHT'
  | 'STRIKER'
  | 'MYSTIC'
  | 'LAHN'
  | 'ARCHER'
  | 'SHAI'
  | 'HASHASHIN'
  | 'NOVA'
  | 'SAGE'
  | 'CORSAIR'
  | 'DRAKANIA'
  | 'SOLARIS'
  | 'SCHOLAR'
  | 'DEADEYE';

export interface CreateCharacterRequest {
  name: string;
  class: CharacterClass;
  seasonCharacter?: string;
  avatarUrl?: string;
}

export interface UpdateCharacterRequest {
  name?: string;
  class?: CharacterClass;
  level?: number;
  experience?: number;
  seasonCharacter?: string;
  gearScore?: number;
  garmothUrl?: string;
  garmothCode?: string;
  linkedGearScore?: number;
  avatarUrl?: string;
  isActive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/characters';

  getAll(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl);
  }

  getById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateCharacterRequest): Observable<Character> {
    return this.http.post<Character>(this.apiUrl, data);
  }

  update(id: string, data: UpdateCharacterRequest): Observable<Character> {
    return this.http.patch<Character>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}