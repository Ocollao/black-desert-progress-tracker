import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CharacterService, Character, CharacterClass } from '../character.service';
import { CardComponent, BadgeComponent } from '../../../shared/index';

@Component({
  selector: 'bdp-character-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent, BadgeComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  private readonly characterService = inject(CharacterService);
  private readonly router = inject(Router);

  characters = signal<Character[]>([]);
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

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.characterService.getAll().subscribe({
      next: (data: Character[]) => {
        this.characters.set(data);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.error.set('Error al cargar los personajes');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  onCreate(): void {
    this.router.navigate(['/characters/create']);
  }

  onEdit(character: Character): void {
    this.router.navigate(['/characters/edit', character.id]);
  }

  async onDelete(character: Character): Promise<void> {
    if (!confirm(`¿Estás seguro de eliminar a ${character.name}?`)) {
      return;
    }
    try {
      await this.characterService.delete(character.id).toPromise();
      this.loadCharacters();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar el personaje');
    }
  }
}