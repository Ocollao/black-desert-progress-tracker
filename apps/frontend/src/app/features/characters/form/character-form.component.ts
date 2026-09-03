import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, CharacterClass, CreateCharacterRequest, UpdateCharacterRequest } from '../character.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'bdp-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent implements OnInit {
  private readonly characterService = inject(CharacterService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isEditing = signal(false);
  characterId = signal<string | null>(null);
  isLoading = signal(false);
  isSubmitting = signal(false);
  error = signal<string | null>(null);

  name = signal('');
  selectedClass = signal<CharacterClass>('WARRIOR');
  level = signal(1);
  experience = signal(0);
  seasonCharacter = signal('');
  gearScore = signal(0);
  avatarUrl = signal('');

  readonly classes: { value: CharacterClass; label: string }[] = [
    { value: 'WARRIOR', label: 'Guerrero' },
    { value: 'RANGER', label: 'Exploradora' },
    { value: 'SORCERESS', label: 'Hechicera' },
    { value: 'BERSERKER', label: 'Berserker' },
    { value: 'TAMER', label: 'Domadora' },
    { value: 'MUSA', label: 'Musa' },
    { value: 'VALKYRIE', label: 'Valquiria' },
    { value: 'WITCH', label: 'Bruja' },
    { value: 'KUNOICHI', label: 'Kunoichi' },
    { value: 'NINJA', label: 'Ninja' },
    { value: 'WIZARD', label: 'Mago' },
    { value: 'DARK_KNIGHT', label: 'Caballero Oscuro' },
    { value: 'STRIKER', label: 'Striker' },
    { value: 'MYSTIC', label: 'Mística' },
    { value: 'LAHN', label: 'Lahn' },
    { value: 'ARCHER', label: 'Arquera' },
    { value: 'SHAI', label: 'Shai' },
    { value: 'HASHASHIN', label: 'Hashashin' },
    { value: 'NOVA', label: 'Nova' },
    { value: 'SAGE', label: 'Sabio' },
    { value: 'CORSAIR', label: 'Corsaria' },
    { value: 'DRAKANIA', label: 'Drakania' },
    { value: 'SOLARIS', label: 'Solaris' },
    { value: 'SCHOLAR', label: 'Erudita' },
    { value: 'DEADEYE', label: 'Deadeye' },
  ];

  isFormValid = computed(() =>
    this.name().trim().length >= 2 && this.name().trim().length <= 50,
  );

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditing.set(true);
        this.characterId.set(id);
        this.loadCharacter(id);
      }
    });
  }

  loadCharacter(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.characterService.getById(id).subscribe({
      next: (character) => {
        this.name.set(character.name);
        this.selectedClass.set(character.class);
        this.level.set(character.level);
        this.experience.set(character.experience);
        this.seasonCharacter.set(character.seasonCharacter || '');
        this.gearScore.set(character.gearScore);
        this.avatarUrl.set(character.avatarUrl || '');
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el personaje');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.error.set('El nombre debe tener entre 2 y 50 caracteres');
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    try {
      if (this.isEditing() && this.characterId()) {
        const data: UpdateCharacterRequest = {
          name: this.name().trim(),
          class: this.selectedClass(),
          level: this.level(),
          experience: this.experience(),
          seasonCharacter: this.seasonCharacter().trim() || undefined,
          gearScore: this.gearScore(),
          avatarUrl: this.avatarUrl().trim() || undefined,
        };
        await this.characterService.update(this.characterId()!, data).toPromise();
      } else {
        const data: CreateCharacterRequest = {
          name: this.name().trim(),
          class: this.selectedClass(),
          seasonCharacter: this.seasonCharacter().trim() || undefined,
          avatarUrl: this.avatarUrl().trim() || undefined,
        };
        await this.characterService.create(data).toPromise();
      }
      this.router.navigate(['/characters']);
    } catch (err) {
      console.error(err);
      this.error.set('Error al guardar el personaje');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  onCancel(): void {
    this.router.navigate(['/characters']);
  }
}