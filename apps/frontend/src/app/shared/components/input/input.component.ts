import { Component, input, output, model, forwardRef, signal, computed, ElementRef, viewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'bdp-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      @if (label()) {
        <label [for]="id()" class="input-label">{{ label() }}</label>
      }

      <div class="relative">
        @if (prefix()) {
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-bdo-text-muted">
            <ng-content select="[slot=prefix]"></ng-content>
          </div>
        }

        <input
          #inputEl
          [type]="type()"
          [id]="id()"
          [name]="name()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [readonly]="readonly()"
          [value]="value()"
          [class]="inputClasses()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          (keydown)="onKeydown($event)"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-invalid]="error() ? 'true' : 'false'"
          [attr.aria-required]="required()"
        />

        @if (suffix()) {
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-bdo-text-muted">
            <ng-content select="[slot=suffix]"></ng-content>
          </div>
        }

        @if (showClear() && value() && !disabled() && !readonly()) {
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-bdo-text-muted hover:text-bdo-gold transition-colors"
            (click)="clearValue()"
            aria-label="Limpiar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        }

        @if (loading()) {
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg class="animate-spin h-5 w-5 text-bdo-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        }
      </div>

      @if (error()) {
        <p class="input-error-text" [id]="errorId()" role="alert">
          {{ error() }}
        </p>
      } @else if (hint() && !error()) {
        <p class="input-help" [id]="hintId()">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  id = input.required<string>();
  type = input<'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search'>('text');
  name = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  hint = input<string>('');
  error = input<string>('');
  disabled = input<boolean>(false, { alias: 'disabled' });
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  autocomplete = input<string>('off');
  prefix = input<boolean>(false);
  suffix = input<boolean>(false);
  clearable = input<boolean>(true);
  loading = input<boolean>(false);
  describedBy = input<string>('');

  value = model<string>('');

  private focused = signal(false);
  private touched = false;

  focused$ = this.focused.asReadonly();
  hasValue = computed(() => !!this.value() && this.value().length > 0);
  showClear = computed(() => this.clearable() && this.hasValue() && !this.disabled() && !this.readonly() && this.focused$());

  errorId = computed(() => `${this.id()}-error`);
  hintId = computed(() => `${this.id()}-hint`);

  inputClasses = computed(() => {
    const classes = [
      'input',
      'w-full',
      'transition-all',
      'duration-200'
    ];

    if (this.prefix()) classes.push('pl-10');
    if (this.suffix() || this.showClear() || this.loading()) classes.push('pr-10');
    if (this.error()) classes.push('input-error');

    return classes.join(' ');
  });

  onChange = (value: string) => {};
  onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  onBlur(): void {
    this.focused.set(false);
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  onFocus(): void {
    this.focused.set(true);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      (event.target as HTMLInputElement).blur();
    }
  }

  clearValue(): void {
    this.value.set('');
    this.onChange('');
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.warn('setDisabledState called but disabled is controlled via input binding');
  }
}