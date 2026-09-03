import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent } from '../../shared/index';
import { mockChallenges } from '../../core/mock/bdo-mock-data';

@Component({
  selector: 'bdp-desafios',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Constancia del aventurero · recompensas por ritmo</p>
          <h1 class="page-title">Desafíos</h1>
        </div>
        <div class="tabs" role="tablist" aria-label="Filtrar desafíos">
          @for (f of filters; track f) {
            <button class="tab" role="tab" [class.tab-active]="filter() === f" (click)="filter.set(f)">{{ f }}</button>
          }
        </div>
      </div>

      @for (group of groups(); track group.k) {
        <bdp-card variant="default">
          <bdp-section-heading [title]="group.title" [subtitle]="group.sub" [icon]="group.icon"></bdp-section-heading>
          <ul class="space-y-2.5">
            @for (c of group.items; track c.title) {
              <li class="rounded-xl border p-3 transition-all hover:-translate-y-0.5"
                [class]="c.state === 'OBTENIDO' ? 'border-bdo-green/40 bg-bdo-green/5' : 'border-bdo-gold/20 bg-bdo-bg/60 hover:border-bdo-gold/50'">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="flex h-8 w-8 items-center justify-center rounded-lg text-base" [class]="c.state === 'OBTENIDO' ? 'bg-bdo-green/15 text-bdo-green' : 'bg-bdo-gold/15 text-bdo-gold'" aria-hidden="true">{{ c.state === 'OBTENIDO' ? '✓' : '○' }}</span>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-bdo-text-primary">{{ c.title }}</p>
                    <p class="truncate text-[11px] text-bdo-text-muted">{{ c.desc }}</p>
                  </div>
                  <bdp-badge [variant]="c.state === 'OBTENIDO' ? 'green' : 'gold'" size="sm">{{ c.state === 'OBTENIDO' ? 'Completado' : c.progress + '/' + c.total }}</bdp-badge>
                </div>
                <div class="mt-2 flex items-center gap-2">
                  <bdp-progress class="flex-1" [value]="pct(c)" [variant]="c.state === 'OBTENIDO' ? 'green' : 'gold'" size="sm" [showValue]="false"></bdp-progress>
                  <span class="font-mono text-[11px] text-bdo-gold">{{ pct(c) }}%</span>
                </div>
                <div class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-bdo-text-muted">
                  <span>🎁 <span class="text-bdo-text-secondary">{{ c.reward }}</span></span>
                  <span>★ {{ c.difficulty }}</span>
                  <span class="ml-auto">⏳ {{ c.timeLeft }}</span>
                </div>
              </li>
            }
          </ul>
        </bdp-card>
      }
    </div>
  `,
})
export class DesafiosComponent {
  filter = signal('Todos');
  filters = ['Todos', 'Diarios', 'Semanales', 'Mensuales'];
  pct(c: { progress: number; total: number }): number {
    return Math.min(100, Math.round((c.progress / c.total) * 100));
  }
  groups = computed(() => {
    const f = this.filter();
    const pick = (k: string) => mockChallenges.filter((c) => c.kind === k);
    const all = [
      { k: 'diaria', title: 'Desafíos diarios', sub: 'Se reinician cada día', icon: '☀', items: pick('diaria') },
      { k: 'semanal', title: 'Desafíos semanales', sub: 'Se reinician el jueves', icon: '🌙', items: pick('semanal') },
      { k: 'mensual', title: 'Desafíos mensuales', sub: 'Largo aliento · grandes tesoros', icon: '⭐', items: pick('mensual') },
    ];
    if (f === 'Diarios') return all.slice(0, 1);
    if (f === 'Semanales') return all.slice(1, 2);
    if (f === 'Mensuales') return all.slice(2, 3);
    return all;
  });
}
