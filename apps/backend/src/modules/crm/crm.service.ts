import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmCustomer } from './entities/crm-customer.entity';
import { CreateCrmCustomerDto } from './dto/create-crm-customer.dto';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(CrmCustomer)
    private crmCustomerRepository: Repository<CrmCustomer>,
  ) {}

  /**
   * Check if email exists in CRM database
   * Used during signup to auto-assign customer role
   */
  async isCustomerEmail(email: string): Promise<boolean> {
    const customer = await this.crmCustomerRepository.findOne({
      where: { email: email.toLowerCase(), isActive: true },
    });
    return !!customer;
  }

  /**
   * Get CRM customer by email
   */
  async findByEmail(email: string): Promise<CrmCustomer | null> {
    return this.crmCustomerRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  /**
   * Get all CRM customers
   */
  async findAll(): Promise<CrmCustomer[]> {
    return this.crmCustomerRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get CRM customer by ID
   */
  async findOne(id: string): Promise<CrmCustomer> {
    const customer = await this.crmCustomerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`CRM customer with ID ${id} not found`);
    }

    return customer;
  }

  /**
   * Create a single CRM customer
   */
  async create(createDto: CreateCrmCustomerDto): Promise<CrmCustomer> {
    // Check for duplicate email
    const existing = await this.findByEmail(createDto.email);
    if (existing) {
      throw new ConflictException(`Email ${createDto.email} already exists in CRM`);
    }

    const customer = this.crmCustomerRepository.create({
      ...createDto,
      email: createDto.email.toLowerCase(),
    });

    return this.crmCustomerRepository.save(customer);
  }

  /**
   * Bulk import CRM customers
   * Skips duplicates and returns stats
   */
  async bulkImport(customers: CreateCrmCustomerDto[]): Promise<{
    imported: number;
    skipped: number;
    errors: string[];
  }> {
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const customerDto of customers) {
      try {
        // Check if already exists
        const existing = await this.findByEmail(customerDto.email);
        if (existing) {
          skipped++;
          continue;
        }

        // Create new customer
        await this.create(customerDto);
        imported++;
      } catch (error) {
        errors.push(`${customerDto.email}: ${error.message}`);
        skipped++;
      }
    }

    return { imported, skipped, errors };
  }

  /**
   * Update CRM customer
   */
  async update(id: string, updateDto: Partial<CreateCrmCustomerDto>): Promise<CrmCustomer> {
    const customer = await this.findOne(id);

    // Check email uniqueness if email is being updated
    if (updateDto.email && updateDto.email !== customer.email) {
      const existing = await this.findByEmail(updateDto.email);
      if (existing) {
        throw new ConflictException(`Email ${updateDto.email} already exists in CRM`);
      }
    }

    Object.assign(customer, updateDto);

    if (updateDto.email) {
      customer.email = updateDto.email.toLowerCase();
    }

    return this.crmCustomerRepository.save(customer);
  }

  /**
   * Delete CRM customer (soft delete - set isActive = false)
   */
  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    customer.isActive = false;
    await this.crmCustomerRepository.save(customer);
  }

  /**
   * Hard delete CRM customer
   */
  async hardDelete(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.crmCustomerRepository.remove(customer);
  }

  /**
   * Get CRM statistics
   */
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
  }> {
    const total = await this.crmCustomerRepository.count();
    const active = await this.crmCustomerRepository.count({ where: { isActive: true } });
    const inactive = total - active;

    return { total, active, inactive };
  }
}
