
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
import { Group } from '../entities/group.entity';
import { Segment } from '../entities/segment.entity';
import { SubscriberStatus } from '@affexai/shared-types';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,
  ) {}

  async getRecipientStats() {
    // Count active subscribers
    const totalActiveSubscribers = await this.subscriberRepository.count({
      where: { status: SubscriberStatus.ACTIVE },
    });

    // Get all groups and add a dummy subscriber count
    const groups = await this.groupRepository.find();
    const groupsWithCount = groups.map((group) => ({
      ...group,
      subscriberCount: 0, // Will be calculated when proper relations are added
    }));

    // Get all segments and add a dummy subscriber count
    const segments = await this.segmentRepository.find();
    const segmentsWithCount = segments.map((segment) => ({
      ...segment,
      subscriberCount: 0, // Will be calculated when proper relations are added
    }));

    return {
      totalActiveSubscribers,
      groups: groupsWithCount,
      segments: segmentsWithCount,
    };
  }
}
