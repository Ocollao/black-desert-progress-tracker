import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent, ActivityTimelineComponent } from '../../shared/index';
import { mockActivity, mockGoals, type Goal } from '../../core/mock/bdo-mock-data';

@Component({
  selector: 'bdp-objetivos',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent, ActivityTimelineComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Objetivos personales · ¿Qué debería hacer después?</p>
          <h1 class="page-title">Objetivos</h1>
        </div>
        <div class="tabs" role="tablist" aria-label="Filtrar objetivos">
          @for (f of filters; track f) {
            <button class="tab" role="tab" [class.tab-active]="filter() === f" (click)="filter.set(f)">{{ f }}</button>
          }
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div class="space-y-3 xl:col-span-2">
          @for (g of visible(); track g.title) {
            <article class="bdo-frame p-4 transition-all hover:-translate-y-0.5 hover:border-bdo-gold/50">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-[10px] uppercase tracking-widest text-bdo-text-muted">{{ g.category }}</span>
                <span class="ml-auto flex gap-1.5">
                  <bdp-badge [variant]="g.priority === 'Alta' ? 'red' : g.priority === 'Media' ? 'gold' : 'blue'" size="sm">{{ g.priority }}</bdp-badge>
                  <bdp-badge [variant]="g.state === 'OBTENIDO' ? 'green' : 'gold'" size="sm">{{ g.state === 'OBTENIDO' ? '✓ Completado' : g.difficulty }}</bdp-badge>
                </span>
              </div>
              <h3 class="mt-1 font-display text-base font-bold text-bdo-text-primary">{{ g.state === 'OBTENIDO' ? '✓ ' : '○ ' }}{{ g.title }}</h3>
              <div class="mt-2 flex items-center gap-2">
                <bdp-progress class="flex-1" [value]="g.progress" [variant]="g.state === 'OBTENIDO' ? 'green' : 'gold'" size="md" [showValue]="false" [striped]="g.state !== 'OBTENIDO'"></bdp-progress>
                <span class="font-mono text-sm font-bold text-bdo-gold">{{ g.progress }}%</span>
              </div>
              <p class="mt-1.5 text-xs text-bdo-text-secondary">Falta: <span class="text-bdo-text-primary">{{ g.target }}</span> · Recompensa: <span class="text-bdo-gold">{{ g.reward }}</span></p>
            </article>
          }
        </div>
        <bdp-card variant="gold">
          <bdp-section-heading title="Actividad reciente" subtitle="Tu historia" icon="📜"></bdp-section-heading>
          <bdp-activity-timeline [items]="activity"></bdp-activity-timeline>
        </bdp-card>
      </div>
    </div>
  `,
})
export class ObjetivosComponent {
  activity = mockActivity;
  filter = signal('Todos');
  filters = ['Todos', 'En progreso', 'Pendientes', 'Completados'];
  visible = computed(() => {
    const f = this.filter();
    if (f === 'En progreso') return mockGoals.filter((g: Goal) => g.state === 'EN_PROGRESO');
    if (f === 'Pendientes') return mockGoals.filter((g: Goal) => g.state === 'PENDIENTE');
    if (f === 'Completados') return mockGoals.filter((g: Goal) => g.state === 'OBTENIDO');
    return mockGoals;
  });
}
