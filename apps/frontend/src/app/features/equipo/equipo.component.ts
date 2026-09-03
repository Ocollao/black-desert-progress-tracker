import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, SectionHeadingComponent, EquipmentSlotComponent, ProgressComponent } from '../../shared/index';
import { mockEquipment } from '../../core/mock/bdo-mock-data';

type Filter = 'todo' | 'armas' | 'armadura' | 'accesorios';

@Component({
  selector: 'bdp-equipo',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, SectionHeadingComponent, EquipmentSlotComponent, ProgressComponent],
  template: `
    <div class="animate-fade-in-up space-y-5">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Inventario del aventurero · ¿Qué tengo?</p>
          <h1 class="page-title">Equipo</h1>
          <p class="text-sm text-bdo-text-secondary">12 piezas · GS <strong class="font-mono text-bdo-gold">7.248</strong> · media de mejora <strong class="font-mono text-bdo-gold">{{ avg }}%</strong></p>
        </div>
        <div class="tabs" role="tablist" aria-label="Filtrar equipo">
          @for (f of filters; track f.k) {
            <button class="tab" role="tab" [class.tab-active]="filter() === f.k" (click)="filter.set(f.k)">{{ f.label }}</button>
          }
        </div>
      </div>

      <!-- Resumen por estado -->
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        @for (s of summary; track s.label) {
          <div class="rounded-xl border border-bdo-gold/20 bg-bdo-bg-elevated/60 px-3 py-2.5 text-center">
            <p class="font-display text-xl font-bold" [class]="s.cls">{{ s.n }}</p>
            <p class="text-[10px] uppercase tracking-widest text-bdo-text-muted">{{ s.label }}</p>
          </div>
        }
      </div>

      <bdp-card variant="default">
        <bdp-section-heading [title]="groupTitle()" subtitle="Borde = rareza · % = progreso a la siguiente mejora" icon="🛡"></bdp-section-heading>
        <div class="grid grid-cols-1 gap-2.5 md:grid-cols-2">
          @for (e of visible(); track e.item) {
            <bdp-equipment-slot [data]="e"></bdp-equipment-slot>
          }
        </div>
      </bdp-card>

      <bdp-card variant="gold">
        <bdp-section-heading title="Prioridad de refuerzo" subtitle="Qué mejorar después" icon="🔨"></bdp-section-heading>
        <bdp-progress [value]="82" variant="gold" size="md" [showValue]="true" label="Kutum TET → PEN" subLabel="Faltan 340 Piedras de Cron · FS actual 182"></bdp-progress>
        <div class="mt-3 flex flex-wrap gap-2">
          <a routerLink="/objetivos" class="btn btn-primary btn-sm">Ver objetivo</a>
          <a routerLink="/desafios" class="btn btn-secondary btn-sm">Retos de refuerzo</a>
        </div>
      </bdp-card>
    </div>
  `,
})
export class EquipoComponent {
  filter = signal<Filter>('todo');
  filters: { k: Filter; label: string }[] = [
    { k: 'todo', label: 'Todo' },
    { k: 'armas', label: 'Armas' },
    { k: 'armadura', label: 'Armadura' },
    { k: 'accesorios', label: 'Accesorios' },
  ];

  summary = [
    { label: 'Obtenido', n: 5, cls: 'text-bdo-green' },
    { label: 'En progreso', n: 5, cls: 'text-bdo-gold' },
    { label: 'Pendiente', n: 2, cls: 'text-bdo-blue' },
    { label: 'Bloqueado', n: 0, cls: 'text-bdo-red' },
  ];

  avg = Math.round(mockEquipment.reduce((a, e) => a + e.progress, 0) / mockEquipment.length);

  groupTitle(): string {
    switch (this.filter()) {
      case 'armas': return 'Armas';
      case 'armadura': return 'Armadura';
      case 'accesorios': return 'Accesorios';
      default: return 'Todo el equipo';
    }
  }

  visible = computed(() => {
    const f = this.filter();
    if (f === 'armas') return mockEquipment.filter((e) => e.slot.includes('Arma'));
    if (f === 'armadura') return mockEquipment.filter((e) => ['Casco', 'Armadura', 'Guantes', 'Zapatos'].includes(e.slot));
    if (f === 'accesorios') return mockEquipment.filter((e) => ['Anillo', 'Collar', 'Cinturón', 'Pendiente'].some((k) => e.slot.includes(k)));
    return mockEquipment;
  });
}
