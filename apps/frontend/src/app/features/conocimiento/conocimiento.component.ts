import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { EnergySummary, KnowledgeEntry, KnowledgePage, KnowledgeProgress, KnowledgeService, KnowledgeStatus, RecentKnowledge, ThemeNode } from './knowledge.service';

@Component({
  selector: 'bdp-conocimiento',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="knowledge-page animate-fade-in-up">
      <p class="breadcrumb">Pagina principal <span>›</span> <strong>Conocimiento</strong></p>

      <section class="bdo-frame search-panel" aria-label="Buscar conocimiento">
        <div class="search-row">
          <input
            type="search"
            class="search-input"
            [value]="searchTerm()"
            (input)="onSearch($event)"
            placeholder="Buscar Conocimiento"
            aria-label="Buscar conocimiento"
          />
          <button type="button" class="btn-search" (click)="loadEntries()">Busca en la base de datos</button>
          <button type="button" class="btn-reset" (click)="resetFilters()">Reiniciar</button>
        </div>
        @if (energy(); as e) {
          <p class="energy-line">
            Puntos de energía máxima:
            <strong class="energy-max">{{ e.energyMax + e.energyBase }}</strong>
            (Puntos de energía del conocimiento: {{ e.energyMax }} + Puntos de energía base: {{ e.energyBase }})
            @if (e.estimated) { <em class="estimated" title="Energía manual provisional hasta completar el scrapeo">· provisional</em> }
          </p>
        }
        @if (page(); as result) {
          <p class="obtained-line">
            Conocimientos obtenidos: {{ result.obtained | number }} / {{ totalCatalog() | number }}
            ({{ percentObtained() }}%)
          </p>
          <div class="progress-track" role="progressbar" [attr.aria-valuenow]="percentObtained()">
            <div class="progress-fill" [style.width.%]="percentNumber()"></div>
          </div>
        }
      </section>

      <div class="knowledge-layout">
        <aside class="bdo-frame tree-panel" aria-label="Categorías de conocimiento">
          <div class="panel-heading"><h2>Archivo del mundo</h2><span>{{ tree().length }} ramas</span></div>
          <button type="button" class="root-row" [class.active]="!selectedTheme()" (click)="selectTheme(null)">
            <b>✦</b><span>Todo el archivo</span>
          </button>
          @for (root of tree(); track root.id) {
            <div class="root-block">
              <div class="root-row" [class.active]="selectedTheme() === root.id">
                <button type="button" class="expand" (click)="toggleExpand(root.id)" [attr.aria-expanded]="isExpanded(root.id)">{{ isExpanded(root.id) ? '−' : '+' }}</button>
                <button type="button" class="root-name" (click)="selectTheme(root.id)">
                  <strong>{{ root.name }}</strong>
                  <small>(Energía +{{ root.energy }})</small>
                </button>
                <input
                  type="checkbox"
                  class="root-check"
                  [checked]="selectedTheme() === root.id"
                  (change)="selectTheme(selectedTheme() === root.id ? null : root.id)"
                  [attr.aria-label]="'Filtrar ' + root.name"
                />
              </div>
              <p class="root-count">{{ root.obtained | number }} / {{ root.total | number }}</p>
              @if (isExpanded(root.id)) {
                <div class="children">
                  @for (child of root.children.slice(0, 30); track child.id) {
                    <button type="button" class="child-row" [class.active]="selectedTheme() === child.id" (click)="selectTheme(child.id)">
                      <span>{{ child.name }}</span><em>{{ child.obtained }}/{{ child.total }}</em>
                    </button>
                  }
                  @if (root.children.length > 30) {
                    <p class="more-hint">+{{ root.children.length - 30 }} subtemas más. Usa el buscador.</p>
                  }
                  @if (!root.children.length) {
                    <p class="more-hint">Sin subtemas: las entradas cuelgan directas de esta rama.</p>
                  }
                </div>
              }
            </div>
          }
          @if (!tree().length && !loading()) {
            <p class="more-hint">No se pudo cargar el árbol. Reintenta.</p>
          }
        </aside>

        <section class="results-panel" aria-live="polite">
          <div class="status-row" role="group" aria-label="Filtrar por estado">
            @for (filter of statusFilters; track filter.value) {
              <button type="button" [class.active]="status() === filter.value" (click)="selectStatus(filter.value)">{{ filter.label }}</button>
            }
            <span class="page-info">@if (page(); as result) { {{ result.page }} / {{ result.totalPages || 1 }} }</span>
          </div>
          @if (loading()) { <div class="state"><p>Consultando los archivos...</p></div> }
          @else if (error()) { <div class="state"><p>No se pudo consultar el archivo.</p><button type="button" class="btn-search" (click)="loadAll()">Reintentar</button></div> }
          @else if (page()?.items?.length) {
            <div class="knowledge-grid">
              @for (entry of page()!.items; track entry.id) {
                <button type="button" class="knowledge-card" [class.selected]="selectedEntry()?.id === entry.id" (click)="selectEntry(entry)">
                  @if (entry.imagePath) { <img [src]="entry.imagePath" [alt]="entry.name" loading="lazy" /> }
                  @else { <strong class="fallback-art">{{ entry.name.charAt(0) }}</strong> }
                  <span><b>{{ entry.name }}</b><small>{{ entry.itemUrn ? 'Objeto relacionado' : entry.characterUrn ? 'Personaje' : 'Registro del mundo' }}</small></span>
                  <em [class.obtained]="isObtained(entry)">{{ isObtained(entry) ? '✓' : '○' }}</em>
                </button>
              }
            </div>
            <div class="pagination">
              <button type="button" [disabled]="page()!.page <= 1" (click)="changePage(page()!.page - 1)" aria-label="Página anterior">‹ Anterior</button>
              <span>{{ page()!.items.length }} de {{ page()!.total | number }}</span>
              <button type="button" [disabled]="page()!.page >= page()!.totalPages" (click)="changePage(page()!.page + 1)" aria-label="Página siguiente">Siguiente ›</button>
            </div>
          } @else { <div class="state"><p>No hay entradas que coincidan.</p><small>Prueba con otro término o explora todos los temas.</small></div> }
        </section>

        <div class="side-column">
          <aside class="bdo-frame detail-panel" aria-label="Detalle de conocimiento">
            @if (selectedEntry(); as entry) {
              <div class="detail-art-circle">
                @if (entry.imagePath) { <img [src]="entry.imagePath" [alt]="entry.name" /> }
                @else { <span>{{ entry.name.charAt(0) }}</span> }
              </div>
              <h2 class="detail-title">{{ entry.name }}</h2>
              <span class="detail-status" [class.obtained]="isObtained(entry)" [class.blocked]="progress()?.blocked">
                {{ progress()?.blocked ? 'BLOQUEADO' : isObtained(entry) ? 'OBTENIDO' : 'PENDIENTE' }}
              </span>
              @if (entry.description) { <p class="detail-copy">{{ entry.description }}</p> }
              <div class="detail-acquisition">
                <b>Cómo conseguir este conocimiento</b>
                <p>{{ entry.acquisition || 'Habla con NPCs, explora la zona y completa conversaciones para desbloquear este registro.' }}</p>
              </div>
              @if (progress(); as detail) {
                @if (detail.requirements.length) {
                  <div class="detail-requirements">
                    <b>Requisitos previos</b>
                    @for (requirement of detail.requirements; track requirement.id) {
                      <button type="button" class="req-row" [class.complete]="requirement.obtained" (click)="openRequirement(requirement.id)">
                        {{ requirement.obtained ? '✓' : '○' }} {{ requirement.name }}
                      </button>
                    }
                  </div>
                } @else {
                  <p class="no-req">Sin requisitos previos conocidos.</p>
                }
              }
              <div class="detail-actions">
                <button type="button" class="btn-search" [disabled]="toggling()" (click)="toggleObtained(entry)">
                  {{ toggling() ? 'Guardando…' : isObtained(entry) ? '✓ Conocimiento obtenido' : 'Marcar como obtenido' }}
                </button>
                @if (isObtained(entry)) {
                  <button type="button" class="btn-reset" [disabled]="toggling()" (click)="clearObtained(entry)">Quitar</button>
                }
              </div>
              @if (actionError()) { <p class="action-error">No se pudo guardar. Reintenta.</p> }
              <div class="detail-stats">
                @if (entry.minFavor !== null) { <div><span>Favor mínimo</span><strong>{{ entry.minFavor }}</strong></div> }
                @if (entry.interest !== null) { <div><span>Interés</span><strong>{{ entry.interest }}</strong></div> }
                @if (entry.itemUrn) { <div><span>Vínculo</span><strong>Objeto</strong></div> }
              </div>
            } @else {
              <div class="state"><p>Selecciona un registro para ver su ficha.</p></div>
            }
          </aside>

          <aside class="bdo-frame recent-panel" aria-label="Últimos conocimientos">
            <div class="panel-heading"><h2>Últimos Conocimientos</h2><span>✦</span></div>
            @if (recent().length) {
              <ul>
                @for (item of visibleRecent(); track item.id) {
                  <li><button type="button" (click)="openRecent(item.id)">{{ item.name }}</button></li>
                }
              </ul>
              <div class="recent-nav">
                <button type="button" [disabled]="recentPage() <= 0" (click)="recentPrev()">Anterior</button>
                <button type="button" [disabled]="(recentPage() + 1) * 5 >= recent().length" (click)="recentNext()">Siguiente</button>
              </div>
            } @else {
              <p class="more-hint">Aún no marcas conocimientos. Marca el primero y aparecerá aquí.</p>
            }
            <div class="acquired-footer">Conocimiento adquirido: {{ page()?.obtained ?? 0 | number }}</div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .knowledge-page{--line:rgba(193,154,82,.22)}
    .breadcrumb{margin:0 0 .75rem;color:var(--color-bdo-text-secondary);font-size:.8rem}
    .breadcrumb span{margin:0 .4rem;color:var(--color-bdo-text-muted)}
    .breadcrumb strong{color:var(--color-bdo-text-primary)}
    .search-panel{padding:1rem;margin-bottom:1rem}
    .search-row{display:flex;gap:.6rem;flex-wrap:wrap}
    .search-input{flex:1;min-width:12rem;height:2.6rem;padding:0 .9rem;border:1px solid rgba(193,154,82,.35);background:#fff;color:#111;font-size:.85rem}
    .btn-search{background:linear-gradient(180deg,#3ddc97,#1ea672);color:#06281c;font-weight:700;font-size:.75rem;padding:.6rem 1rem;border:0;cursor:pointer}
    .btn-search:disabled{opacity:.6;cursor:wait}
    .btn-reset{background:linear-gradient(180deg,#3ddc97,#1ea672);color:#06281c;font-weight:700;font-size:.75rem;padding:.6rem 1rem;border:0;cursor:pointer}
    .energy-line,.obtained-line{margin:.7rem 0 0;color:var(--color-bdo-text-secondary);font-size:.82rem}
    .energy-max{display:inline-block;min-width:2.2rem;text-align:center;background:#2b7de9;color:#fff;border-radius:999px;padding:.05rem .5rem;font-size:.78rem}
    .estimated{color:var(--color-bdo-text-muted);font-size:.72rem}
    .progress-track{height:.5rem;margin-top:.5rem;background:rgba(255,255,255,.08);border:1px solid var(--line)}
    .progress-fill{height:100%;background:linear-gradient(90deg,var(--color-bdo-gold),var(--color-bdo-gold-bright))}
    .knowledge-layout{display:grid;grid-template-columns:minmax(15rem,18rem) minmax(0,1fr) minmax(18rem,22rem);gap:1rem;align-items:start}
    .tree-panel,.detail-panel,.recent-panel{padding:1rem}
    .panel-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;color:var(--color-bdo-text-muted)}
    .panel-heading h2{margin:0;font:700 1rem var(--font-display);color:var(--color-bdo-text-primary)}
    .root-row{display:flex;align-items:center;gap:.5rem;width:100%;padding:.5rem .4rem;color:var(--color-bdo-text-secondary);background:transparent;border:0;cursor:pointer;text-align:left}
    .root-row.active,.root-row:hover{background:rgba(193,154,82,.12);color:var(--color-bdo-text-primary)}
    .root-block{border-bottom:1px solid rgba(255,255,255,.06);padding-bottom:.3rem;margin-bottom:.3rem}
    .expand{width:1.4rem;font-weight:700;color:var(--color-bdo-gold-bright);background:transparent;border:0;cursor:pointer}
    .root-name{flex:1;display:flex;gap:.4rem;align-items:baseline;background:transparent;border:0;color:inherit;cursor:pointer;text-align:left}
    .root-name strong{font-size:.82rem}
    .root-name small{color:#e8a33d;font-size:.72rem}
    .root-check{width:1rem;height:1rem;accent-color:#3ddc97}
    .root-count{margin:.1rem 0 .3rem 1.9rem;color:var(--color-bdo-text-muted);font-size:.72rem}
    .children{margin-left:1.9rem;display:flex;flex-direction:column;gap:.15rem}
    .child-row{display:flex;justify-content:space-between;gap:.5rem;background:transparent;border:0;color:var(--color-bdo-text-secondary);font-size:.75rem;padding:.35rem .4rem;cursor:pointer;text-align:left}
    .child-row.active,.child-row:hover{background:rgba(193,154,82,.12);color:#fff}
    .child-row em{color:var(--color-bdo-text-muted);font-style:normal;font-size:.7rem}
    .more-hint{color:var(--color-bdo-text-muted);font-size:.72rem;margin:.4rem 0}
    .status-row{display:flex;gap:.4rem;align-items:center;margin-bottom:.7rem;flex-wrap:wrap}
    .status-row button{border:1px solid var(--line);background:transparent;color:var(--color-bdo-text-secondary);font-size:.72rem;padding:.4rem .7rem;cursor:pointer}
    .status-row button.active{background:rgba(193,154,82,.16);color:#fff;border-color:var(--color-bdo-gold)}
    .page-info{margin-left:auto;color:var(--color-bdo-text-muted);font-size:.72rem}
    .knowledge-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(13rem,1fr));gap:.6rem}
    .knowledge-card{display:flex;gap:.6rem;align-items:center;padding:.6rem;border:1px solid var(--line);background:rgba(20,23,26,.9);color:var(--color-bdo-text-primary);cursor:pointer;text-align:left}
    .knowledge-card.selected,.knowledge-card:hover{border-color:var(--color-bdo-gold);background:rgba(193,154,82,.1)}
    .knowledge-card img{width:2.6rem;height:2.6rem;object-fit:cover;border:1px solid rgba(193,154,82,.35)}
    .fallback-art{width:2.6rem;height:2.6rem;display:grid;place-items:center;background:#222;color:var(--color-bdo-gold-bright);font-weight:700}
    .knowledge-card span b{display:block;font-size:.76rem}
    .knowledge-card span small{color:var(--color-bdo-text-muted);font-size:.68rem}
    .knowledge-card em{margin-left:auto;font-style:normal;color:var(--color-bdo-text-muted)}
    .knowledge-card em.obtained{color:#3ddc97}
    .pagination{display:flex;align-items:center;justify-content:space-between;margin-top:.7rem;color:var(--color-bdo-text-muted);font-size:.75rem}
    .pagination button{background:transparent;border:1px solid var(--line);color:var(--color-bdo-text-primary);padding:.45rem .8rem;cursor:pointer}
    .pagination button:disabled{opacity:.4;cursor:default}
    .side-column{display:flex;flex-direction:column;gap:1rem}
    .detail-art-circle{width:9rem;height:9rem;margin:0 auto .6rem;border-radius:50%;overflow:hidden;border:2px solid rgba(193,154,82,.5);background:radial-gradient(circle at 50% 40%,rgba(193,154,82,.25),transparent 60%),#111416}
    .detail-art-circle img{width:100%;height:100%;object-fit:cover}
    .detail-art-circle span{display:grid;place-items:center;height:100%;font-size:2rem;color:var(--color-bdo-gold-bright)}
    .detail-title{margin:0;text-align:center;font:700 1.05rem var(--font-display)}
    .detail-status{display:block;width:max-content;margin:.5rem auto;padding:.2rem .7rem;font-size:.68rem;letter-spacing:.1em;border:1px solid var(--line);color:#e8c26a}
    .detail-status.obtained{color:#3ddc97;border-color:#3ddc97}
    .detail-status.blocked{color:#ff7a7a;border-color:#ff7a7a}
    .detail-copy{font-size:.82rem;color:#d5d2ca;line-height:1.6}
    .detail-acquisition{margin-top:.8rem;padding:.7rem;border:1px solid rgba(193,154,82,.35);border-left:3px solid var(--color-bdo-gold);background:rgba(193,154,82,.08)}
    .detail-acquisition b,.detail-requirements b{display:block;margin-bottom:.3rem;color:var(--color-bdo-gold-bright);font-size:.68rem;text-transform:uppercase;letter-spacing:.1em}
    .detail-acquisition p{margin:0;font-size:.8rem;line-height:1.6;white-space:pre-line}
    .detail-requirements{display:flex;flex-direction:column;gap:.3rem;margin-top:.8rem;padding:.7rem;border:1px solid rgba(193,154,82,.25)}
    .req-row{background:transparent;border:0;color:#d5d2ca;font-size:.76rem;text-align:left;cursor:pointer;padding:.25rem 0}
    .req-row.complete{color:#3ddc97}
    .no-req{color:var(--color-bdo-text-muted);font-size:.74rem}
    .detail-actions{display:flex;gap:.5rem;margin-top:.8rem}
    .action-error{color:#ff7a7a;font-size:.74rem}
    .detail-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-top:.8rem}
    .detail-stats div{border:1px solid var(--line);padding:.5rem;text-align:center}
    .detail-stats span{display:block;color:var(--color-bdo-text-muted);font-size:.64rem;text-transform:uppercase}
    .recent-panel ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.3rem}
    .recent-panel li button{width:100%;text-align:left;background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--color-bdo-text-primary);font-size:.76rem;padding:.45rem .6rem;cursor:pointer}
    .recent-nav{display:flex;gap:.5rem;margin-top:.6rem}
    .recent-nav button{flex:1;background:transparent;border:1px solid var(--line);color:#fff;padding:.45rem;cursor:pointer}
    .recent-nav button:disabled{opacity:.4}
    .acquired-footer{margin-top:.7rem;background:#000;border:1px solid var(--line);padding:.5rem;font-size:.72rem;color:var(--color-bdo-text-secondary)}
    .state{padding:2rem 1rem;text-align:center;color:var(--color-bdo-text-muted)}
    @media(max-width:1200px){.knowledge-layout{grid-template-columns:15rem minmax(0,1fr)}.side-column{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;align-items:start}}
    @media(max-width:760px){.knowledge-layout{display:flex;flex-direction:column}.side-column{display:flex}.search-row .search-input{flex-basis:100%}}
  `],
})
export class ConocimientoComponent implements OnInit, OnDestroy {
  private readonly service = inject(KnowledgeService);
  private readonly changes = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  readonly tree = signal<ThemeNode[]>([]);
  readonly expanded = signal<Record<string, boolean>>({});
  readonly energy = signal<EnergySummary | null>(null);
  readonly recent = signal<RecentKnowledge[]>([]);
  readonly recentPage = signal(0);
  readonly page = signal<KnowledgePage | null>(null);
  readonly selectedEntry = signal<KnowledgeEntry | null>(null);
  readonly progress = signal<KnowledgeProgress | null>(null);
  readonly selectedTheme = signal<string | null>(null);
  readonly status = signal<KnowledgeStatus>('all');
  readonly searchTerm = signal('');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly toggling = signal(false);
  readonly actionError = signal(false);
  readonly statusFilters: Array<{ value: KnowledgeStatus; label: string }> = [
    { value: 'all', label: 'Todos' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'obtained', label: 'Obtenidos' },
    { value: 'blocked', label: 'Bloqueados' },
  ];

  ngOnInit(): void {
    this.changes.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.loadEntries());
    this.loadAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  totalCatalog(): number {
    return (this.page()?.obtained ?? 0) + (this.page()?.pending ?? 0) || this.page()?.total || 0;
  }

  percentNumber(): number {
    const total = this.totalCatalog();
    if (!total) return 0;
    return Math.round(((this.page()?.obtained ?? 0) / total) * 10000) / 100;
  }

  percentObtained(): string {
    return this.percentNumber().toFixed(2);
  }

  isExpanded(id: string): boolean {
    return this.expanded()[id] ?? true;
  }

  toggleExpand(id: string): void {
    this.expanded.update((current) => ({ ...current, [id]: !(current[id] ?? true) }));
  }

  visibleRecent(): RecentKnowledge[] {
    const start = this.recentPage() * 5;
    return this.recent().slice(start, start + 5);
  }

  recentPrev(): void {
    this.recentPage.update((p) => Math.max(0, p - 1));
  }

  recentNext(): void {
    this.recentPage.update((p) => p + 1);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.changes.next(input.value);
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedTheme.set(null);
    this.status.set('all');
    this.loadEntries();
  }

  selectTheme(id: string | null): void {
    this.selectedTheme.set(id);
    this.loadEntries();
  }

  selectStatus(status: KnowledgeStatus): void {
    this.status.set(status);
    this.loadEntries();
  }

  selectEntry(entry: KnowledgeEntry): void {
    this.selectedEntry.set(entry);
    this.progress.set(null);
    this.service.getProgress(entry.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (progress) => this.progress.set(progress),
      error: () => this.progress.set(null),
    });
  }

  openRequirement(id: string): void {
    this.service.getById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (entry) => this.selectEntry(entry),
      error: () => undefined,
    });
  }

  openRecent(id: string): void {
    this.openRequirement(id);
  }

  isObtained(entry: KnowledgeEntry): boolean {
    return entry.progress?.obtained ?? false;
  }

  toggleObtained(entry: KnowledgeEntry): void {
    if (this.toggling()) return;
    const obtained = !this.isObtained(entry);
    this.toggling.set(true);
    this.actionError.set(false);
    this.service.updateProgress(entry.id, obtained).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        entry.progress = { obtained };
        this.progress.update((current) => (current ? { ...current, obtained } : current));
        this.selectedEntry.set({ ...entry });
        this.toggling.set(false);
        this.loadEntries(this.page()?.page ?? 1, true);
        this.loadRecent();
        this.loadEnergy();
      },
      error: () => {
        this.toggling.set(false);
        this.actionError.set(true);
      },
    });
  }

  clearObtained(entry: KnowledgeEntry): void {
    if (this.toggling()) return;
    this.toggling.set(true);
    this.actionError.set(false);
    this.service.removeProgress(entry.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        entry.progress = { obtained: false };
        this.progress.update((current) => (current ? { ...current, obtained: false } : current));
        this.selectedEntry.set({ ...entry });
        this.toggling.set(false);
        this.loadEntries(this.page()?.page ?? 1, true);
        this.loadRecent();
        this.loadEnergy();
      },
      error: () => {
        this.toggling.set(false);
        this.actionError.set(true);
      },
    });
  }

  changePage(page: number): void {
    this.loadEntries(page);
  }

  loadAll(): void {
    this.service.getThemesTree().pipe(takeUntil(this.destroy$)).subscribe({
      next: (tree) => this.tree.set(tree),
      error: () => this.tree.set([]),
    });
    this.loadEnergy();
    this.loadRecent();
    this.loadEntries();
  }

  loadEnergy(): void {
    this.service.getEnergy().pipe(takeUntil(this.destroy$)).subscribe({
      next: (energy) => this.energy.set(energy),
      error: () => this.energy.set(null),
    });
  }

  loadRecent(): void {
    this.service.getRecent(15).pipe(takeUntil(this.destroy$)).subscribe({
      next: (recent) => {
        this.recent.set(recent);
        this.recentPage.set(0);
      },
      error: () => this.recent.set([]),
    });
  }

  loadEntries(page = 1, silent = false): void {
    if (!silent) this.loading.set(true);
    this.error.set(false);
    this.service.search(this.searchTerm(), this.selectedTheme(), this.status(), page).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.page.set(result);
        const current = this.selectedEntry();
        const stillVisible = current ? result.items.find((item) => item.id === current.id) : undefined;
        const next = stillVisible ?? result.items[0] ?? null;
        this.selectedEntry.set(next);
        if (next) this.selectEntry(next);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      },
    });
  }
}
