import { ComponentService } from '../services/component.service';
import { CreateComponentDto } from '../dto/create-component.dto';
import { UpdateComponentDto } from '../dto/update-component.dto';
export declare class ComponentController {
    private readonly componentService;
    constructor(componentService: ComponentService);
    create(createComponentDto: CreateComponentDto): Promise<import("../entities").Component>;
    findAll(pageId?: string): Promise<import("../entities").Component[]>;
    findOne(id: string): Promise<import("../entities").Component | null>;
    update(id: string, updateComponentDto: UpdateComponentDto): Promise<import("../entities").Component>;
    remove(id: string): Promise<void>;
    reorder(body: {
        componentIds: string[];
        orderIndexes: number[];
    }): Promise<import("../entities").Component[]>;
}
//# sourceMappingURL=component.controller.d.ts.map