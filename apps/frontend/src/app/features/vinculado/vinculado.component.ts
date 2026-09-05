import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Character, CharacterService } from '../characters/character.service';
import { CardComponent, BadgeComponent, ButtonComponent } from '../../shared/index';

@Component({
  selector: 'bdp-vinculado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <div class="linked-page animate-fade-in-up">
      <header class="linked-page__header">
        <div>
          <p class="bdo-kicker">Fuente externa del aventurero</p>
          <h1 class="page-title">Perfil vinculado</h1>
          <p class="page-subtitle">Conecta tu ficha de Garmoth para mantener visible tu Gear Score actual.</p>
        </div>
        <a routerLink="/characters" class="btn btn-secondary">Ver personajes</a>
      </header>

      @if (error()) {
        <div class="linked-alert" role="alert">{{ error() }}</div>
      }
      @if (success()) {
        <div class="linked-success" role="status">{{ success() }}</div>
      }

      @if (isLoading()) {
        <div class="linked-empty bdo-frame"><p>Cargando personajes...</p></div>
      } @else if (characters().length === 0) {
        <section class="linked-empty bdo-frame">
          <span class="linked-empty__mark" aria-hidden="true">↗</span>
          <h2>Primero crea tu personaje</h2>
          <p>La vinculación se guarda sobre un personaje de tu cuenta. Cuando lo tengas, podrás asociar aquí su ficha de Garmoth.</p>
          <a routerLink="/characters/create" class="btn btn-primary">Crear personaje</a>
        </section>
      } @else {
        <div class="linked-layout">
          <bdp-card variant="gold">
            <div class="linked-section-heading">
              <div>
                <p class="bdo-kicker">Paso 01</p>
                <h2>Selecciona tu personaje</h2>
              </div>
              <bdp-badge variant="gold">Cuenta conectada</bdp-badge>
            </div>
            <div class="character-picker">
              @for (character of characters(); track character.id) {
                <button type="button" class="character-option" [class.character-option--active]="selectedCharacterId() === character.id" (click)="selectCharacter(character)">
                  <span class="character-option__avatar">{{ character.name.charAt(0) }}</span>
                  <span class="character-option__info"><strong>{{ character.name }}</strong><small>Nv. {{ character.level }} · GS {{ character.gearScore }}</small></span>
                  <span class="character-option__state" aria-hidden="true">{{ selectedCharacterId() === character.id ? '✓' : '○' }}</span>
                </button>
              }
            </div>
          </bdp-card>

          <bdp-card variant="default" class="linked-form-card">
            <div class="linked-section-heading">
              <div>
                <p class="bdo-kicker">Paso 02</p>
                <h2>Vincula Garmoth</h2>
              </div>
              <span class="linked-source">GARMOTH</span>
            </div>
            <p class="linked-help">Pega la URL pública de tu personaje y el código mostrado en su ficha. El GS se guarda como referencia del último dato confirmado por ti.</p>
            <form (ngSubmit)="save()" class="linked-form">
              <div>
                <label class="input-label" for="garmothUrl">URL de personaje</label>
                <input id="garmothUrl" name="garmothUrl" class="input" type="url" [(ngModel)]="garmothUrl" placeholder="https://garmoth.com/character/tu-personaje" required>
                <p class="input-help">Debe comenzar por https://garmoth.com/character/</p>
              </div>
              <div class="linked-form__row">
                <div>
                  <label class="input-label" for="garmothCode">Código de ficha</label>
                  <input id="garmothCode" name="garmothCode" class="input" type="text" [(ngModel)]="garmothCode" placeholder="Ej. 7f3a2c" required>
                </div>
                <div>
                  <label class="input-label" for="linkedGearScore">Gear Score actual</label>
                  <input id="linkedGearScore" name="linkedGearScore" class="input" type="number" [(ngModel)]="linkedGearScore" min="0" max="10000" required>
                </div>
              </div>
              <div class="linked-form__actions">
                @if (selectedCharacter()?.garmothUrl) {
                  <a [href]="selectedCharacter()?.garmothUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">Abrir ficha ↗</a>
                }
                <bdp-button type="submit" variant="primary" [disabled]="!isValid() || isSaving()" [loading]="isSaving()">Guardar vinculación</bdp-button>
              </div>
            </form>
          </bdp-card>
        </div>

        @if (selectedCharacter()?.garmothUrl) {
          <section class="linked-summary bdo-frame bdo-frame--gold">
            <div><p class="bdo-kicker">Referencia guardada</p><h2>{{ selectedCharacter()?.name }}</h2><p class="linked-summary__url">{{ selectedCharacter()?.garmothUrl }} · Código {{ selectedCharacter()?.garmothCode }}</p></div>
            <div class="linked-summary__score"><span>GS actual</span><strong>{{ selectedCharacter()?.linkedGearScore | number }}</strong></div>
          </section>
        }
      }
    </div>
  `,
  styles: [`
    .linked-page { max-width: 70rem; margin: 0 auto; }
    .linked-page__header { align-items: flex-end; display: flex; justify-content: space-between; gap: 1.5rem; margin-bottom: 2rem; }
    .linked-page__header .page-title { margin: .35rem 0 .4rem; }
    .linked-page__header .page-subtitle { margin: 0; max-width: 42rem; }
    .linked-layout { display: grid; grid-template-columns: minmax(16rem, .8fr) minmax(0, 1.4fr); gap: 1rem; }
    .linked-section-heading { align-items: flex-start; display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; }
    .linked-section-heading h2 { font-size: 1.35rem; margin: .35rem 0 0; }
    .character-picker { display: grid; gap: .55rem; }
    .character-option { align-items: center; background: rgba(11,13,15,.5); border: 1px solid var(--bdo-surface-line); color: var(--color-bdo-text-primary); cursor: pointer; display: flex; gap: .75rem; padding: .7rem; text-align: left; transition: 180ms ease; width: 100%; }
    .character-option:hover, .character-option--active { background: rgba(194,154,82,.1); border-color: var(--bdo-surface-line-strong); }
    .character-option__avatar { align-items: center; background: linear-gradient(135deg, var(--color-bdo-gold), var(--color-bdo-gold-bright)); color: var(--color-bdo-text-dark); display: flex; font-weight: 700; height: 2.25rem; justify-content: center; width: 2.25rem; }
    .character-option__info { display: grid; flex: 1; gap: .15rem; min-width: 0; }
    .character-option__info small { color: var(--color-bdo-text-muted); }
    .character-option__state { color: var(--color-bdo-gold-bright); font-size: 1.1rem; }
    .linked-source { color: var(--color-bdo-gold); font-size: .7rem; letter-spacing: .12em; }
    .linked-help { font-size: .9rem; margin: 0 0 1.25rem; }
    .linked-form { display: grid; gap: 1rem; }
    .linked-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .linked-form__actions { align-items: center; border-top: 1px solid var(--bdo-surface-line); display: flex; justify-content: flex-end; gap: .75rem; padding-top: 1.25rem; }
    .linked-summary { align-items: center; display: flex; justify-content: space-between; gap: 1rem; margin-top: 1rem; padding: 1.25rem 1.5rem; }
    .linked-summary h2 { margin: .3rem 0 .2rem; }
    .linked-summary__url { font-size: .8rem; margin: 0; overflow-wrap: anywhere; }
    .linked-summary__score { border-left: 1px solid var(--bdo-surface-line); display: grid; min-width: 8rem; padding-left: 1.5rem; text-align: right; }
    .linked-summary__score span { color: var(--color-bdo-text-muted); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; }
    .linked-summary__score strong { color: var(--color-bdo-gold-bright); font-family: var(--font-display); font-size: 2rem; }
    .linked-empty { align-items: center; display: flex; flex-direction: column; margin: 3rem auto; max-width: 34rem; padding: 3rem 1.5rem; text-align: center; }
    .linked-empty__mark { color: var(--color-bdo-gold-bright); font-size: 2rem; margin-bottom: 1rem; }
    .linked-empty h2 { margin-bottom: .5rem; }
    .linked-empty p { margin-bottom: 1.25rem; }
    .linked-alert, .linked-success { border: 1px solid; margin-bottom: 1rem; padding: .75rem 1rem; }
    .linked-alert { border-color: rgba(216,102,102,.45); color: var(--color-bdo-red); }
    .linked-success { border-color: rgba(111,191,115,.45); color: var(--color-bdo-green); }
    @media (max-width: 700px) { .linked-page__header { align-items: flex-start; flex-direction: column; } .linked-layout, .linked-form__row { grid-template-columns: 1fr; } .linked-summary { align-items: flex-start; flex-direction: column; } .linked-summary__score { border-left: 0; border-top: 1px solid var(--bdo-surface-line); padding: .75rem 0 0; text-align: left; width: 100%; } }
  `],
})
export class VinculadoComponent implements OnInit {
  private readonly characterService = inject(CharacterService);
  readonly characters = signal<Character[]>([]);
  readonly selectedCharacterId = signal<string | null>(null);
  readonly selectedCharacter = computed(() => this.characters().find((character) => character.id === this.selectedCharacterId()) ?? null);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  garmothUrl = '';
  garmothCode = '';
  linkedGearScore: number | null = null;

  isValid(): boolean {
    return /^https:\/\/garmoth\.com\/character\//.test(this.garmothUrl.trim()) && this.garmothCode.trim().length >= 2 && this.linkedGearScore !== null && this.linkedGearScore >= 0 && this.linkedGearScore <= 10000;
  }

  ngOnInit(): void {
    this.characterService.getAll().subscribe({
      next: (characters) => {
        this.characters.set(characters);
        if (characters[0]) this.selectCharacter(characters[0]);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar tus personajes.');
        this.isLoading.set(false);
      },
    });
  }

  selectCharacter(character: Character): void {
    this.selectedCharacterId.set(character.id);
    this.garmothUrl = character.garmothUrl ?? '';
    this.garmothCode = character.garmothCode ?? '';
    this.linkedGearScore = character.linkedGearScore ?? character.gearScore;
    this.success.set(null);
  }

  save(): void {
    const character = this.selectedCharacter();
    if (!character || !this.isValid()) return;
    this.isSaving.set(true);
    this.error.set(null);
    this.success.set(null);
    this.characterService.update(character.id, {
      garmothUrl: this.garmothUrl.trim(),
      garmothCode: this.garmothCode.trim(),
      linkedGearScore: this.linkedGearScore ?? 0,
      gearScore: this.linkedGearScore ?? 0,
    }).subscribe({
      next: (updated) => {
        this.characters.update((characters) => characters.map((item) => item.id === updated.id ? updated : item));
        this.success.set('Vinculación guardada. El Gear Score del personaje fue actualizado.');
        this.isSaving.set(false);
      },
      error: () => {
        this.error.set('No se pudo guardar la vinculación. Revisa la URL y vuelve a intentarlo.');
        this.isSaving.set(false);
      },
    });
  }
}
