import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, Character, CharacterClass } from '../character.service';
import { CardComponent, BadgeComponent, ProgressComponent } from '../../../shared/index';

@Component({
  selector: 'bdp-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ProgressComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit {
  private readonly characterService = inject(CharacterService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  readonly Math = Math;

  character = signal<Character | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  readonly classLabels: Record<CharacterClass, string> = {
    WARRIOR: 'Guerrero',
    RANGER: 'Exploradora',
    SORCERESS: 'Hechicera',
    BERSERKER: 'Berserker',
    TAMER: 'Domadora',
    MUSA: 'Musa',
    VALKYRIE: 'Valquiria',
    WITCH: 'Bruja',
    KUNOICHI: 'Kunoichi',
    NINJA: 'Ninja',
    WIZARD: 'Mago',
    DARK_KNIGHT: 'Caballero Oscuro',
    STRIKER: 'Striker',
    MYSTIC: 'Mística',
    LAHN: 'Lahn',
    ARCHER: 'Arquera',
    SHAI: 'Shai',
    HASHASHIN: 'Hashashin',
    NOVA: 'Nova',
    SAGE: 'Sabio',
    CORSAIR: 'Corsaria',
    DRAKANIA: 'Drakania',
    SOLARIS: 'Solaris',
    SCHOLAR: 'Erudita',
    DEADEYE: 'Deadeye',
  };

  readonly classIcons: Record<CharacterClass, string> = {
    WARRIOR: '⚔️',
    RANGER: '🏹',
    SORCERESS: '🔮',
    BERSERKER: '🪓',
    TAMER: '🐾',
    MUSA: '🎋',
    VALKYRIE: '🛡️',
    WITCH: '🧙‍♀️',
    KUNOICHI: '🥷',
    NINJA: '🗡️',
    WIZARD: '🧙‍♂️',
    DARK_KNIGHT: '🌑',
    STRIKER: '👊',
    MYSTIC: '✨',
    LAHN: '🎀',
    ARCHER: '🏹',
    SHAI: '🎵',
    HASHASHIN: '🏜️',
    NOVA: '⭐',
    SAGE: '📜',
    CORSAIR: '⚓',
    DRAKANIA: '🐉',
    SOLARIS: '☀️',
    SCHOLAR: '📚',
    DEADEYE: '🎯',
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCharacter(id);
      }
    });
  }

  loadCharacter(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.characterService.getById(id).subscribe({
      next: (data) => {
        this.character.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el personaje');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  onEdit(): void {
    const char = this.character();
    if (char) {
      this.router.navigate(['/characters/edit', char.id]);
    }
  }

  async onDelete(): Promise<void> {
    const char = this.character();
    if (!char || !confirm(`¿Estás seguro de eliminar a ${char.name}?`)) {
      return;
    }
    try {
      await this.characterService.delete(char.id).toPromise();
      this.router.navigate(['/characters']);
    } catch (err) {
      console.error(err);
      alert('Error al eliminar el personaje');
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}