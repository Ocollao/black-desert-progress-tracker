import { Component, Input, Output, EventEmitter, HostBinding, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

@Component({
  selector: 'bdp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="onClick($event)"
      class="inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bdo-bg disabled:opacity-50 disabled:cursor-not-allowed"
      [class]="buttonClasses()"
      [attr.aria-busy]="loading"
      [attr.aria-disabled]="disabled || loading"
    >
      @if (loading) {
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      } @else if (icon && !label) {
        <ng-content select="[slot=icon]"></ng-content>
      } @else if (icon) {
        <ng-content select="[slot=icon]"></ng-content>
      }

      @if (label) {
        <span>{{ label }}</span>
      } @else {
        <ng-content></ng-content>
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() label = '';
  @Input() icon = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  buttonClasses = computed(() => {
    const classes = ['inline-flex', 'items-center', 'justify-center', 'gap-2', 'font-medium', 'transition-all', 'duration-200', 'rounded-lg', 'focus:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-offset-2', 'focus-visible:ring-offset-bdo-bg', 'disabled:opacity-50', 'disabled:cursor-not-allowed'];

    // Variant
    switch (this.variant) {
      case 'primary':
        classes.push('bg-gradient-to-r', 'from-bdo-gold', 'to-bdo-bronze', 'text-bdo-text-dark', 'border-0', 'hover:from-bdo-gold-bright', 'hover:to-bdo-gold', 'focus-visible:ring-bdo-gold', 'shadow-bdo-gold');
        break;
      case 'secondary':
        classes.push('bg-bdo-bg-elevated', 'text-bdo-text-primary', 'border', 'border-bdo-border-gold/50', 'hover:border-bdo-gold', 'hover:bg-bdo-bg-card', 'focus-visible:ring-bdo-gold');
        break;
      case 'danger':
        classes.push('bg-gradient-to-r', 'from-bdo-red', 'to-bdo-red-dim', 'text-white', 'border-0', 'hover:from-bdo-red-dim', 'hover:to-bdo-red', 'focus-visible:ring-bdo-red');
        break;
      case 'ghost':
        classes.push('bg-transparent', 'text-bdo-text-secondary', 'hover:text-bdo-gold', 'hover:bg-bdo-bg-elevated', 'border-0', 'focus-visible:ring-bdo-gold');
        break;
    }

    // Size
    switch (this.size) {
      case 'sm':
        classes.push('px-3', 'py-1.5', 'text-xs');
        break;
      case 'md':
        classes.push('px-5', 'py-2.5', 'text-sm');
        break;
      case 'lg':
        classes.push('px-8', 'py-3.5', 'text-base');
        break;
      case 'icon':
        classes.push('p-2.5');
        break;
    }

    // Full width
    if (this.fullWidth) {
      classes.push('w-full');
    }

    return classes.join(' ');
  });

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
