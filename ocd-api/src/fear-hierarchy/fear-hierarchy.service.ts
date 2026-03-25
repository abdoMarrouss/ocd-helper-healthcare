import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FearHierarchyItem } from './fear-hierarchy-item.entity';
import { CreateFearHierarchyItemDto, UpdateFearHierarchyItemDto } from './dto/fear-hierarchy.dto';

@Injectable()
export class FearHierarchyService {
  constructor(
    @InjectRepository(FearHierarchyItem)
    private repo: Repository<FearHierarchyItem>,
  ) {}

  async create(userId: string, dto: CreateFearHierarchyItemDto) {
    const item = this.repo.create({ ...dto, userId });
    return this.repo.save(item);
  }

  async findAll(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { sudsRating: 'ASC' },
    });
  }

  async update(userId: string, id: string, dto: UpdateFearHierarchyItemDto) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    if (item.userId !== userId) throw new ForbiddenException();
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(userId: string, id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    if (item.userId !== userId) throw new ForbiddenException();
    return this.repo.remove(item);
  }
}
