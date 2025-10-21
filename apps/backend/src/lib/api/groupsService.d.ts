export interface Group {
    id: string;
    name: string;
    description?: string;
    subscriberCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateGroupDto {
    name: string;
    description?: string;
}
export interface UpdateGroupDto {
    name?: string;
    description?: string;
    subscriberCount?: number;
}
declare class GroupsService {
    getAllGroups(): Promise<Group[]>;
    getGroupById(id: string): Promise<Group>;
    createGroup(groupData: CreateGroupDto): Promise<Group>;
    updateGroup(id: string, groupData: UpdateGroupDto): Promise<Group>;
    deleteGroup(id: string): Promise<void>;
}
declare const _default: GroupsService;
export default _default;
//# sourceMappingURL=groupsService.d.ts.map