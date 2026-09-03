import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent, ProgressRingComponent } from '../../shared/index';
import { mockCategoryProgress } from '../../core/mock/bdo-mock-data';

interface Branch { icon: string; label: string; value: number; children: { label: string; value: number }[]; }

@Component({
  selector: 'bdp-progresion',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent, ProgressRingComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div>
        <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Árbol de progresión · ¿Cuánto llevo y qué me falta?</p>
        <h1 class="page-title">Progresión</h1>
      </div>

      <!-- Anillo total + ramas -->
      <section class="bdo-frame bdo-frame--gold p-4 sm:p-5">
        <div class="flex flex-col items-center gap-4 sm:flex-row">
          <bdp-progress-ring [value]="82" [size]="132" label="Total"></bdp-progress-ring>
          <div class="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
            @for (c of categories; track c.key) {
              <a [routerLink]="c.key === 'lifeskill' ? '/lifeskill' : c.key === 'aventuras' ? '/aventuras' : c.key === 'conocimiento' ? '/conocimiento' : c.key === 'colecciones' ? '/colecciones' : '/progresion'"
                class="rounded-xl border border-bdo-gold/20 bg-bdo-bg/60 p-2.5 text-center transition-all hover:-translate-y-0.5 hover:border-bdo-gold/50">
                <p class="text-lg" aria-hidden="true">{{ c.icon }}</p>
                <p class="text-xs font-semibold text-bdo-text-primary">{{ c.label }}</p>
                <p class="font-mono text-sm font-bold text-bdo-gold">{{ c.value }}%</p>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Árbol -->
      <bdp-card variant="default">
        <bdp-section-heading title="Árbol de progresión" subtitle="Personaje → ramas → hojas" icon="🌳"></bdp-section-heading>
        <ol class="space-y-3">
          @for (b of tree; track b.label) {
            <li class="rounded-xl border border-bdo-gold/20 bg-bdo-bg/50 p-3">
              <div class="flex items-center gap-2.5">
                <span class="flex h-9 w-9 items-center justify-center rounded-lg border border-bdo-gold/30 bg-bdo-gold/10 text-lg" aria-hidden="true">{{ b.icon }}</span>
                <p class="flex-1 text-sm font-bold text-bdo-text-primary">{{ b.label }}</p>
                <span class="font-mono text-sm font-bold text-bdo-gold">{{ b.value }}%</span>
                <bdp-badge [variant]="b.value >= 85 ? 'green' : b.value >= 60 ? 'gold' : 'blue'" size="sm">{{ b.value >= 85 ? 'Sólido' : b.value >= 60 ? 'En marcha' : 'Enfoque' }}</bdp-badge>
              </div>
              <bdp-progress class="mt-2" [value]="b.value" variant="gold" size="sm" [showValue]="false"></bdp-progress>
              <ul class="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                @for (leaf of b.children; track leaf.label) {
                  <li class="flex items-center gap-2 rounded-lg border border-white/5 bg-bdo-bg-elevated/50 px-2.5 py-1.5">
                    <span class="h-1.5 w-1.5 shrink-0 rounded-full" [class]="leaf.value >= 85 ? 'bg-bdo-green' : leaf.value >= 60 ? 'bg-bdo-gold' : 'bg-bdo-blue'"></span>
                    <span class="flex-1 truncate text-xs text-bdo-text-secondary">{{ leaf.label }}</span>
                    <span class="font-mono text-[11px] text-bdo-gold">{{ leaf.value }}%</span>
                  </li>
                }
              </ul>
            </li>
          }
        </ol>
      </bdp-card>
    </div>
  `,
})
export class ProgresionComponent {
  categories = mockCategoryProgress;
  tree: Branch[] = [
    { icon: '⚔', label: 'Combate', value: 91, children: [
      { label: 'Equipo 7.248 GS', value: 88 }, { label: 'AP 301 / meta 305', value: 94 },
      { label: 'DP 408 / meta 410', value: 96 }, { label: 'JcE · Gyfin', value: 84 }, { label: 'JcJ · Arena', value: 62 } ] },
    { icon: '🌿', label: 'LifeSkill', value: 67, children: [
      { label: 'Pesca Maestro 12', value: 92 }, { label: 'Cocina Maestro 4', value: 71 },
      { label: 'Alquimia Experto 8', value: 58 }, { label: 'Recolección Maestro 1', value: 84 }, { label: 'Comercio Experto 2', value: 47 } ] },
    { icon: '🗺', label: 'Aventuras', value: 74, children: [
      { label: 'Diario Bartali 12/14', value: 86 }, { label: 'Kamasylvia 84%', value: 84 }, { label: 'Valencia 61%', value: 61 } ] },
    { icon: '📖', label: 'Conocimiento', value: 83, children: [
      { label: 'Ecología 690/820', value: 84 }, { label: 'Topografía 412/460', value: 90 }, { label: 'Academia 244/350', value: 70 } ] },
    { icon: '💎', label: 'Colecciones', value: 54, children: [
      { label: 'Monturas 3/6', value: 50 }, { label: 'Tesoros 7/20', value: 35 }, { label: 'Mascotas 5/5', value: 100 } ] },
    { icon: '🏆', label: 'Logros', value: 71, children: [
      { label: 'Caza 100%', value: 100 }, { label: 'Erudito 82%', value: 82 }, { label: 'Refuerzo 66%', value: 66 } ] },
  ];
}
