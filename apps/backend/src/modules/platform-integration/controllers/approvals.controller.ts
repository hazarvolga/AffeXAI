import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomationApproval, ApprovalStatus } from '../entities/automation-approval.entity';
import { AutomationExecutorService } from '../services/automation-executor.service';

/**
 * Approvals Controller
 * 
 * Manage automation approval requests.
 */
@Controller('automation/approvals')
export class ApprovalsController {
  constructor(
    @InjectRepository(AutomationApproval)
    private readonly approvalRepository: Repository<AutomationApproval>,
    private readonly executorService: AutomationExecutorService,
  ) {}

  /**
   * Get all approval requests
   */
  @Get()
  async findAll() {
    return this.approvalRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['rule'],
    });
  }

  /**
   * Get pending approval requests
   */
  @Get('pending')
  async findPending() {
    return this.approvalRepository.find({
      where: { status: ApprovalStatus.PENDING },
      order: { priority: 'ASC', createdAt: 'ASC' }, // Urgent first, then oldest
      relations: ['rule'],
    });
  }

  /**
   * Get approval request by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.approvalRepository.findOne({
      where: { id },
      relations: ['rule', 'event'],
    });
  }

  /**
   * Approve automation request
   */
  @Post(':id/approve')
  async approve(
    @Param('id') id: string,
    @Body() body: { userId: string; userName: string; comment?: string },
  ) {
    const approval = await this.approvalRepository.findOne({
      where: { id },
      relations: ['rule', 'event'],
    });

    if (!approval) {
      throw new Error(`Approval not found: ${id}`);
    }

    if (!approval.canApprove()) {
      throw new Error(`Approval cannot be granted: ${approval.status}`);
    }

    // Add approval to chain
    approval.addApproval(
      body.userId,
      body.userName,
      'approved',
      body.comment,
      // In real app, get IP from request
      undefined,
    );

    await this.approvalRepository.save(approval);

    // If fully approved, execute the automation
    if (approval.status === ApprovalStatus.APPROVED) {
      await this.executorService.executeApprovedAutomation(id);
    }

    return approval;
  }

  /**
   * Reject automation request
   */
  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body() body: { userId: string; userName: string; comment?: string },
  ) {
    const approval = await this.approvalRepository.findOne({
      where: { id },
      relations: ['rule'],
    });

    if (!approval) {
      throw new Error(`Approval not found: ${id}`);
    }

    if (!approval.canApprove()) {
      throw new Error(`Approval cannot be rejected: ${approval.status}`);
    }

    // Add rejection to chain
    approval.addApproval(
      body.userId,
      body.userName,
      'rejected',
      body.comment,
      undefined,
    );

    await this.approvalRepository.save(approval);

    return approval;
  }

  /**
   * Get approval statistics
   */
  @Get('stats/overview')
  async getStats() {
    const all = await this.approvalRepository.find();

    const pending = all.filter(a => a.status === ApprovalStatus.PENDING).length;
    const approved = all.filter(a => a.status === ApprovalStatus.APPROVED).length;
    const rejected = all.filter(a => a.status === ApprovalStatus.REJECTED).length;
    const expired = all.filter(a => a.status === ApprovalStatus.EXPIRED).length;

    return {
      total: all.length,
      pending,
      approved,
      rejected,
      expired,
    };
  }
}
