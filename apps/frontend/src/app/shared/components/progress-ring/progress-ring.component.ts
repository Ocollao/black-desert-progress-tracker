import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Anillo de progreso SVG — para progreso total y stats circulares. */
@Component({
  selector: 'bdp-progress-ring',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-flex items-center justify-center" [style.width.px]="size" [style.height.px]="size" role="progressbar" [attr.aria-valuenow]="value" aria-valuemin="0" aria-valuemax="100" [attr.aria-label]="label">
      <svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="'0 0 ' + size + ' ' + size" class="-rotate-90">
        <circle [attr.cx]="size/2" [attr.cy]="size/2" [attr.r]="radius()" fill="none" stroke="rgba(200,164,93,.15)" [attr.stroke-width]="stroke" />
        <circle [attr.cx]="size/2" [attr.cy]="size/2" [attr.r]="radius()" fill="none" [attr.stroke]="strokeColor()" [attr.stroke-width]="stroke"
          stroke-linecap="round" [attr.stroke-dasharray]="circumference()" [attr.stroke-dashoffset]="offset()" style="transition: stroke-dashoffset .8s ease" />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="font-display text-xl font-bold text-bdo-gold-bright sm:text-2xl">{{ value }}<span class="text-xs font-normal text-bdo-text-muted">%</span></span>
        @if (label) {
          <span class="max-w-[90%] truncate px-1 text-center text-[10px] uppercase tracking-widest text-bdo-text-muted">{{ label }}</span>
        }
      </div>
    </div>
  `,
})
export class ProgressRingComponent {
  @Input() value = 0;
  @Input() size = 120;
  @Input() stroke = 10;
  @Input() label = '';
  @Input() tone: 'gold' | 'green' | 'red' | 'blue' = 'gold';

  radius = computed(() => this.size / 2 - this.stroke);
  circumference = computed(() => 2 * Math.PI * this.radius());
  offset = computed(() => this.circumference() * (1 - Math.max(0, Math.min(100, this.value)) / 100));
  strokeColor = computed(() => {
    switch (this.tone) {
      case 'green': return '#6fbf73';
      case 'red': return '#d86666';
      case 'blue': return '#6c9bd2';
      default: return '#c8a45d';
    }
  });
}
