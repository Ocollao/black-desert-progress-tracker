import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, SectionHeadingComponent } from '../../shared/index';

@Component({
  selector: 'bdp-configuracion',
  standalone: true,
  imports: [CommonModule, CardComponent, SectionHeadingComponent],
  template: `
    <div class="animate-fade-in-up mx-auto max-w-2xl space-y-5">
      <div>
        <p class="text-[11px] uppercase tracking-[0.25em] text-bdo-text-muted">Preferencias del registro</p>
        <h1 class="page-title">Ajustes</h1>
      </div>
      <bdp-card variant="default">
        <bdp-section-heading title="Personaje activo" subtitle="Se muestra en la barra superior" icon="⚔"></bdp-section-heading>
        <label class="input-label" for="main">Personaje principal</label>
        <select id="main" class="input select">
          <option>Seraphelle · Caballero Oscuro · Nv.66</option>
          <option>Kaelis · Mística · Nv.63</option>
          <option>Dornvak · Berserker · Nv.61</option>
          <option>Mirabel · Shai · Nv.64</option>
        </select>
        <p class="input-help">Los datos son de muestra en v0.4.8 — la API real llegará en próximas versiones.</p>
      </bdp-card>
      <bdp-card variant="default">
        <bdp-section-heading title="Apariencia" subtitle="Cómodo durante muchas horas" icon="🌙"></bdp-section-heading>
        <div class="flex items-center justify-between gap-3 rounded-lg border border-bdo-gold/20 bg-bdo-bg/60 px-3 py-2.5">
          <span class="text-sm text-bdo-text-primary">Tema de ruinas ancestrales <span class="text-bdo-text-muted">(único en v0.4.8)</span></span>
          <span class="badge badge-gold">Activo</span>
        </div>
        <div class="mt-2 flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2.5 opacity-60">
          <span class="text-sm text-bdo-text-secondary">Reducir animaciones</span>
          <span class="text-xs text-bdo-text-muted">Próximamente</span>
        </div>
      </bdp-card>
    </div>
  `,
})
export class ConfiguracionComponent {}
