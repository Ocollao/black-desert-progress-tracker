import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent, ProgressRingComponent } from '../../shared/index';
import { mockCategoryProgress, mockCharacter } from '../../core/mock/bdo-mock-data';

interface Alt { name: string; cls: string; level: number; gs: number; active: boolean; }

@Component({
  selector: 'bdp-personaje',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent, ProgressRingComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Ficha del aventurero · ¿Quién soy?</p>
      <!-- Retrato + identidad -->
      <section class="bdo-frame bdo-frame--gold overflow-hidden">
        <div class="relative flex flex-col items-center gap-4 p-5 text-center sm:p-6 lg:flex-row lg:text-left">
          <span class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-bdo-gold via-bdo-gold-bright to-bdo-gold-dim font-display text-5xl font-bold text-bdo-text-dark shadow-bdo-gold-lg" aria-hidden="true">{{ char.name.charAt(0) }}</span>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <h1 class="font-display text-3xl font-bold text-gradient-gold">{{ char.name }}</h1>
              <bdp-badge variant="gold" size="sm">Nv. {{ char.level }}</bdp-badge>
              <bdp-badge variant="green" size="sm" [dot]="true">Activo</bdp-badge>
            </div>
            <p class="mt-1 text-sm text-bdo-text-secondary">{{ char.class }} · {{ char.family }} · {{ char.region }}</p>
            <div class="mt-2 flex flex-wrap justify-center gap-1.5 lg:justify-start">
              <bdp-badge variant="gold" size="sm">CP {{ char.cp }}</bdp-badge>
              <bdp-badge variant="default" size="sm">JcE · Gyfin</bdp-badge>
              <bdp-badge variant="default" size="sm">Gremio Corvane</bdp-badge>
            </div>
          </div>
          <bdp-progress-ring [value]="char.progress" [size]="112" label="Total"></bdp-progress-ring>
        </div>
        <!-- Franja de stats de combate -->
        <dl class="grid grid-cols-2 border-t border-bdo-gold/20 bg-bdo-bg/50 sm:grid-cols-5">
          @for (s of stats; track s.k) {
            <div class="border-b border-r border-bdo-gold/10 px-3 py-3 text-center last:border-r-0 sm:border-b-0">
              <dt class="text-[10px] font-semibold uppercase tracking-[0.2em] text-bdo-text-muted">{{ s.k }}</dt>
              <dd class="font-display text-2xl font-bold text-bdo-gold-bright">{{ s.v }}</dd>
              <dd class="text-[10px] text-bdo-text-muted">{{ s.d }}</dd>
            </div>
          }
        </dl>
      </section>

      <div class="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <bdp-card variant="default" class="xl:col-span-2">
          <bdp-section-heading title="Atributos de combate" subtitle="Estadísticas principales" icon="⚔"></bdp-section-heading>
          <ul class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            @for (c of bars; track c.label) {
              <li>
                <div class="mb-1 flex items-center justify-between text-sm">
                  <span class="font-medium text-bdo-text-primary">{{ c.label }}</span>
                  <span class="font-mono text-xs text-bdo-gold">{{ c.value }}%</span>
                </div>
                <bdp-progress [value]="c.value" [variant]="c.tone" size="sm" [showValue]="false"></bdp-progress>
                <p class="mt-0.5 text-[11px] text-bdo-text-muted">{{ c.detail }}</p>
              </li>
            }
          </ul>
          <div class="mt-4 flex flex-wrap gap-2">
            <a routerLink="/equipo" class="btn btn-primary btn-sm">Ver equipo completo</a>
            <a routerLink="/progresion" class="btn btn-secondary btn-sm">Árbol de progresión</a>
          </div>
        </bdp-card>

        <bdp-card variant="default">
          <bdp-section-heading title="Personajes alternativos" subtitle="Tu familia" icon="👥"></bdp-section-heading>
          <ul class="space-y-2">
            @for (a of alts; track a.name) {
              <li class="list-item">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-bdo-gold/40 to-bdo-gold/10 font-display font-bold text-bdo-gold-bright">{{ a.name.charAt(0) }}</span>
                <div class="list-item-content">
                  <p class="list-item-title text-sm">{{ a.name }} <span class="font-normal text-bdo-text-muted">· {{ a.cls }}</span></p>
                  <p class="list-item-subtitle text-xs">Nv.{{ a.level }} · GS {{ a.gs }}</p>
                </div>
                @if (a.active) { <bdp-badge variant="green" size="sm">Main</bdp-badge> }
              </li>
            }
          </ul>
          <a routerLink="/characters" class="mt-3 block text-center text-[11px] font-semibold uppercase tracking-widest text-bdo-gold hover:text-bdo-gold-bright">Gestionar personajes →</a>
        </bdp-card>
      </div>
    </div>
  `,
})
export class PersonajeComponent {
  char = mockCharacter;
  stats = [
    { k: 'AP', v: mockCharacter.ap, d: 'Ataque principal' },
    { k: 'AAP', v: mockCharacter.aap, d: 'Ataque despertar' },
    { k: 'DP', v: mockCharacter.dp, d: 'Defensa total' },
    { k: 'Evasión', v: mockCharacter.evasion, d: 'Evasión base' },
    { k: 'CP', v: mockCharacter.cp, d: 'Puntos contribución' },
  ];
  bars = [
    { label: 'Precisión', value: 88, tone: 'gold' as const, detail: 'Nivel 66 · +12% JcE' },
    { label: 'Crítico', value: 76, tone: 'red' as const, detail: '5/5 crítico · +2 especial' },
    { label: 'Velocidad ataque', value: 69, tone: 'blue' as const, detail: '4/5 · gema pendiente' },
    { label: 'Reducción daño', value: 81, tone: 'green' as const, detail: 'DR 312 · Resistencia 40%' },
  ];
  alts: Alt[] = [
    { name: 'Seraphelle', cls: 'Caballero Oscuro', level: 66, gs: 7248, active: true },
    { name: 'Kaelis', cls: 'Mística', level: 63, gs: 6810, active: false },
    { name: 'Dornvak', cls: 'Berserker', level: 61, gs: 6540, active: false },
    { name: 'Mirabel', cls: 'Shai', level: 64, gs: 5905, active: false },
  ];
  categories = mockCategoryProgress;
}
