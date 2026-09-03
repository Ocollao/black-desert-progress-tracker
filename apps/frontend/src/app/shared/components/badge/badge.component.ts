import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'gold' | 'silver' | 'red' | 'green' | 'blue' | 'default';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'bdp-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center gap-1.5 font-medium"
      [class]="badgeClasses()"
      [attr.aria-label]="ariaLabel"
    >
      @if (icon) {
        <ng-content select="[slot=icon]"></ng-content>
      }
      @if (label) {
        <span>{{ label }}</span>
      } @else {
        <ng-content></ng-content>
      }
      @if (dot) {
        <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      }
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
  @Input() label = '';
  @Input() icon = false;
  @Input() dot = false;
  @Input() ariaLabel = '';

  badgeClasses = computed(() => {
    const classes = ['inline-flex', 'items-center', 'gap-1.5', 'font-medium', 'rounded-full'];

    // Variant
    switch (this.variant) {
      case 'gold':
        classes.push('badge-gold');
        break;
      case 'silver':
        classes.push('badge-silver');
        break;
      case 'red':
        classes.push('badge-red');
        break;
      case 'green':
        classes.push('badge-green');
        break;
      case 'blue':
        classes.push('bg-bdo-black-elevated', 'text-bdo-gold', 'border', 'border-bdo-gold/30');
        break;
      default:
        classes.push('bg-bdo-black-elevated', 'text-bdo-text-secondary', 'border', 'border-bdo-border-gold/30');
    }

    // Size
    switch (this.size) {
      case 'sm':
        classes.push('px-2', 'py-0.5', 'text-xs');
        break;
      case 'md':
        classes.push('px-2.5', 'py-1', 'text-xs');
        break;
      case 'lg':
        classes.push('px-3', 'py-1.5', 'text-sm');
        break;
    }

    return classes.join(' ');
  });
}
