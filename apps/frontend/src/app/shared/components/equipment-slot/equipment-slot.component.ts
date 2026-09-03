import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RARITY_STYLES, type EquipmentSlotData } from '../../../core/mock/bdo-mock-data';
import { BadgeComponent } from '../badge/badge.component';
import { ProgressComponent } from '../progress/progress.component';

const STATE_BADGE: Record<string, 'gold' | 'green' | 'red' | 'blue' | 'amber'> = {
  OBTENIDO: 'green',
  EN_PROGRESO: 'gold',
  PENDIENTE: 'blue',
  BLOQUEADO: 'red',
};

/** Slot de equipo estilo inventario MMORPG: icono con rareza, nombre, mejora, estado y progreso. */
@Component({
  selector: 'bdp-equipment-slot',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ProgressComponent],
  template: `
    <div class="group flex gap-3 rounded-xl border border-bdo-gold/20 bg-bdo-bg/60 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-bdo-gold/50 hover:shadow-bdo-gold">
      <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border-2 bg-gradient-to-br from-bdo-bg-elevated to-bdo-bg text-2xl"
        [class]="rarityClass()">
        <span aria-hidden="true">{{ data.icon }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="text-[10px] uppercase tracking-widest text-bdo-text-muted">{{ data.slot }} · {{ data.grade }}</p>
            <p class="truncate text-sm font-semibold text-bdo-text-primary">{{ data.item }}</p>
          </div>
          <bdp-badge [variant]="stateVariant()" size="sm">{{ data.enhancement }}</bdp-badge>
        </div>
        <div class="mt-2 flex items-center gap-2">
          <bdp-progress class="flex-1" [value]="data.progress" variant="gold" size="sm" [showValue]="false"></bdp-progress>
          <span class="font-mono text-[11px] text-bdo-gold">{{ data.progress }}%</span>
          <span class="hidden text-[10px] uppercase tracking-wider text-bdo-text-muted sm:inline">{{ data.state.replace('_', ' ') }}</span>
        </div>
      </div>
    </div>
  `,
})
export class EquipmentSlotComponent {
  @Input({ required: true }) data!: EquipmentSlotData;

  rarityClass(): string {
    return RARITY_STYLES[this.data?.rarity ?? 'comun'];
  }
  stateVariant(): 'gold' | 'green' | 'red' | 'blue' | 'amber' {
    return STATE_BADGE[this.data?.state] ?? 'gold';
  }
}
