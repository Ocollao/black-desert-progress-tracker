import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'bdp-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonComponent, CardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal<string | null>(null);
  isLoading = signal(false);

  isFormValid = computed(() => this.email().length > 0 && this.password().length >= 8);

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.error.set('Por favor completa todos los campos correctamente');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      await this.authService
        .login({ email: this.email(), password: this.password() })
        .toPromise();
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const error = err as { error?: { message?: string } };
      this.error.set(
        error.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.',
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}