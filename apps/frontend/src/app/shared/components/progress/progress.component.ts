import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant = 'default' | 'gold' | 'bronze' | 'green' | 'red' | 'blue';
export type ProgressSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'bdp-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      @if (label || showValue) {
        <div class="flex items-center justify-between mb-1.5">
          @if (label) {
            <span class="text-sm font-medium text-bdo-text-secondary">{{ label }}</span>
          }
          @if (showValue) {
            <span class="text-sm font-mono text-bdo-gold">{{ value }}%</span>
          }
        </div>
      }

      <div class="progress relative overflow-hidden" [class]="trackClasses()" role="progressbar" [attr.aria-valuenow]="value" aria-valuemin="0" aria-valuemax="100" [attr.aria-label]="label">
        <div
          class="progress-bar"
          [style.width.%]="clampedValue"
          [class]="barClasses()"
        >
          @if (striped) {
            <div class="absolute inset-0 animate-shimmer opacity-30" [style.background-image]="'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)'"></div>
          }
        </div>
      </div>

      @if (subLabel) {
        <p class="mt-1.5 text-xs text-bdo-text-muted">{{ subLabel }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProgressComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() label = '';
  @Input() subLabel = '';
  @Input() showValue = true;
  @Input() variant: ProgressVariant = 'gold';
  @Input() size: ProgressSize = 'md';
  @Input() striped = false;
  @Input() animated = false;
  @Input() rounded = true;

  clampedValue = computed(() => Math.max(0, Math.min(100, (this.value / this.max) * 100)));

  trackClasses = computed(() => {
    const classes = ['progress', 'overflow-hidden'];
    if (this.rounded) classes.push('rounded-full');
    switch (this.size) {
      case 'sm': classes.push('h-1.5'); break;
      case 'md': classes.push('h-2'); break;
      case 'lg': classes.push('h-3'); break;
    }
    return classes.join(' ');
  });

  barClasses = computed(() => {
    const classes = ['progress-bar', 'h-full', 'rounded-full', 'transition-all', 'duration-500', 'ease-out'];
    switch (this.variant) {
      case 'gold': classes.push('bg-gradient-to-r', 'from-bdo-gold', 'via-bdo-gold-bright', 'to-bdo-bronze'); break;
      case 'bronze': classes.push('bg-gradient-to-r', 'from-bdo-bronze', 'to-bdo-gold'); break;
      case 'green': classes.push('bg-gradient-to-r', 'from-bdo-green', 'to-bdo-green-dim'); break;
      case 'red': classes.push('bg-gradient-to-r', 'from-bdo-red', 'to-bdo-red-dim'); break;
      case 'blue': classes.push('bg-gradient-to-r', 'from-bdo-blue', 'to-bdo-blue-dim'); break;
      default: classes.push('bg-gradient-to-r', 'from-bdo-gold', 'to-bdo-bronze');
    }
    if (this.animated) classes.push('animate-pulse-gold');
    return classes.join(' ');
  });
}
