import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AvatarComponent, BadgeComponent, ButtonComponent } from '../../shared/index';
import { mockCharacter } from '../../core/mock/bdo-mock-data';
import { CharacterService } from '../../features/characters/character.service';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  section: string;
}

const NAV: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: '◈', section: 'Principal' },
  { path: '/personaje', label: 'Personaje', icon: '⚔', section: 'Principal' },
  { path: '/equipo', label: 'Equipo', icon: '🛡', section: 'Principal' },
  { path: '/progresion', label: 'Progresión', icon: '⬢', section: 'Progreso' },
  { path: '/objetivos', label: 'Objetivos', icon: '🎯', section: 'Progreso' },
  { path: '/desafios', label: 'Desafíos', icon: '📜', section: 'Progreso' },
  { path: '/lifeskill', label: 'LifeSkill', icon: '🌿', section: 'Mundo' },
  { path: '/aventuras', label: 'Aventuras', icon: '🗺', section: 'Mundo' },
  { path: '/conocimiento', label: 'Conocimiento', icon: '📖', section: 'Mundo' },
  { path: '/colecciones', label: 'Colecciones', icon: '💎', section: 'Mundo' },
  { path: '/characters', label: 'Mis PJs', icon: '👥', section: 'Cuenta' },
  { path: '/configuracion', label: 'Ajustes', icon: '⚙', section: 'Cuenta' },
  { path: '/vinculado', label: 'Vinculado', icon: '↗', section: 'Cuenta' },
];

@Component({
  selector: 'bdp-app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarComponent, BadgeComponent, ButtonComponent],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly characterService = inject(CharacterService);

  user = this.authService.user;
  char = mockCharacter;
  sidebarOpen = signal(false);
  hasCharacter = signal(false);
  nav = NAV;
  sections = ['Principal', 'Progreso', 'Mundo', 'Cuenta'];

  ngOnInit(): void {
    this.characterService.getAll().subscribe({
      next: (characters) => this.hasCharacter.set(characters.length > 0),
      error: () => this.hasCharacter.set(false),
    });
  }

  itemsFor(section: string): NavItem[] {
    return this.nav.filter((n) => n.section === section);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }
  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
