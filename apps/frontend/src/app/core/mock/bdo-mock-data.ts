// ─── Black Desert Progression · Datos mock ─────────────────────────────
// Separados de los componentes. Fácilmente reemplazables por API/backend.
// v0.4.7

export type ItemState = 'OBTENIDO' | 'PENDIENTE' | 'EN_PROGRESO' | 'BLOQUEADO';
export type Rarity = 'comun' | 'magica' | 'rara' | 'epica' | 'legendaria' | 'mitica';

export interface MockCharacter {
  name: string;
  family: string;
  class: string;
  level: number;
  region: string;
  cp: number;
  ap: number;
  aap: number;
  dp: number;
  evasion: number;
  progress: number;
}

export const mockCharacter: MockCharacter = {
  name: 'Seraphelle',
  family: 'Familia Corvane',
  class: 'Caballero Oscuro',
  level: 66,
  region: 'Kamasylvia',
  cp: 712,
  ap: 301,
  aap: 297,
  dp: 408,
  evasion: 965,
  progress: 82,
};

export interface CategoryProgress {
  key: string;
  label: string;
  icon: string;
  value: number;
  detail: string;
  tone: 'gold' | 'green' | 'red' | 'blue' | 'amber';
}

export const mockCategoryProgress: CategoryProgress[] = [
  { key: 'combate', label: 'Combate', icon: '⚔', value: 91, detail: '301 AP · 408 DP', tone: 'red' },
  { key: 'lifeskill', label: 'LifeSkill', icon: '🌿', value: 67, detail: '6 / 11 en Maestro+', tone: 'green' },
  { key: 'aventuras', label: 'Aventuras', icon: '🗺', value: 74, detail: 'Diario 8/11 · Regiones 17/24', tone: 'blue' },
  { key: 'conocimiento', label: 'Conocimiento', icon: '📜', value: 83, detail: '6.412 / 7.700 energía máx.', tone: 'gold' },
  { key: 'colecciones', label: 'Colecciones', icon: '💎', value: 54, detail: '128 / 236 piezas', tone: 'amber' },
  { key: 'logros', label: 'Logros', icon: '🏆', value: 71, detail: '842 / 1.180', tone: 'gold' },
];

export interface EquipmentSlotData {
  slot: string;
  icon: string;
  item: string;
  grade: string;
  enhancement: string;
  state: ItemState;
  rarity: Rarity;
  progress: number;
}

export const mockEquipment: EquipmentSlotData[] = [
  { slot: 'Arma principal', icon: '🗡', item: 'Kzarka — Espada larga', grade: 'Jefe', enhancement: 'PEN (V)', state: 'OBTENIDO', rarity: 'legendaria', progress: 100 },
  { slot: 'Arma secundaria', icon: '🛡', item: 'Kutum — Orbe', grade: 'Jefe', enhancement: 'TET (IV)', state: 'EN_PROGRESO', rarity: 'epica', progress: 82 },
  { slot: 'Arma despertar', icon: '🌙', item: 'Dandelion — Vediant', grade: 'Jefe', enhancement: 'PEN (V)', state: 'OBTENIDO', rarity: 'legendaria', progress: 100 },
  { slot: 'Casco', icon: '⛑', item: 'Griffon — Yelmo', grade: 'Jefe', enhancement: 'TET (IV)', state: 'EN_PROGRESO', rarity: 'epica', progress: 74 },
  { slot: 'Armadura', icon: '🥋', item: 'Bheg silencioso', grade: 'Caída eterna', enhancement: 'PEN (V)', state: 'OBTENIDO', rarity: 'mitica', progress: 100 },
  { slot: 'Guantes', icon: '🧤', item: 'Bheg — Guantes', grade: 'Jefe', enhancement: 'TET (IV)', state: 'EN_PROGRESO', rarity: 'epica', progress: 68 },
  { slot: 'Zapatos', icon: '🥾', item: 'Urugon — Calzado', grade: 'Jefe', enhancement: 'PEN (V)', state: 'OBTENIDO', rarity: 'legendaria', progress: 100 },
  { slot: 'Anillo I', icon: '💍', item: 'Creciente — Anillo', grade: 'Amarillo', enhancement: 'TET (IV)', state: 'EN_PROGRESO', rarity: 'epica', progress: 61 },
  { slot: 'Anillo II', icon: '💍', item: 'Tungrad — Anillo', grade: 'Amarillo', enhancement: 'TRI (III)', state: 'PENDIENTE', rarity: 'rara', progress: 40 },
  { slot: 'Collar', icon: '📿', item: 'Ogros — Collar', grade: 'Amarillo', enhancement: 'TET (IV)', state: 'EN_PROGRESO', rarity: 'epica', progress: 77 },
  { slot: 'Cinturón', icon: '🎗', item: 'Basilisco — Cinturón', grade: 'Amarillo', enhancement: 'TRI (III)', state: 'PENDIENTE', rarity: 'rara', progress: 52 },
  { slot: 'Pendiente I/II', icon: '🔶', item: 'Narc — Pendiente ×2', grade: 'Amarillo', enhancement: 'TET (IV)', state: 'OBTENIDO', rarity: 'legendaria', progress: 100 },
];

