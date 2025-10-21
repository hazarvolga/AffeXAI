import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): Promise<Group>;
    findAll(): Promise<Group[]>;
    getImportOptions(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            description: string;
            subscriberCount: number;
        }[];
    }>;
    findOne(id: string): Promise<Group>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=group.controller.d.ts.map