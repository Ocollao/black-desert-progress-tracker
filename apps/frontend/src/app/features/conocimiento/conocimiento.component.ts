import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, ProgressComponent } from '../../shared/index';
import { mockKnowledge } from '../../core/mock/bdo-mock-data';

@Component({
  selector: 'bdp-conocimiento',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ProgressComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div>
        <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">El saber es poder · energía máx.</p>
        <h1 class="page-title">Conocimiento</h1>
        <p class="text-sm text-bdo-text-secondary"><strong class="font-mono text-bdo-gold">2.255 / 2.682</strong> descubiertos (84%) · energía actual <strong class="font-mono text-bdo-gold">412</strong></p>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        @for (k of cats; track k.name) {
          <article class="bdo-frame p-4">
            <div class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl border border-bdo-gold/30 bg-bdo-gold/10 text-2xl" aria-hidden="true">{{ k.icon }}</span>
              <div class="flex-1">
                <h3 class="font-display text-sm font-bold uppercase tracking-wider text-bdo-text-primary">{{ k.name }}</h3>
                <p class="font-mono text-xs text-bdo-gold">{{ k.found }} / {{ k.total }}</p>
              </div>
              <bdp-badge variant="gold" size="sm">{{ pct(k) }}%</bdp-badge>
            </div>
            <bdp-progress class="mt-2.5" [value]="pct(k)" variant="blue" size="sm" [showValue]="false"></bdp-progress>
            <p class="mt-1.5 text-[11px] text-bdo-text-muted">Faltan {{ k.total - k.found }} · {{ hint(k.name) }}</p>
          </article>
        }
        <article class="flex flex-col justify-center rounded-xl border border-dashed border-bdo-gold/40 bg-bdo-gold/5 p-4 text-center">
          <p class="font-display text-sm font-bold text-bdo-gold-bright">◆ Próximo hito</p>
          <p class="mt-1 text-xs text-bdo-text-secondary">Academia 250/350 → +5 energía máx. Faltan 6 tomos de Calpheon.</p>
        </article>
      </div>
    </div>
  `,
})
export class ConocimientoComponent {
  cats = mockKnowledge;
  pct(k: { found: number; total: number }): number {
    return Math.round((k.found / k.total) * 100);
  }
  hint(name: string): string {
    const map: Record<string, string> = {
      'Topografía': 'nodos de Drieghan sin visitar',
      'Aventuras': 'diarios de Valencia II',
      'Personajes': 'NPC de la Tierra del Amanecer',
      'Ecología': 'jefes de Gyfin y Sycraia',
      'Academia': 'tomos de la biblioteca de Calpheon',
    };
    return map[name] ?? 'sigue explorando';
  }
}
