import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupsRepository.create(createGroupDto);
    return this.groupsRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupsRepository.find({
      order: { name: 'ASC' }
    });
  }

  async findAllForImport(): Promise<Array<{ id: string; name: string; description: string; subscriberCount: number }>> {
    const groups = await this.groupsRepository.find({
      select: ['id', 'name', 'description', 'subscriberCount'],
      order: { name: 'ASC' }
    });
    
    return groups.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description || '',
      subscriberCount: group.subscriberCount
    }));
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupsRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    Object.assign(group, updateGroupDto);
    return this.groupsRepository.save(group);
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);
    await this.groupsRepository.remove(group);
  }
}