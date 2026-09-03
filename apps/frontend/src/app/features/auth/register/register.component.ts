import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'bdp-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonComponent, CardComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = signal('');
  username = signal('');
  password = signal('');
  confirmPassword = signal('');
  error = signal<string | null>(null);
  isLoading = signal(false);

  isFormValid = computed(() =>
    this.email().length > 0 &&
    this.username().length >= 3 &&
    this.password().length >= 8 &&
    this.password() === this.confirmPassword(),
  );

  passwordsMatch = computed(() => this.password() === this.confirmPassword() || this.confirmPassword() === '');

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.error.set('Por favor completa todos los campos correctamente');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      await this.authService
        .register({
          email: this.email(),
          username: this.username(),
          password: this.password(),
        })
        .toPromise();
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const error = err as { error?: { message?: string } };
      this.error.set(
        error.error?.message || 'Error al registrarse. Inténtalo de nuevo.',
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}