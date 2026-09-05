import { ConflictException, NotFoundException } from '@nestjs/common';
import { ItemGrade } from '../item.entity';
import { ItemService } from '../item.service';
import { ItemRepository } from '../item.repository';

describe('ItemService', () => {
  let service: ItemService;
  let repository: jest.Mocked<ItemRepository>;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deactivate: jest.fn(),
    } as unknown as jest.Mocked<ItemRepository>;
    service = new ItemService(repository);
  });

  it('creates an item when its name is available', async () => {
    const dto = {
      name: 'Kzarka Longsword',
      categoryId: 'category-id',
      grade: ItemGrade.YELLOW,
    };
    const item = { id: 'item-id', ...dto };
    repository.findByName.mockResolvedValue(null);
    repository.create.mockResolvedValue(item as never);

    await expect(service.create(dto)).resolves.toEqual(item);
    expect(repository.create.mock.calls[0]?.[0]).toEqual(dto);
  });

  it('rejects duplicate item names', async () => {
    repository.findByName.mockResolvedValue({ id: 'existing-id' } as never);

    await expect(
      service.create({ name: 'Memory Fragment', categoryId: 'category-id' }),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(repository.create.mock.calls).toHaveLength(0);
  });

  it('rejects missing items', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findById('missing-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('deactivates an existing item', async () => {
    repository.findById.mockResolvedValue({ id: 'item-id' } as never);

    await service.remove('item-id');

    expect(repository.deactivate.mock.calls[0]?.[0]).toBe('item-id');
  });
});
