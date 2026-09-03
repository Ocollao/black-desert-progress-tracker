import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  CardComponent, BadgeComponent, ProgressComponent,
  SectionHeadingComponent, ProgressRingComponent, ActivityTimelineComponent,
} from '../../shared/index';
import { mockActivity, mockCategoryProgress, mockCharacter, mockGoals } from '../../core/mock/bdo-mock-data';

@Component({
  selector: 'bdp-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ProgressComponent, SectionHeadingComponent, ProgressRingComponent, ActivityTimelineComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  user = this.authService.user;
  isLoading = signal(true);

  char = mockCharacter;
  categories = mockCategoryProgress;
  activity = mockActivity;
  nextGoal = mockGoals[0];
  goals = mockGoals.slice(1, 4);

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
