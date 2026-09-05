import { KnowledgeService } from '../knowledge.service';

function mockRepo(methods: Record<string, jest.Mock>) {
  return methods as never;
}

describe('KnowledgeService progress requirements', () => {
  it('marks each requirement individually, not globally', async () => {
    const entryRepository = mockRepo({ findOne: jest.fn().mockResolvedValue({ id: 'k1' }) });
    const themeRepository = mockRepo({ find: jest.fn(), findOne: jest.fn() });
    const progressRepository = mockRepo({
      findOne: jest.fn().mockResolvedValue({ obtained: false }),
      find: jest.fn().mockImplementation((opts: { where?: { obtained?: boolean } }) => {
        // Simula que solo uno de los dos requisitos está obtenido
        if (opts?.where?.obtained === true) {
          return Promise.resolve([{ knowledgeId: 'req-1' }]);
        }
        return Promise.resolve([]);
      }),
      count: jest.fn(),
    });
    const requirementRepository = mockRepo({
      find: jest.fn().mockResolvedValue([
        { requiredKnowledgeId: 'req-1', requiredKnowledge: { id: 'r1', name: 'Req Uno' } },
        { requiredKnowledgeId: 'req-2', requiredKnowledge: { id: 'r2', name: 'Req Dos' } },
      ]),
    });
    const energyRepository = mockRepo({ find: jest.fn().mockResolvedValue([]) });

    const service = new KnowledgeService(
      entryRepository as never,
      themeRepository as never,
      progressRepository as never,
      requirementRepository as never,
      energyRepository as never,
    );

    const result = await service.getProgress('k1', 'u1');
    expect(result.blocked).toBe(true);
    expect(result.requirements).toEqual([
      { id: 'r1', name: 'Req Uno', obtained: true },
      { id: 'r2', name: 'Req Dos', obtained: false },
    ]);
  });

  it('builds theme tree aggregating children totals', async () => {
    const themes = [
      { id: 'root-id', sourceUrn: 'urn:root', name: 'Ecología', parentUrn: null },
      { id: 'child-id', sourceUrn: 'urn:child', name: 'Lobos', parentUrn: 'urn:root' },
    ];
    const entryRepository = mockRepo({
      find: jest.fn().mockResolvedValue([{ themeUrn: 'urn:child' }, { themeUrn: 'urn:child' }]),
      createQueryBuilder: jest.fn(),
    });
    const themeRepository = mockRepo({ find: jest.fn().mockResolvedValue(themes) });
    const progressRepository = mockRepo({ find: jest.fn().mockResolvedValue([]) });
    const requirementRepository = mockRepo({ find: jest.fn() });
    const energyRepository = mockRepo({
      find: jest.fn().mockResolvedValue([{ themeUrn: 'urn:root', energy: 10 }]),
    });

    const service = new KnowledgeService(
      entryRepository as never,
      themeRepository as never,
      progressRepository as never,
      requirementRepository as never,
      energyRepository as never,
    );
    const tree = await service.getThemesTree('u1');
    expect(tree).toHaveLength(1);
    expect(tree[0]?.total).toBe(2);
    expect(tree[0]?.children).toHaveLength(1);
  });
});
