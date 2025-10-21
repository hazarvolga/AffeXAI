import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupService {
    private groupsRepository;
    constructor(groupsRepository: Repository<Group>);
    create(createGroupDto: CreateGroupDto): Promise<Group>;
    findAll(): Promise<Group[]>;
    findAllForImport(): Promise<Array<{
        id: string;
        name: string;
        description: string;
        subscriberCount: number;
    }>>;
    findOne(id: string): Promise<Group>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=group.service.d.ts.map