import { Component, input, signal, effect, computed, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'bdp-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-block relative"
      (mouseenter)="show()"
      (focusin)="show()"
      (mouseleave)="hide()"
      (focusout)="hide()"
    >
      <ng-content select="[bdpTooltipTrigger]"></ng-content>

      @if (visible()) {
        <div
          class="tooltip absolute z-[700] px-3 py-2 text-xs font-medium text-bdo-text-dark bg-bdo-gold rounded-lg shadow-bdo-lg whitespace-nowrap animate-fade-in-up"
          [class]="positionClasses()"
          role="tooltip"
          [attr.aria-hidden]="!visible()"
        >
          {{ content() }}
          <div class="tooltip-arrow" [class]="arrowClasses()"></div>
        </div>
      }
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class TooltipComponent {
  content = input.required<string>();
  position = input<TooltipPosition>('top');
  delay = input<number>(200);
  offset = input<number>(8);

  private _visible = signal(false);
  visible = this._visible.asReadonly();

  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  positionClasses = computed(() => {
    const base = 'transition-all duration-200';
    switch (this.position()) {
      case 'top': return `${base} bottom-full left-1/2 -translate-x-1/2 mb-[8px]`;
      case 'bottom': return `${base} top-full left-1/2 -translate-x-1/2 mt-[8px]`;
      case 'left': return `${base} right-full top-1/2 -translate-y-1/2 mr-[8px]`;
      case 'right': return `${base} left-full top-1/2 -translate-y-1/2 ml-[8px]`;
    }
  });

  arrowClasses = computed(() => {
    switch (this.position()) {
      case 'top': return 'absolute bottom-[-5px] left-1/2 -translate-x-1/2 border-5 border-transparent border-t-bdo-gold';
      case 'bottom': return 'absolute top-[-5px] left-1/2 -translate-x-1/2 border-5 border-transparent border-b-bdo-gold';
      case 'left': return 'absolute right-[-5px] top-1/2 -translate-y-1/2 border-5 border-transparent border-l-bdo-gold';
      case 'right': return 'absolute left-[-5px] top-1/2 -translate-y-1/2 border-5 border-transparent border-r-bdo-gold';
    }
  });

  show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this._visible.set(true);
  }

  hide(): void {
    this.hideTimeout = setTimeout(() => {
      this._visible.set(false);
      this.hideTimeout = null;
    }, this.delay());
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  @HostListener('focusin')
  onFocusIn(): void {
    this.show();
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.hide();
  }
}
