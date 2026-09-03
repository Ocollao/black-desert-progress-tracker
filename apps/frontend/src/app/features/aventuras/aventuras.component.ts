import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent } from '../../shared/index';
import { mockRegions } from '../../core/mock/bdo-mock-data';

@Component({
  selector: 'bdp-aventuras',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div>
        <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">El mundo por descubrir · ¿Dónde he estado?</p>
        <h1 class="page-title">Aventuras y regiones</h1>
        <p class="text-sm text-bdo-text-secondary">24 regiones · 17 exploradas · foco actual: <strong class="text-bdo-gold">Kamasylvia 84%</strong></p>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        @for (r of regions; track r.name) {
          <article class="bdo-frame overflow-hidden transition-all hover:-translate-y-0.5 hover:border-bdo-gold/50" [class.opacity-60]="r.locked">
            <div class="flex items-center gap-3 border-b border-bdo-gold/15 bg-bdo-bg-elevated/40 p-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl border border-bdo-gold/30 bg-bdo-gold/10 text-2xl" aria-hidden="true">{{ r.icon }}</span>
              <div class="min-w-0 flex-1">
                <h3 class="truncate font-display text-base font-bold text-bdo-text-primary">{{ r.name }}</h3>
                <p class="truncate text-[11px] text-bdo-text-muted">{{ r.note }}</p>
              </div>
              <bdp-badge [variant]="avg(r) >= 85 ? 'green' : avg(r) >= 60 ? 'gold' : 'blue'" size="sm">{{ avg(r) }}%</bdp-badge>
            </div>
            <ul class="grid grid-cols-2 gap-x-4 gap-y-2 p-3">
              @for (m of [['Aventuras', r.aventuras], ['Conocimiento', r.conocimiento], ['Misiones', r.misiones], ['Colecciones', r.colecciones]]; track m[0]) {
                <li>
                  <div class="mb-0.5 flex justify-between text-[11px]"><span class="text-bdo-text-secondary">{{ m[0] }}</span><span class="font-mono text-bdo-gold">{{ m[1] }}%</span></div>
                  <bdp-progress [value]="$any(m[1])" variant="gold" size="sm" [showValue]="false"></bdp-progress>
                </li>
              }
            </ul>
          </article>
        }
      </div>
      <bdp-card variant="default">
        <bdp-section-heading title="Diario del aventurero" subtitle="Bartali · Deve · Kamasylvia" icon="📓"></bdp-section-heading>
        <ul class="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <li class="list-item"><div class="list-item-content"><p class="list-item-title text-sm">Guía de Bartali 12/14</p><p class="list-item-subtitle text-xs">+2 DP al completar</p></div><bdp-badge variant="gold" size="sm">86%</bdp-badge></li>
          <li class="list-item"><div class="list-item-content"><p class="list-item-title text-sm">Diario de Deve 8/11</p><p class="list-item-subtitle text-xs">Inventario +5</p></div><bdp-badge variant="blue" size="sm">73%</bdp-badge></li>
          <li class="list-item"><div class="list-item-content"><p class="list-item-title text-sm">Kamasylvia 5/9</p><p class="list-item-subtitle text-xs">Título «Luz del bosque»</p></div><bdp-badge variant="blue" size="sm">56%</bdp-badge></li>
        </ul>
      </bdp-card>
    </div>
  `,
})
export class AventurasComponent {
  regions = mockRegions;
  avg(r: { aventuras: number; conocimiento: number; misiones: number; colecciones: number }): number {
    return Math.round((r.aventuras + r.conocimiento + r.misiones + r.colecciones) / 4);
  }
}
