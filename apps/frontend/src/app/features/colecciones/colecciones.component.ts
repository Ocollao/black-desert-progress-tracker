import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ProgressComponent, SectionHeadingComponent, ItemCardComponent } from '../../shared/index';
import { mockAchievements, mockCollections } from '../../core/mock/bdo-mock-data';

@Component({
  selector: 'bdp-colecciones',
  standalone: true,
  imports: [CommonModule, CardComponent, ProgressComponent, SectionHeadingComponent, ItemCardComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Tesoros, compañeros y hazañas</p>
          <h1 class="page-title">Colecciones y logros</h1>
        </div>
        <div class="tabs" role="tablist" aria-label="Filtrar colección">
          @for (f of filters; track f) {
            <button class="tab" role="tab" [class.tab-active]="filter() === f" (click)="filter.set(f)">{{ f }}</button>
          }
        </div>
      </div>

      <bdp-card variant="default">
        <bdp-section-heading title="Colección" subtitle="128 / 236 piezas · ● obtenido ● en progreso ● pendiente ● bloqueado" icon="💎"></bdp-section-heading>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          @for (c of visible(); track c.name) {
            <bdp-item-card [item]="c"></bdp-item-card>
          }
        </div>
      </bdp-card>

      <bdp-card variant="default">
        <bdp-section-heading title="Logros" subtitle="842 / 1.180 · 71%" icon="🏆"></bdp-section-heading>
        <ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
          @for (a of achievements; track a.title) {
            <li class="flex items-center gap-3 rounded-xl border border-bdo-gold/20 bg-bdo-bg/60 p-3">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl" [class]="a.state === 'OBTENIDO' ? 'border border-bdo-green/40 bg-bdo-green/10' : 'border border-bdo-gold/30 bg-bdo-gold/10'" aria-hidden="true">{{ a.state === 'OBTENIDO' ? '🏆' : a.icon }}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-baseline justify-between gap-2">
                  <p class="truncate text-sm font-semibold text-bdo-text-primary">{{ a.state === 'OBTENIDO' ? '✓ ' : '' }}{{ a.title }}</p>
                  <span class="font-mono text-xs text-bdo-gold">{{ a.value }}%</span>
                </div>
                <bdp-progress [value]="a.value" [variant]="a.state === 'OBTENIDO' ? 'green' : 'gold'" size="sm" [showValue]="false"></bdp-progress>
                <p class="mt-0.5 truncate text-[11px] text-bdo-text-muted">{{ a.desc }}</p>
              </div>
            </li>
          }
        </ul>
      </bdp-card>
    </div>
  `,
})
export class ColeccionesComponent {
  achievements = mockAchievements;
  filter = signal('Todo');
  filters = ['Todo', 'Obtenidos', 'En progreso', 'Bloqueados'];
  visible = computed(() => {
    switch (this.filter()) {
      case 'Obtenidos': return mockCollections.filter((c) => c.state === 'OBTENIDO');
      case 'En progreso': return mockCollections.filter((c) => c.state === 'EN_PROGRESO' || c.state === 'PENDIENTE');
      case 'Bloqueados': return mockCollections.filter((c) => c.state === 'BLOQUEADO');
      default: return mockCollections;
    }
  });
}