export interface Goal {
  title: string;
  category: string;
  progress: number;
  target: string;
  reward: string;
  difficulty: 'Fácil' | 'Media' | 'Alta' | 'Extrema';
  priority: 'Alta' | 'Media' | 'Baja';
  state: ItemState;
}

export const mockGoals: Goal[] = [
  { title: 'Arma secundaria Kutum → PEN', category: 'Combate · Equipo', progress: 82, target: 'Piedra de Cron ×340', reward: '+6 AP monstruos', difficulty: 'Alta', priority: 'Alta', state: 'EN_PROGRESO' },
  { title: 'Cocina → Gurú', category: 'LifeSkill', progress: 60, target: 'Platos imperiales ×1.200', reward: 'Caja imperial + plata/día', difficulty: 'Media', priority: 'Media', state: 'EN_PROGRESO' },
  { title: 'Kamasylvia al 100%', category: 'Aventuras', progress: 84, target: '12 misiones · 34 conocimientos', reward: 'Título «Luz de Kamasylve»', difficulty: 'Media', priority: 'Media', state: 'EN_PROGRESO' },
  { title: 'Pendiente Tungrad TET', category: 'Combate · Accesorio', progress: 45, target: 'Fragmento ×58', reward: '+3 AP', difficulty: 'Extrema', priority: 'Baja', state: 'PENDIENTE' },
  { title: 'Guía de Bartali cap. 12', category: 'Aventuras · Diario', progress: 100, target: 'Completado', reward: '+2 DP · +100 HP', difficulty: 'Media', priority: 'Alta', state: 'OBTENIDO' },
];

export interface Challenge {
  title: string;
  desc: string;
  progress: number;
  total: number;
  reward: string;
  difficulty: string;
  timeLeft: string;
  state: ItemState;
  kind: 'diaria' | 'semanal' | 'mensual';
}

export const mockChallenges: Challenge[] = [
  { title: '3 actividades LifeSkill', desc: 'Cocina, pesca o recolección — 30 min c/u', progress: 3, total: 3, reward: 'Consejo de Valks (+30)', difficulty: 'Fácil', timeLeft: '4 h 12 min', state: 'OBTENIDO', kind: 'diaria' },
  { title: 'Derrota 500 monstruos en Gyfin', desc: 'Zona: Gyfin Rhasia Inferior', progress: 342, total: 500, reward: 'Fragmento de Yzrahid ×5', difficulty: 'Alta', timeLeft: '4 h 12 min', state: 'EN_PROGRESO', kind: 'diaria' },
  { title: 'Entrega imperial de cocina ×2', desc: 'Cajas de almuerzo de Kama ×240', progress: 1, total: 2, reward: 'Sello imperial ×40', difficulty: 'Media', timeLeft: '1 h 05 min', state: 'EN_PROGRESO', kind: 'diaria' },
  { title: 'Jefe de mundo: Kutum ×3', desc: 'Asiste al spawn y obtén recompensa', progress: 1, total: 3, reward: 'Cofre de accesorio Jefe', difficulty: 'Media', timeLeft: '3 d 6 h', state: 'EN_PROGRESO', kind: 'semanal' },
  { title: 'Refuerzo PEN (intento)', desc: 'Acumula 340 Cron + 180 FS', progress: 64, total: 100, reward: 'Kutum PEN', difficulty: 'Extrema', timeLeft: '3 d 6 h', state: 'EN_PROGRESO', kind: 'semanal' },
  { title: 'Nodo inversión: Grána 10', desc: 'Conecta e invierte CP en Grána', progress: 10, total: 10, reward: 'Título «Guardián del bosque»', difficulty: 'Fácil', timeLeft: 'Completado', state: 'OBTENIDO', kind: 'semanal' },
  { title: 'Colección: 20 tesoros de Valencia', desc: 'Piezas de tesoro del desierto', progress: 7, total: 20, reward: 'Brújula arqueológica', difficulty: 'Extrema', timeLeft: '21 d', state: 'EN_PROGRESO', kind: 'mensual' },
];

