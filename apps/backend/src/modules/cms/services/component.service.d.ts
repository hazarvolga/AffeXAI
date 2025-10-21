import { Repository } from 'typeorm';
import { Component } from '../entities/component.entity';
import { CreateComponentDto } from '../dto/create-component.dto';
import { UpdateComponentDto } from '../dto/update-component.dto';
export declare class ComponentService {
    private componentRepository;
    constructor(componentRepository: Repository<Component>);
    create(createComponentDto: CreateComponentDto): Promise<Component>;
    findAll(pageId?: string): Promise<Component[]>;
    findOne(id: string): Promise<Component | null>;
    update(id: string, updateComponentDto: UpdateComponentDto): Promise<Component>;
    remove(id: string): Promise<void>;
    removeByPageId(pageId: string): Promise<void>;
    reorderComponents(componentIds: string[], orderIndexes: number[]): Promise<Component[]>;
}
//# sourceMappingURL=component.service.d.ts.map