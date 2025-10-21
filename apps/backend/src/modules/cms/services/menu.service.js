"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const menu_item_entity_1 = require("../entities/menu-item.entity");
let MenuService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MenuService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MenuService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        menuRepository;
        menuItemRepository;
        constructor(menuRepository, menuItemRepository) {
            this.menuRepository = menuRepository;
            this.menuItemRepository = menuItemRepository;
        }
        /**
         * Generate slug from menu name
         */
        generateSlug(name) {
            return name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
        }
        // ==========================================================================
        // Menu Methods
        // ==========================================================================
        /**
         * Create a new menu
         */
        async createMenu(createDto) {
            const slug = createDto.slug || this.generateSlug(createDto.name);
            // Check if slug already exists
            const existingMenu = await this.menuRepository.findOne({
                where: { slug },
            });
            if (existingMenu) {
                throw new common_1.ConflictException(`Menu with slug "${slug}" already exists`);
            }
            const menu = this.menuRepository.create({
                ...createDto,
                slug,
            });
            return this.menuRepository.save(menu);
        }
        /**
         * Find all menus
         */
        async findAllMenus(params) {
            const queryBuilder = this.menuRepository
                .createQueryBuilder('menu')
                .leftJoinAndSelect('menu.items', 'items')
                .orderBy('menu.name', 'ASC');
            if (params?.location) {
                queryBuilder.where('menu.location = :location', {
                    location: params.location,
                });
            }
            if (params?.isActive !== undefined) {
                queryBuilder.andWhere('menu.isActive = :isActive', {
                    isActive: params.isActive,
                });
            }
            if (params?.search) {
                queryBuilder.andWhere('menu.name ILIKE :search', {
                    search: `%${params.search}%`,
                });
            }
            return queryBuilder.getMany();
        }
        /**
         * Find one menu by ID
         */
        async findOneMenu(id) {
            const menu = await this.menuRepository.findOne({
                where: { id },
                relations: ['items'],
            });
            if (!menu) {
                throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
            }
            return menu;
        }
        /**
         * Find menu by slug
         */
        async findMenuBySlug(slug) {
            const menu = await this.menuRepository.findOne({
                where: { slug },
                relations: ['items'],
            });
            if (!menu) {
                throw new common_1.NotFoundException(`Menu with slug "${slug}" not found`);
            }
            return menu;
        }
        /**
         * Update a menu
         */
        async updateMenu(id, updateDto) {
            const menu = await this.findOneMenu(id);
            // Check slug uniqueness if slug is being updated
            if (updateDto.slug && updateDto.slug !== menu.slug) {
                const existingMenu = await this.menuRepository.findOne({
                    where: { slug: updateDto.slug },
                });
                if (existingMenu && existingMenu.id !== id) {
                    throw new common_1.ConflictException(`Menu with slug "${updateDto.slug}" already exists`);
                }
            }
            await this.menuRepository.update(id, updateDto);
            return this.findOneMenu(id);
        }
        /**
         * Delete a menu
         */
        async removeMenu(id) {
            const menu = await this.findOneMenu(id);
            await this.menuRepository.delete(id);
        }
        // ==========================================================================
        // Menu Item Methods
        // ==========================================================================
        /**
         * Create a new menu item
         */
        async createMenuItem(createDto) {
            // Validate menu exists
            const menu = await this.findOneMenu(createDto.menuId);
            // Validate parent item if provided
            if (createDto.parentId) {
                const parentItem = await this.menuItemRepository.findOne({
                    where: { id: createDto.parentId },
                });
                if (!parentItem) {
                    throw new common_1.NotFoundException(`Parent menu item with ID ${createDto.parentId} not found`);
                }
                if (parentItem.menuId !== createDto.menuId) {
                    throw new common_1.BadRequestException('Parent menu item must belong to the same menu');
                }
            }
            const menuItem = this.menuItemRepository.create(createDto);
            return this.menuItemRepository.save(menuItem);
        }
        /**
         * Find all menu items for a menu
         */
        async findMenuItems(menuId) {
            return this.menuItemRepository.find({
                where: { menuId },
                relations: ['parent', 'children'],
                order: {
                    orderIndex: 'ASC',
                    label: 'ASC',
                },
            });
        }
        /**
         * Get menu items as tree structure
         */
        async getMenuItemTree(menuId) {
            const menu = await this.findOneMenu(menuId);
            const items = await this.findMenuItems(menuId);
            const buildTree = (parentId, level = 0) => {
                return items
                    .filter((item) => item.parentId === parentId)
                    .map((item) => ({
                    id: item.id,
                    type: item.type,
                    label: item.label,
                    url: item.url || undefined,
                    pageId: item.pageId || undefined,
                    categoryId: item.categoryId || undefined,
                    target: item.target || undefined,
                    icon: item.icon || undefined,
                    cssClass: item.cssClass || undefined,
                    orderIndex: item.orderIndex,
                    isActive: item.isActive,
                    children: buildTree(item.id, level + 1),
                    level,
                }));
            };
            return buildTree(null, 0);
        }
        /**
         * Find one menu item by ID
         */
        async findOneMenuItem(id) {
            const menuItem = await this.menuItemRepository.findOne({
                where: { id },
                relations: ['parent', 'children', 'menu'],
            });
            if (!menuItem) {
                throw new common_1.NotFoundException(`Menu item with ID ${id} not found`);
            }
            return menuItem;
        }
        /**
         * Update a menu item
         */
        async updateMenuItem(id, updateDto) {
            const menuItem = await this.findOneMenuItem(id);
            // Validate parent item change
            if (updateDto.parentId !== undefined) {
                if (updateDto.parentId === id) {
                    throw new common_1.BadRequestException('Menu item cannot be its own parent');
                }
                if (updateDto.parentId) {
                    const parentItem = await this.menuItemRepository.findOne({
                        where: { id: updateDto.parentId },
                    });
                    if (!parentItem) {
                        throw new common_1.NotFoundException(`Parent menu item with ID ${updateDto.parentId} not found`);
                    }
                    if (parentItem.menuId !== menuItem.menuId) {
                        throw new common_1.BadRequestException('Parent menu item must belong to the same menu');
                    }
                    // Check for circular reference
                    const wouldCreateCircular = await this.wouldCreateCircularReference(id, updateDto.parentId);
                    if (wouldCreateCircular) {
                        throw new common_1.BadRequestException('Cannot set parent: would create circular reference');
                    }
                }
            }
            await this.menuItemRepository.update(id, updateDto);
            return this.findOneMenuItem(id);
        }
        /**
         * Check if setting parentId would create a circular reference
         */
        async wouldCreateCircularReference(menuItemId, newParentId) {
            let currentId = newParentId;
            while (currentId) {
                if (currentId === menuItemId) {
                    return true;
                }
                const item = await this.menuItemRepository.findOne({
                    where: { id: currentId },
                });
                currentId = item?.parentId || null;
            }
            return false;
        }
        /**
         * Delete a menu item
         */
        async removeMenuItem(id) {
            const menuItem = await this.findOneMenuItem(id);
            // Check if menu item has children
            const childrenCount = await this.menuItemRepository.count({
                where: { parentId: id },
            });
            if (childrenCount > 0) {
                throw new common_1.BadRequestException('Cannot delete menu item with child items. Delete or move child items first.');
            }
            await this.menuItemRepository.delete(id);
        }
        /**
         * Reorder menu items
         */
        async reorderMenuItems(dto) {
            if (dto.menuItemIds.length !== dto.orderIndexes.length) {
                throw new common_1.BadRequestException('Menu item IDs and order indexes arrays must have the same length');
            }
            await this.menuItemRepository.manager.transaction(async (manager) => {
                for (let i = 0; i < dto.menuItemIds.length; i++) {
                    await manager.update(menu_item_entity_1.MenuItem, dto.menuItemIds[i], {
                        orderIndex: dto.orderIndexes[i],
                    });
                }
            });
        }
    };
    return MenuService = _classThis;
})();
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map