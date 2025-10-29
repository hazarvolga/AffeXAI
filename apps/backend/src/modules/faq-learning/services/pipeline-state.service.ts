import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PipelineState, PipelineStatus } from '../entities/pipeline-state.entity';

@Injectable()
export class PipelineStateService {
  private readonly logger = new Logger(PipelineStateService.name);

  constructor(
    @InjectRepository(PipelineState)
    private readonly pipelineStateRepository: Repository<PipelineState>,
  ) {}

  /**
   * Get or create the pipeline state singleton
   */
  async getState(): Promise<PipelineState> {
    let state = await this.pipelineStateRepository.findOne({
      order: { createdAt: 'DESC' },
    });

    if (!state) {
      // Create initial state
      state = this.pipelineStateRepository.create({
        status: PipelineStatus.STOPPED,
        dailyProcessingCount: 0,
        totalFaqsGenerated: 0,
        processingConfig: {
          mode: 'manual',
          batchSize: 50,
          scheduleInterval: 3600,
        },
      });
      state = await this.pipelineStateRepository.save(state);
      this.logger.log('Created initial pipeline state');
    }

    return state;
  }

  /**
   * Update pipeline status
   */
  async updateStatus(
    status: PipelineStatus,
    error?: { message: string; stack?: string },
  ): Promise<PipelineState> {
    const state = await this.getState();

    state.status = status;
    state.updatedAt = new Date();

    if (status === PipelineStatus.RUNNING) {
      state.lastRun = new Date();
    }

    if (error) {
      state.lastError = {
        message: error.message,
        timestamp: new Date(),
        stack: error.stack,
      };
    }

    return await this.pipelineStateRepository.save(state);
  }

  /**
   * Start the pipeline
   */
  async start(): Promise<PipelineState> {
    this.logger.log('Starting FAQ Learning pipeline');
    return await this.updateStatus(PipelineStatus.RUNNING);
  }

  /**
   * Stop the pipeline
   */
  async stop(): Promise<PipelineState> {
    this.logger.log('Stopping FAQ Learning pipeline');
    return await this.updateStatus(PipelineStatus.STOPPED);
  }

  /**
   * Mark pipeline as error
   */
  async markError(error: { message: string; stack?: string }): Promise<PipelineState> {
    this.logger.error('Pipeline encountered error:', error.message);
    return await this.updateStatus(PipelineStatus.ERROR, error);
  }

  /**
   * Increment daily processing count
   */
  async incrementDailyCount(): Promise<void> {
    const state = await this.getState();
    state.dailyProcessingCount += 1;
    await this.pipelineStateRepository.save(state);
  }

  /**
   * Increment total FAQs generated
   */
  async incrementTotalFaqs(count: number = 1): Promise<void> {
    const state = await this.getState();
    state.totalFaqsGenerated += count;
    await this.pipelineStateRepository.save(state);
  }

  /**
   * Reset daily count (called at midnight)
   */
  async resetDailyCount(): Promise<void> {
    const state = await this.getState();
    state.dailyProcessingCount = 0;
    await this.pipelineStateRepository.save(state);
  }

  /**
   * Check if pipeline is currently running
   */
  async isRunning(): Promise<boolean> {
    const state = await this.getState();
    return state.status === PipelineStatus.RUNNING;
  }

  /**
   * Update processing config
   */
  async updateConfig(config: {
    mode?: 'manual' | 'real-time' | 'batch' | 'scheduled';
    batchSize?: number;
    scheduleInterval?: number;
  }): Promise<PipelineState> {
    const state = await this.getState();
    state.processingConfig = {
      ...state.processingConfig,
      ...config,
    };
    return await this.pipelineStateRepository.save(state);
  }
}
