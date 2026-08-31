import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bdp-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="relative overflow-hidden rounded-xl transition-all duration-300"
      [class]="cardClasses()"
      [style.box-shadow]="shadow()"
    >
      <!-- Ornamental border -->
      <div class="absolute inset-0 border-2 rounded-xl pointer-events-none" [style.opacity]="borderOpacity()">
        <div class="absolute inset-0 border-2 rounded-xl" [style.border-image]="borderImage()"></div>
      </div>

      @if (header) {
        <div class="relative p-5 pb-3 border-b border-bdo-border-gold/20">
          <ng-content select="[slot=header]"></ng-content>
        </div>
      }

      <div class="relative p-5">
        <ng-content></ng-content>
      </div>

      @if (footer) {
        <div class="relative p-5 pt-3 border-t border-bdo-border-gold/20 bg-bdo-bg-elevated/50">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      }

      <!-- Decorative corners -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute top-0 left-0 w-4 h-4 border-2 border-bdo-gold/50 rounded-tl-xl border-r-0 border-b-0"></div>
        <div class="absolute top-0 right-0 w-4 h-4 border-2 border-bdo-gold/50 rounded-tr-xl border-l-0 border-b-0"></div>
        <div class="absolute bottom-0 left-0 w-4 h-4 border-2 border-bdo-gold/50 rounded-bl-xl border-r-0 border-t-0"></div>
        <div class="absolute bottom-0 right-0 w-4 h-4 border-2 border-bdo-gold/50 rounded-br-xl border-l-0 border-t-0"></div>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() variant: 'default' | 'gold' | 'bronze' | 'interactive' = 'default';
  @Input() hover = false;
  @Input() padding = true;
  @Input() header = false;
  @Input() footer = false;

  cardClasses = computed(() => {
    const classes = ['bg-bdo-bg-card', 'border', 'overflow-hidden'];

    switch (this.variant) {
      case 'gold':
        classes.push('border-bdo-gold/50', 'shadow-bdo-md', 'shadow-bdo-gold');
        break;
      case 'bronze':
        classes.push('border-bdo-bronze/50', 'shadow-bdo-md');
        break;
      case 'interactive':
        classes.push('border-bdo-border-gold/30', 'shadow-bdo-md', 'cursor-pointer', 'hover:border-bdo-gold/50', 'hover:shadow-bdo-lg', 'hover:shadow-bdo-gold', 'hover:-translate-y-1', 'transition-all', 'duration-300');
        break;
      default:
        classes.push('border-bdo-border-gold/30', 'shadow-bdo-md');
    }

    return classes.join(' ');
  });

  borderOpacity = computed(() => {
    switch (this.variant) {
      case 'gold': return '0.2';
      case 'bronze': return '0.15';
      default: return '0.1';
    }
  });

  borderImage = computed(() => {
    switch (this.variant) {
      case 'gold': return 'linear-gradient(135deg, var(--color-bdo-gold) 0%, var(--color-bdo-bronze) 50%, var(--color-bdo-gold) 100%) 1';
      case 'bronze': return 'linear-gradient(135deg, var(--color-bdo-bronze) 0%, var(--color-bdo-gold) 50%, var(--color-bdo-bronze) 100%) 1';
      default: return 'linear-gradient(135deg, var(--color-bdo-border-gold) 0%, var(--color-bdo-border-gold-dim) 50%, var(--color-bdo-border-gold) 100%) 1';
    }
  });

  shadow = computed(() => {
    switch (this.variant) {
      case 'gold': return 'var(--shadow-bdo-md), var(--shadow-bdo-gold)';
      case 'interactive': return 'var(--shadow-bdo-md)';
      default: return 'var(--shadow-bdo-md)';
    }
  });
}
