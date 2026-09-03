import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'bdp-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="avatar inline-flex items-center justify-center rounded-full font-bold overflow-hidden select-none"
      [class]="avatarClasses()"
      [style.background-image]="backgroundImage()"
      [attr.aria-label]="ariaLabel"
      role="img"
    >
      @if (!src && !icon) {
        <span>{{ initials() }}</span>
      } @else if (icon) {
        <ng-content select="[slot=icon]"></ng-content>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class AvatarComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() name = '';
  @Input() size: AvatarSize = 'md';
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() icon = false;
  @Input() status: 'online' | 'offline' | 'busy' | 'away' = 'offline';
  @Input() statusPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';
  @Input() border = false;
  @Input() ariaLabel = '';

  avatarClasses = computed(() => {
    const classes = ['avatar', 'inline-flex', 'items-center', 'justify-center', 'rounded-full', 'font-bold', 'overflow-hidden', 'select-none'];

    // Size
    switch (this.size) {
      case 'xs': classes.push('h-6', 'w-6', 'text-xs'); break;
      case 'sm': classes.push('h-8', 'w-8', 'text-sm'); break;
      case 'md': classes.push('h-10', 'w-10', 'text-base'); break;
      case 'lg': classes.push('h-16', 'w-16', 'text-2xl'); break;
      case 'xl': classes.push('h-24', 'w-24', 'text-4xl'); break;
    }

    if (this.border) classes.push('ring-2', 'ring-bdo-black', 'ring-offset-2', 'ring-offset-bdo-black');
    if (this.shape === 'square') classes.push('rounded-lg');

    return classes.join(' ');
  });

  initials = computed(() => {
    const n = this.name.trim();
    if (!n) return '?';
    const parts = n.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  backgroundImage = computed(() => {
    if (this.src) {
      return `url(${this.src})`;
    }
    return 'none';
  });
}