export interface LifeSkill {
  name: string;
  icon: string;
  level: string;
  value: number;
  xp: string;
  tool: string;
  pending: string;
}

export const mockLifeSkills: LifeSkill[] = [
  { name: 'Pesca', icon: '🎣', level: 'Maestro 12', value: 92, xp: '78% → Gurú', tool: 'Caña +10 · Barco Epheria', pending: 'Pez dorado de Margoria' },
  { name: 'Cocina', icon: '🍳', level: 'Maestro 4', value: 71, xp: '41% → Maestro 5', tool: 'Utensilio +9', pending: '1.200 platos imperiales' },
  { name: 'Alquimia', icon: '⚗', level: 'Experto 8', value: 58, xp: '22% → Experto 9', tool: 'Herramienta +7', pending: 'Elixir de furia ×300' },
  { name: 'Recolección', icon: '⛏', level: 'Maestro 1', value: 84, xp: '63% → Maestro 2', tool: 'Hoz mágica Manos', pending: 'Savia de Kama ×500' },
  { name: 'Procesamiento', icon: '⚙', level: 'Artesano 6', value: 66, xp: '35% → Artesano 7', tool: 'Piedra de logro', pending: 'Madera contrachapada ×2k' },
  { name: 'Comercio', icon: '🐘', level: 'Experto 2', value: 47, xp: '12% → Experto 3', tool: 'Elefante de comercio', pending: 'Ruta Valencia–Areihaza' },
];

export interface Region {
  name: string;
  icon: string;
  aventuras: number;
  conocimiento: number;
  misiones: number;
  colecciones: number;
  note: string;
  locked?: boolean;
}

export const mockRegions: Region[] = [
  { name: 'Kamasylvia', icon: '🌳', aventuras: 84, conocimiento: 72, misiones: 91, colecciones: 63, note: '12 misiones restantes' },
  { name: 'Calpheon', icon: '🏰', aventuras: 96, conocimiento: 88, misiones: 100, colecciones: 71, note: 'Completada al 96%' },
  { name: 'Valencia', icon: '🏜', aventuras: 61, conocimiento: 54, misiones: 68, colecciones: 42, note: 'Tesoro: brújula 7/20' },
  { name: 'Mediah', icon: '🌋', aventuras: 78, conocimiento: 81, misiones: 83, colecciones: 59, note: 'Jefes de mundo pendientes' },
  { name: 'Drieghan', icon: '🐉', aventuras: 49, conocimiento: 44, misiones: 52, colecciones: 31, note: 'Dreck... zona dura' },
  { name: 'Tierra del Amanecer', icon: '🌅', aventuras: 22, conocimiento: 18, misiones: 25, colecciones: 12, note: 'Región nueva — explorar', locked: false },
];

export interface KnowledgeCat {
  name: string;
  icon: string;
  found: number;
  total: number;
}

export const mockKnowledge: KnowledgeCat[] = [
  { name: 'Topografía', icon: '🗺', found: 412, total: 460 },
  { name: 'Aventuras', icon: '📖', found: 388, total: 442 },
  { name: 'Personajes', icon: '👥', found: 521, total: 610 },
  { name: 'Ecología', icon: '🐾', found: 690, total: 820 },
  { name: 'Academia', icon: '🎓', found: 244, total: 350 },
];

