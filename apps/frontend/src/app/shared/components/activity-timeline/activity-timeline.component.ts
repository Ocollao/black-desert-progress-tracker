import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Activity } from '../../../core/mock/bdo-mock-data';

const TONE_BG: Record<Activity['tone'], string> = {
  gold: 'bg-bdo-gold/15 text-bdo-gold',
  green: 'bg-bdo-green/15 text-bdo-green',
  red: 'bg-bdo-red/15 text-bdo-red',
  blue: 'bg-bdo-blue/15 text-bdo-blue',
};

/** Feed cronológico elegante para actividad reciente. */
@Component({
  selector: 'bdp-activity-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ol class="relative space-y-0 border-l border-bdo-gold/25 pl-0">
      @for (a of items; track a.text) {
        <li class="relative flex gap-3 pb-4 pl-6 last:pb-0">
          <span class="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-bdo-gold/30 bg-bdo-bg-elevated text-xs" [class]="toneClass(a.tone)" aria-hidden="true">{{ a.icon }}</span>
          <div class="min-w-0 flex-1">
            <p class="text-sm leading-snug text-bdo-text-primary">{{ a.text }}</p>
            <p class="text-[11px] text-bdo-text-muted">{{ a.time }}</p>
          </div>
        </li>
      }
    </ol>
  `,
})
export class ActivityTimelineComponent {
  @Input() items: Activity[] = [];
  toneClass(t: Activity['tone']): string {
    return TONE_BG[t];
  }
}
