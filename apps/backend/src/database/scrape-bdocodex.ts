/**
 * Scraper seguro de bdocodex para requisitos previos y energía.
 * - Deshabilitado por defecto: requiere BDO_SCRAPE_ENABLED=true
 * - Usa cache local en BDO_DATA_DIR/scraped/ para no saturar la fuente
 * - Rate-limit + reintentos con backoff; errores en scraped/errors.json (no tumba el boot)
 * - Fase 1: siembra energías manuales bdocodex (captura de referencia). Fase 2: completa con scrapeo real.
 */
import 'reflect-metadata';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';

const rootPath = path.resolve(__dirname, '../../../..');
dotenv.config({ path: path.resolve(rootPath, '.env') });

const MANUAL_ENERGY: Array<[string, number]> = [
  ['Personaje', 192],
  ['Topografía', 63],
  ['Océano', 21],
  ['Ecología', 163],
  ['Diario de Aventuras', 208],
  ['Ciencia', 42],
  ['Vida', 0],
  ['Comercio', 0],
  ['Aprender sobre Black Desert', 0],
];

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

async function seedManualEnergy(dataDir: string): Promise<void> {
  await AppDataSource.initialize();
  try {
    await AppDataSource.query(`CREATE TABLE IF NOT EXISTS "knowledge_energy" ("theme_urn" character varying(120) NOT NULL, "energy" integer NOT NULL DEFAULT '0', "source" character varying(20) NOT NULL DEFAULT 'manual', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_knowledge_energy" PRIMARY KEY ("theme_urn"))`);
    const themes: Array<{ id: string; source_urn: string; name: string }> = await AppDataSource.query(
      `SELECT id, source_urn, name FROM knowledge_themes`,
    );
    const byName = new Map(themes.map((t) => [t.name.toLowerCase(), t]));
    let upserted = 0;
    for (const [name, energy] of MANUAL_ENERGY) {
      const theme = byName.get(name.toLowerCase());
      if (!theme) continue;
      await AppDataSource.query(
        `INSERT INTO knowledge_energy(theme_urn, energy, source) VALUES ($1, $2, 'manual') ON CONFLICT (theme_urn) DO UPDATE SET energy = EXCLUDED.energy, source = 'manual', "updatedAt" = now()`,
        [theme.source_urn, energy],
      );
      upserted += 1;
    }
    console.log(`Manual energy seeded for ${upserted} root themes.`);
  } finally {
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
  }
  void dataDir;
}

async function scrapeRequirements(dataDir: string): Promise<void> {
  const scrapedDir = path.join(dataDir, 'scraped');
  await ensureDir(scrapedDir);
  const errorsPath = path.join(scrapedDir, 'errors.json');
  // TODO Fase 2: implementar fetch real a bdocodex por sourceKey con rate-limit 1 req/800ms,
  // parsear "Requiere: X" y "Energía +N", y hacer upsert en knowledge_requirements / knowledge_energy.
  // Hoy dejamos el andamio seguro: no hace peticiones hasta validar selectores manualmente.
  await fs.writeFile(
    path.join(scrapedDir, 'README.json'),
    JSON.stringify(
      {
        status: 'scaffold',
        next: 'Implementar fetch por sourceKey cuando se validen selectores bdocodex',
        manualEnergy: MANUAL_ENERGY,
      },
      null,
      2,
    ),
  );
  try {
    await fs.access(errorsPath);
  } catch {
    await fs.writeFile(errorsPath, JSON.stringify([], null, 2));
  }
  console.log('Scraper en modo andamio: sin peticiones externas. Manual energy disponible.');
}

async function main(): Promise<void> {
  const dataDir = process.env.BDO_DATA_DIR || 'C:/BDO_Data_Fixed';
  const mode = process.argv.includes('--seed-manual') ? 'seed' : 'scrape';
  if (mode === 'seed') {
    await seedManualEnergy(dataDir);
    return;
  }
  if (process.env.BDO_SCRAPE_ENABLED !== 'true') {
    console.log('BDO_SCRAPE_ENABLED != true: scrapeo omitido por seguridad. Usa --seed-manual para energía inicial.');
    await scrapeRequirements(dataDir);
    return;
  }
  await scrapeRequirements(dataDir);
}

main().catch((error) => {
  console.error('Scraper failed (no fatal for app boot):', error);
  process.exitCode = 1;
});
