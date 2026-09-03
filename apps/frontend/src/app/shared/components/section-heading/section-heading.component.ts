import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Encabezado de sección con runa ornamental, título serifado y acción opcional. */
@Component({
  selector: 'bdp-section-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 min-w-0">
          @if (icon) {
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-bdo-gold/30 bg-bdo-gold/10 text-base" aria-hidden="true">{{ icon }}</span>
          }
          <div class="min-w-0">
            <h2 class="font-display text-base font-semibold tracking-wide text-bdo-text-primary sm:text-lg">{{ title }}</h2>
            @if (subtitle) {
              <p class="truncate text-xs text-bdo-text-muted sm:text-sm">{{ subtitle }}</p>
            }
          </div>
        </div>
        <ng-content select="[slot=action]"></ng-content>
      </div>
      <div class="mt-2.5 flex items-center gap-2" aria-hidden="true">
        <span class="text-[10px] text-bdo-gold/70">◆</span>
        <span class="h-px flex-1 bg-gradient-to-r from-bdo-gold/50 via-bdo-gold/15 to-transparent"></span>
      </div>
    </div>
  `,
})
export class SectionHeadingComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '';
}
