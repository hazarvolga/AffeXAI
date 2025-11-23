import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Check if role name already exists
    const existingRole = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name },
    });

    if (existingRole) {
      throw new ConflictException(`Role with name "${createRoleDto.name}" already exists`);
    }

    const role = this.rolesRepository.create({
      ...createRoleDto,
      isSystem: false, // Custom roles are not system roles
    });

    return await this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({
      relations: ['users'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }

    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.rolesRepository.findOne({
      where: { name },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    // Prevent updating system roles' name
    if (role.isSystem && updateRoleDto.name && updateRoleDto.name !== role.name) {
      throw new BadRequestException('Cannot change name of system roles');
    }

    // Check for name conflict if name is being updated
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.rolesRepository.findOne({
        where: { name: updateRoleDto.name },
      });

      if (existingRole) {
        throw new ConflictException(`Role with name "${updateRoleDto.name}" already exists`);
      }
    }

    Object.assign(role, updateRoleDto);
    return await this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);

    // Prevent deleting system roles
    if (role.isSystem) {
      throw new BadRequestException('Cannot delete system roles');
    }

    // Check if role has users
    if (role.users && role.users.length > 0) {
      throw new BadRequestException(
        `Cannot delete role "${role.displayName}" because it has ${role.users.length} assigned user(s)`,
      );
    }

    await this.rolesRepository.remove(role);
  }

  async getPermissions(id: string): Promise<string[]> {
    const role = await this.findOne(id);
    return role.permissions || [];
  }

  async updatePermissions(id: string, permissions: string[]): Promise<Role> {
    const role = await this.findOne(id);
    role.permissions = permissions;
    return await this.rolesRepository.save(role);
  }

  async getUserCount(id: string): Promise<number> {
    const role = await this.findOne(id);
    return role.users ? role.users.length : 0;
  }

  /**
   * Find multiple roles by their IDs
   * NEW: Added for multi-role support
   */
  async findByIds(ids: string[]): Promise<Role[]> {
    if (!ids || ids.length === 0) {
      return [];
    }

    return this.rolesRepository.findByIds(ids);
  }
}
