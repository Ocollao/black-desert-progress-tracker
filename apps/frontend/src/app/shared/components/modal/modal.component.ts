import { Component, input, output, signal, effect, computed, HostListener, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'bdp-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (open()) {
      <div
        class="modal-backdrop fixed inset-0 bg-black/70 backdrop-blur-sm z-[400] animate-fade-in"
        (click)="onBackdropClick()"
        [attr.aria-hidden]="true"
      ></div>

      <div
        class="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[500] w-full max-w-lg animate-scale-in"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="title() ? 'modal-title' : null"
        [attr.aria-describedby]="description() ? 'modal-description' : null"
      >
        <div class="relative">
          <!-- Close button -->
          <button
            type="button"
            class="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-bdo-bg-elevated/50 text-bdo-text-muted hover:bg-bdo-bg-elevated hover:text-bdo-gold transition-colors focus-visible:ring-2 focus-visible:ring-bdo-gold"
            (click)="close()"
            aria-label="Cerrar modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div class="p-6">
            @if (icon()) {
              <div class="flex justify-center mb-4">
                <div class="avatar avatar-lg" [class]="iconBgClass()">
                  <ng-content select="[slot=icon]"></ng-content>
                </div>
              </div>
            }

            @if (title()) {
              <h2 id="modal-title" class="text-2xl font-bold text-center text-bdo-text-primary mb-2">{{ title() }}</h2>
            }

            @if (description()) {
              <p id="modal-description" class="text-center text-bdo-text-secondary mb-6">{{ description() }}</p>
            }

            <div class="space-y-4">
              <ng-content></ng-content>
            </div>

            @if (showDefaultActions()) {
              <div class="flex gap-3 mt-6 pt-4 border-t border-bdo-border-gold/20">
                <bdp-button
                  variant="secondary"
                  [fullWidth]="true"
                  (clicked)="close()"
                >
                  {{ cancelText() }}
                </bdp-button>
                <bdp-button
                  [variant]="confirmVariant()"
                  [loading]="confirmLoading()"
                  [fullWidth]="true"
                  (clicked)="confirm()"
                >
                  {{ confirmText() }}
                </bdp-button>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class ModalComponent {
  open = input<boolean>(false);
  title = input<string>('');
  description = input<string>('');
  icon = input<boolean>(false);
  iconType = input<'info' | 'success' | 'warning' | 'danger' | 'question'>('info');
  confirmText = input<string>('Confirmar');
  cancelText = input<string>('Cancelar');
  confirmVariant = input<'primary' | 'danger'>('primary');
  confirmLoading = input<boolean>(false);
  showDefaultActions = input<boolean>(true);
  closeOnBackdrop = input<boolean>(true);
  closeOnEscape = input<boolean>(true);

  closed = output<void>();
  confirmed = output<void>();

  iconBgClass = computed(() => {
    switch (this.iconType()) {
      case 'success': return 'bg-gradient-to-br from-bdo-green to-bdo-green-dim';
      case 'warning': return 'bg-gradient-to-br from-bdo-gold to-bdo-bronze';
      case 'danger': return 'bg-gradient-to-br from-bdo-red to-bdo-red-dim';
      case 'info': return 'bg-gradient-to-br from-bdo-blue to-bdo-blue-dim';
      default: return 'bg-gradient-to-br from-bdo-gold to-bdo-bronze';
    }
  });

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if ((event as KeyboardEvent).key === 'Escape') {
      if (this.open() && this.closeOnEscape()) {
        this.close();
      }
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
  }
}
