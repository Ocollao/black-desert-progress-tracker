import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { KnowledgeQueryDto } from './dto/knowledge-query.dto';
import { KnowledgeEntry, KnowledgeTheme } from './knowledge.entity';
import { KnowledgeEnergy } from './knowledge-energy.entity';
import { KnowledgeProgress, KnowledgeRequirement } from './knowledge-progress.entity';
import { UpdateKnowledgeProgressDto } from './dto/update-knowledge-progress.dto';

export interface ThemeNode {
  id: string;
  sourceUrn: string;
  name: string;
  parentUrn: string | null;
  total: number;
  obtained: number;
  energy: number;
  children: ThemeNode[];
}

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(KnowledgeEntry)
    private readonly entryRepository: Repository<KnowledgeEntry>,
    @InjectRepository(KnowledgeTheme)
    private readonly themeRepository: Repository<KnowledgeTheme>,
    @InjectRepository(KnowledgeProgress)
    private readonly progressRepository: Repository<KnowledgeProgress>,
    @InjectRepository(KnowledgeRequirement)
    private readonly requirementRepository: Repository<KnowledgeRequirement>,
    @InjectRepository(KnowledgeEnergy)
    private readonly energyRepository: Repository<KnowledgeEnergy>,
  ) {}

  private async descendantUrns(rootUrn: string): Promise<string[]> {
    const themes = await this.themeRepository.find();
    const byParent = new Map<string, KnowledgeTheme[]>();
    for (const theme of themes) {
      if (!theme.parentUrn) continue;
      const list = byParent.get(theme.parentUrn) ?? [];
      list.push(theme);
      byParent.set(theme.parentUrn, list);
    }
    const result = new Set<string>([rootUrn]);
    const queue = [rootUrn];
    while (queue.length) {
      const current = queue.pop() as string;
      for (const child of byParent.get(current) ?? []) {
        if (!result.has(child.sourceUrn)) {
          result.add(child.sourceUrn);
          queue.push(child.sourceUrn);
        }
      }
    }
    return [...result];
  }

  async findAll(query: KnowledgeQueryDto, userId: string) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 24;
    const builder = this.entryRepository.createQueryBuilder('entry');
    builder.leftJoinAndMapOne('entry.progress', KnowledgeProgress, 'progress', 'progress.knowledge_id = entry.id AND progress.user_id = :userId', { userId });

    if (query.search?.trim()) {
      const search = `%${query.search.trim()}%`;
      builder.andWhere(
        '(entry.name ILIKE :search OR entry.description ILIKE :search OR entry.acquisition ILIKE :search)',
        { search },
      );
    }
    if (query.themeId) {
      const theme = await this.themeRepository.findOne({
        where: { id: query.themeId },
      });
      if (theme) {
        if (query.includeChildren === false) {
          builder.andWhere('entry.theme_urn = :themeUrn', {
            themeUrn: theme.sourceUrn,
          });
        } else {
          const urns = await this.descendantUrns(theme.sourceUrn);
          builder.andWhere('entry.theme_urn IN (:...themeUrns)', {
            themeUrns: urns,
          });
        }
      }
    }
    if (query.status === 'obtained') builder.andWhere('progress.obtained = true');
    if (query.status === 'pending') builder.andWhere('(progress.obtained = false OR progress.id IS NULL)');
    if (query.status === 'blocked') {
      builder.andWhere(
        'EXISTS (SELECT 1 FROM knowledge_requirements requirement WHERE requirement.knowledge_id = entry.id) AND EXISTS (SELECT 1 FROM knowledge_requirements requirement LEFT JOIN knowledge_progress prerequisite_progress ON prerequisite_progress.knowledge_id = requirement.required_knowledge_id AND prerequisite_progress.user_id = :blockedUserId WHERE requirement.knowledge_id = entry.id AND (prerequisite_progress.obtained = false OR prerequisite_progress.id IS NULL))',
        { blockedUserId: userId },
      );
    }

    const [items, total] = await builder
      .orderBy('entry.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    const progress = await this.progressRepository.find({ where: { userId } });
    const obtained = progress.filter((item) => item.obtained).length;
    const energy = await this.getEnergySummary(userId).catch(() => null);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      obtained,
      pending: total - obtained,
      energyMax: energy?.energyMax ?? 0,
      energyObtained: energy?.energyObtained ?? 0,
    };
  }

  async findById(id: string): Promise<KnowledgeEntry> {
    const entry = await this.entryRepository.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException('Registro de conocimiento no encontrado');
    }
    return entry;
  }

  async getProgress(id: string, userId: string) {
    await this.findById(id);
    const record = await this.progressRepository.findOne({ where: { knowledgeId: id, userId } });
    const requirements = await this.requirementRepository.find({ where: { knowledgeId: id }, relations: { requiredKnowledge: true } });
    const requiredIds = requirements.map((item) => item.requiredKnowledgeId);
    const obtainedIds = new Set(
      requiredIds.length === 0
        ? []
        : (
            await this.progressRepository.find({
              where: { userId, knowledgeId: In(requiredIds), obtained: true },
            })
          ).map((item) => item.knowledgeId),
    );
    const allRequirementsMet =
      requiredIds.length === 0 || obtainedIds.size === requiredIds.length;
    return {
      obtained: record?.obtained ?? false,
      obtainedAt: record?.obtainedAt ?? null,
      notes: record?.notes ?? null,
      blocked: !allRequirementsMet,
      requirements: requirements
        .filter((item) => item.requiredKnowledge)
        .map((item) => ({
          id: item.requiredKnowledge.id,
          name: item.requiredKnowledge.name,
          obtained: obtainedIds.has(item.requiredKnowledgeId),
        })),
    };
  }

  async updateProgress(id: string, userId: string, dto: UpdateKnowledgeProgressDto) {
    await this.findById(id);
    let record = await this.progressRepository.findOne({ where: { knowledgeId: id, userId } });
    record ??= this.progressRepository.create({ knowledgeId: id, userId, obtained: false, obtainedAt: null, notes: null });
    record.obtained = dto.obtained;
    record.obtainedAt = dto.obtained ? new Date() : null;
    record.notes = dto.notes ?? record.notes;
    return this.progressRepository.save(record);
  }

  async removeProgress(id: string, userId: string): Promise<void> {
    await this.progressRepository.delete({ knowledgeId: id, userId });
  }

  findThemes(): Promise<KnowledgeTheme[]> {
    return this.themeRepository.find({ order: { name: 'ASC' } });
  }

  async getThemesTree(userId: string): Promise<ThemeNode[]> {
    const [themes, entries, progress, energies] = await Promise.all([
      this.themeRepository.find({ order: { name: 'ASC' } }),
      this.entryRepository.find({ select: { themeUrn: true } }),
      this.progressRepository.find({ where: { userId, obtained: true }, relations: { knowledge: true } }),
      this.energyRepository.find().catch(() => [] as KnowledgeEnergy[]),
    ]);
    const totalByUrn = new Map<string, number>();
    for (const entry of entries) {
      if (!entry.themeUrn) continue;
      totalByUrn.set(entry.themeUrn, (totalByUrn.get(entry.themeUrn) ?? 0) + 1);
    }
    const obtainedUrns = new Set(
      progress.map((item) => item.knowledge?.themeUrn).filter((urn): urn is string => !!urn),
    );
    // Count obtained per theme urn (approximation: count progress rows grouped by theme)
    const obtainedByUrn = new Map<string, number>();
    for (const item of progress) {
      const urn = item.knowledge?.themeUrn;
      if (!urn) continue;
      obtainedByUrn.set(urn, (obtainedByUrn.get(urn) ?? 0) + 1);
    }
    void obtainedUrns;
    const energyByUrn = new Map<string, number>(energies.map((item) => [item.themeUrn, item.energy] as [string, number]));

    const nodes = new Map<string, ThemeNode>();
    for (const theme of themes) {
      nodes.set(theme.sourceUrn, {
        id: theme.id,
        sourceUrn: theme.sourceUrn,
        name: theme.name,
        parentUrn: theme.parentUrn,
        total: totalByUrn.get(theme.sourceUrn) ?? 0,
        obtained: obtainedByUrn.get(theme.sourceUrn) ?? 0,
        energy: energyByUrn.get(theme.sourceUrn) ?? 0,
        children: [],
      });
    }
    const roots: ThemeNode[] = [];
    for (const node of nodes.values()) {
      const parent = node.parentUrn ? nodes.get(node.parentUrn) : undefined;
      if (parent) parent.children.push(node);
      else roots.push(node);
    }
    const aggregate = (node: ThemeNode): { total: number; obtained: number; energy: number } => {
      for (const child of node.children) {
        const sub = aggregate(child);
        node.total += sub.total;
        node.obtained += sub.obtained;
        node.energy += sub.energy;
      }
      return { total: node.total, obtained: node.obtained, energy: node.energy };
    };
    for (const root of roots) aggregate(root);
    return roots.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getRecent(userId: string, limit = 5) {
    const rows = await this.progressRepository.find({
      where: { userId, obtained: true },
      relations: { knowledge: true },
      order: { obtainedAt: 'DESC' },
      take: Math.min(Math.max(limit, 1), 20),
    });
    return rows
      .filter((item) => item.knowledge)
      .map((item) => ({
        id: item.knowledge.id,
        name: item.knowledge.name,
        imagePath: item.knowledge.imagePath,
        obtainedAt: item.obtainedAt,
      }));
  }

  async getEnergySummary(userId: string) {
    let energies: KnowledgeEnergy[] = [];
    try {
      energies = await this.energyRepository.find();
    } catch {
      energies = [];
    }
    const energyByUrn = new Map<string, number>(energies.map((item) => [item.themeUrn, item.energy] as [string, number]));
    const tree = await this.getThemesTree(userId).catch(() => [] as ThemeNode[]);
    const energyMax = energies.reduce((sum, item) => sum + (item.energy ?? 0), 0);
    // Energy obtained: sum energy of root themes fully completed (obtained >= total && total > 0)
    let energyObtained = 0;
    const breakdown = tree.map((root) => {
      const complete = root.total > 0 && root.obtained >= root.total;
      const obtainedEnergy = complete ? root.energy : 0;
      energyObtained += obtainedEnergy;
      return {
        id: root.id,
        sourceUrn: root.sourceUrn,
        name: root.name,
        total: root.total,
        obtained: root.obtained,
        energy: root.energy,
        obtainedEnergy,
        complete,
      };
    });
    void energyByUrn;
    return {
      energyMax,
      energyObtained,
      energyBase: 50,
      estimated: energies.length === 0,
      breakdown,
    };
  }
}
