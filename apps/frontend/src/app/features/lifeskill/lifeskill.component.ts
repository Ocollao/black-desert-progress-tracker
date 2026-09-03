import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, ProgressComponent, SectionHeadingComponent } from '../../shared/index';
import { mockLifeSkills } from '../../core/mock/bdo-mock-data';

@Component({
  selector: 'bdp-lifeskill',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ProgressComponent, SectionHeadingComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div>
        <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Oficios del aventurero · plata, calma y maestría</p>
        <h1 class="page-title">LifeSkill</h1>
        <p class="text-sm text-bdo-text-secondary">Nivel medio <strong class="font-mono text-bdo-gold">Maestro 2</strong> · 2 oficios en Maestro+ · foco: Cocina → Gurú</p>
      </div>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        @for (s of skills; track s.name) {
          <article class="bdo-frame p-4 transition-all hover:-translate-y-0.5 hover:border-bdo-gold/50">
            <div class="flex items-center gap-3">
              <span class="flex h-12 w-12 items-center justify-center rounded-xl border border-bdo-gold/30 bg-bdo-gold/10 text-2xl" aria-hidden="true">{{ s.icon }}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-baseline justify-between gap-2">
                  <h3 class="truncate font-display text-sm font-bold uppercase tracking-wider text-bdo-text-primary">{{ s.name }}</h3>
                  <span class="shrink-0 font-mono text-xs font-bold text-bdo-gold">{{ s.value }}%</span>
                </div>
                <p class="text-xs text-bdo-text-secondary">{{ s.level }} · <span class="text-bdo-text-muted">{{ s.xp }}</span></p>
              </div>
            </div>
            <bdp-progress class="mt-2.5" [value]="s.value" variant="green" size="sm" [showValue]="false"></bdp-progress>
            <dl class="mt-2.5 space-y-1 border-t border-bdo-gold/10 pt-2 text-[11px]">
              <div class="flex justify-between gap-2"><dt class="text-bdo-text-muted">Herramienta</dt><dd class="truncate text-bdo-text-secondary">{{ s.tool }}</dd></div>
              <div class="flex justify-between gap-2"><dt class="text-bdo-text-muted">Pendiente</dt><dd class="truncate text-bdo-gold">{{ s.pending }}</dd></div>
            </dl>
          </article>
        }
      </div>

      <bdp-card variant="gold">
        <bdp-section-heading title="Ruta recomendada" subtitle="Cocina imperial → plata diaria estable" icon="🍳"></bdp-section-heading>
        <ol class="grid grid-cols-1 gap-2 sm:grid-cols-3">
          @for (step of ['1 · Cocina 1.200 platos imperiales', '2 · Entrega doble diaria (sellos ×40)', '3 · Con la plata: Cron para Kutum PEN']; track step) {
            <li class="rounded-lg border border-bdo-gold/25 bg-bdo-bg/60 px-3 py-2.5 text-sm text-bdo-text-secondary">{{ step }}</li>
          }
        </ol>
        <div class="mt-3 flex flex-wrap gap-2">
          <a routerLink="/objetivos" class="btn btn-primary btn-sm">Ver objetivo de Cocina</a>
          <a routerLink="/desafios" class="btn btn-secondary btn-sm">Retos diarios LifeSkill</a>
        </div>
      </bdp-card>
    </div>
  `,
})
export class LifeskillComponent {
  skills = mockLifeSkills;
}
