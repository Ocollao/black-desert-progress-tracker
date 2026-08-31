import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ButtonComponent, CardComponent, BadgeComponent, ProgressComponent, AvatarComponent } from '../../shared/index';

@Component({
  selector: 'bdp-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CardComponent, BadgeComponent, ProgressComponent, AvatarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  user = this.authService.user;
  isLoading = signal(true);

  ngOnInit(): void {
    if (this.user()) {
      this.isLoading.set(false);
    } else {
      this.authService.getProfile().subscribe({
        next: () => this.isLoading.set(false),
        error: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}