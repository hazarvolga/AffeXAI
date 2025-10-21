import { BaseApiService } from './base-service';
import type { Group, CreateGroupDto, UpdateGroupDto } from '@affexai/shared-types';
export type { Group, CreateGroupDto, UpdateGroupDto, };
/**
 * Groups Service
 * Handles email marketing group operations extending BaseApiService
 */
declare class GroupsService extends BaseApiService<Group, CreateGroupDto, UpdateGroupDto> {
    constructor();
}
export declare const groupsService: GroupsService;
export default groupsService;
//# sourceMappingURL=groupsService.d.ts.map