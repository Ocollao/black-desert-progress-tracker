import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RARITY_STYLES, type CollectionItem } from '../../../core/mock/bdo-mock-data';

/** Celda de colección: obtenida con brillo de rareza, pendiente atenuada, bloqueada con candado. */
@Component({
  selector: 'bdp-item-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative flex flex-col items-center gap-1.5 rounded-xl border bg-bdo-bg/60 p-3 text-center transition-all duration-200 hover:-translate-y-0.5"
      [class]="cardClass()" [attr.aria-label]="item.name + ' — ' + item.state">
      <span class="text-3xl" [class]="item.state === 'BLOQUEADO' ? 'opacity-30 grayscale' : ''" aria-hidden="true">
        {{ item.state === 'BLOQUEADO' ? '🔒' : item.icon }}
      </span>
      <p class="text-xs font-semibold leading-tight" [class]="item.state === 'BLOQUEADO' ? 'text-bdo-text-muted' : 'text-bdo-text-primary'">{{ item.name }}</p>
      <p class="text-[10px] leading-tight text-bdo-text-muted">{{ item.state === 'BLOQUEADO' ? 'Bloqueado' : item.hint }}</p>
      <span class="absolute right-2 top-2 h-2 w-2 rounded-full"
        [class]="dotClass()" [title]="item.state"></span>
    </div>
  `,
})
export class ItemCardComponent {
  @Input({ required: true }) item!: CollectionItem;

  cardClass(): string {
    if (this.item.state === 'BLOQUEADO') return 'border-white/10 opacity-70';
    if (this.item.state === 'PENDIENTE') return 'border-white/20 opacity-85';
    return RARITY_STYLES[this.item.rarity];
  }
  dotClass(): string {
    switch (this.item.state) {
      case 'OBTENIDO': return 'bg-bdo-green shadow-[0_0_8px_rgba(111,191,115,.8)]';
      case 'EN_PROGRESO': return 'bg-bdo-gold shadow-[0_0_8px_rgba(200,164,93,.8)] animate-pulse';
      case 'PENDIENTE': return 'bg-bdo-blue';
      default: return 'bg-bdo-red/60';
    }
  }
}