export interface CollectionItem {
  name: string;
  icon: string;
  state: ItemState;
  rarity: Rarity;
  hint: string;
}

export const mockCollections: CollectionItem[] = [
  { name: 'Pegaso — Tier 8', icon: '🐴', state: 'OBTENIDO', rarity: 'legendaria', hint: 'Veloz: 158%' },
  { name: 'Hada — T4 brillante', icon: '🧚', state: 'OBTENIDO', rarity: 'epica', hint: 'Milagro + Pluma' },
  { name: 'Gato — Tier 4', icon: '🐈', state: 'OBTENIDO', rarity: 'rara', hint: 'Set completo ×5' },
  { name: 'Barco Epheria mejorado', icon: '🚢', state: 'EN_PROGRESO', rarity: 'epica', hint: 'Madera ×1.2k restantes' },
  { name: 'Brújula arqueológica', icon: '🧭', state: 'EN_PROGRESO', rarity: 'mitica', hint: 'Piezas 7/20' },
  { name: 'Mapa del tesoro', icon: '🗺', state: 'PENDIENTE', rarity: 'mitica', hint: 'Valencia + Sycraia' },
  { name: 'Anillo de Lies', icon: '💍', state: 'BLOQUEADO', rarity: 'comun', hint: 'Tesoro de Valencia' },
  { name: 'Trabajador goblin ×12', icon: '👷', state: 'OBTENIDO', rarity: 'rara', hint: 'Nodos 34/38' },
];

export interface Achievement {
  title: string;
  icon: string;
  desc: string;
  value: number;
  state: ItemState;
}

export const mockAchievements: Achievement[] = [
  { title: 'Cazador de jefes', icon: '👹', desc: 'Derrota a los 12 jefes de mundo', value: 100, state: 'OBTENIDO' },
  { title: 'Erudito de Kama', icon: '📚', desc: 'Descubre 400 conocimientos de Kamasylvia', value: 82, state: 'EN_PROGRESO' },
  { title: 'Manos de oro', icon: '🥇', desc: 'Alcanza Gurú en 3 LifeSkills', value: 33, state: 'EN_PROGRESO' },
  { title: 'Conquistador del desierto', icon: '🏜', desc: 'Completa el diario de Valencia II', value: 57, state: 'EN_PROGRESO' },
  { title: 'Leyenda del refuerzo', icon: '🔨', desc: 'Consigue 3 PEN de jefe', value: 66, state: 'EN_PROGRESO' },
  { title: 'Señor de los mares', icon: '🌊', desc: 'Construye el Epheria mejorado', value: 74, state: 'EN_PROGRESO' },
];

export interface Activity {
  icon: string;
  text: string;
  time: string;
  tone: 'gold' | 'green' | 'red' | 'blue';
}

export const mockActivity: Activity[] = [
  { icon: '🔨', text: 'Kutum TET — intento 14 (fallo, FS +182)', time: 'hace 2 h', tone: 'red' },
  { icon: '📜', text: 'Nuevo conocimiento: «Lágrima de Kamasylve»', time: 'hace 5 h', tone: 'blue' },
  { icon: '🍳', text: 'Cocina sube a Maestro 4 (+2.1%)', time: 'ayer', tone: 'green' },
  { icon: '💍', text: 'Obtenido: Collar de Ogre TRI', time: 'ayer', tone: 'gold' },
  { icon: '🗺', text: 'Misión completada: «Luz del bosque» (Kamasylvia)', time: 'hace 2 d', tone: 'gold' },
  { icon: '🏆', text: 'Logro: «Cazador de jefes» desbloqueado', time: 'hace 3 d', tone: 'gold' },
];

export const RARITY_STYLES: Record<Rarity, string> = {
  comun: 'border-white/20',
  magica: 'border-emerald-400/50 shadow-[0_0_12px_rgba(52,211,153,.25)]',
  rara: 'border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,.30)]',
  epica: 'border-violet-400/60 shadow-[0_0_14px_rgba(167,139,250,.35)]',
  legendaria: 'border-amber-400/70 shadow-[0_0_16px_rgba(251,191,36,.40)]',
  mitica: 'border-red-400/70 shadow-[0_0_18px_rgba(248,113,113,.45)]',
};
