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
exports.CustomFieldService = void 0;
const common_1 = require("@nestjs/common");
const custom_field_entity_1 = require("../entities/custom-field.entity");
let CustomFieldService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CustomFieldService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CustomFieldService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        customFieldRepository;
        constructor(customFieldRepository) {
            this.customFieldRepository = customFieldRepository;
        }
        async create(createDto) {
            // Validate field name uniqueness
            const existingField = await this.customFieldRepository.findOne({
                where: { name: createDto.name }
            });
            if (existingField) {
                throw new common_1.BadRequestException(`Custom field with name '${createDto.name}' already exists`);
            }
            // Validate options for SELECT types
            if ([custom_field_entity_1.CustomFieldType.SELECT, custom_field_entity_1.CustomFieldType.MULTI_SELECT].includes(createDto.type)) {
                if (!createDto.options || createDto.options.length === 0) {
                    throw new common_1.BadRequestException('Options are required for SELECT and MULTI_SELECT field types');
                }
            }
            // Get next sort order
            const maxSortOrder = await this.customFieldRepository
                .createQueryBuilder('field')
                .select('MAX(field.sortOrder)', 'maxOrder')
                .getRawOne();
            const customField = this.customFieldRepository.create({
                ...createDto,
                sortOrder: (maxSortOrder?.maxOrder || 0) + 1
            });
            return this.customFieldRepository.save(customField);
        }
        async findAll(activeOnly = false) {
            const query = this.customFieldRepository.createQueryBuilder('field')
                .orderBy('field.sortOrder', 'ASC');
            if (activeOnly) {
                query.where('field.active = :active', { active: true });
            }
            return query.getMany();
        }
        async findOne(id) {
            const field = await this.customFieldRepository.findOne({ where: { id } });
            if (!field) {
                throw new common_1.NotFoundException(`Custom field with ID ${id} not found`);
            }
            return field;
        }
        async findByName(name) {
            return this.customFieldRepository.findOne({ where: { name } });
        }
        async update(id, updateDto) {
            const field = await this.findOne(id);
            // If updating name, check uniqueness
            if (updateDto.name && updateDto.name !== field.name) {
                const existingField = await this.customFieldRepository.findOne({
                    where: { name: updateDto.name }
                });
                if (existingField) {
                    throw new common_1.BadRequestException(`Custom field with name '${updateDto.name}' already exists`);
                }
            }
            // Validate options for SELECT types
            if (updateDto.type && [custom_field_entity_1.CustomFieldType.SELECT, custom_field_entity_1.CustomFieldType.MULTI_SELECT].includes(updateDto.type)) {
                if (!updateDto.options || updateDto.options.length === 0) {
                    throw new common_1.BadRequestException('Options are required for SELECT and MULTI_SELECT field types');
                }
            }
            Object.assign(field, updateDto);
            return this.customFieldRepository.save(field);
        }
        async remove(id) {
            const field = await this.findOne(id);
            await this.customFieldRepository.remove(field);
        }
        async reorder(fieldIds) {
            for (let i = 0; i < fieldIds.length; i++) {
                await this.customFieldRepository.update(fieldIds[i], { sortOrder: i + 1 });
            }
        }
        async getFieldsForMapping() {
            const fields = await this.findAll(true);
            // Standard fields
            const standardFields = [
                { key: 'email', label: 'Email Address', required: true, type: 'email' },
                { key: 'firstName', label: 'First Name', required: false, type: 'text' },
                { key: 'lastName', label: 'Last Name', required: false, type: 'text' },
                { key: 'company', label: 'Company', required: false, type: 'text' },
                { key: 'phone', label: 'Phone', required: false, type: 'text' },
                { key: 'location', label: 'Location', required: false, type: 'text' }
            ];
            // Custom fields
            const customFields = fields.map(field => ({
                key: `custom_${field.name}`,
                label: field.label,
                required: field.required,
                type: field.type.toLowerCase()
            }));
            return [...standardFields, ...customFields];
        }
        async validateCustomFieldValue(field, value) {
            if (field.required && (value === null || value === undefined || value === '')) {
                return { isValid: false, error: `${field.label} is required` };
            }
            if (value === null || value === undefined || value === '') {
                return { isValid: true }; // Optional field with no value
            }
            switch (field.type) {
                case custom_field_entity_1.CustomFieldType.TEXT:
                    if (typeof value !== 'string') {
                        return { isValid: false, error: `${field.label} must be text` };
                    }
                    if (field.validation?.min && value.length < field.validation.min) {
                        return { isValid: false, error: `${field.label} must be at least ${field.validation.min} characters` };
                    }
                    if (field.validation?.max && value.length > field.validation.max) {
                        return { isValid: false, error: `${field.label} must be at most ${field.validation.max} characters` };
                    }
                    if (field.validation?.pattern && !new RegExp(field.validation.pattern).test(value)) {
                        return { isValid: false, error: field.validation.message || `${field.label} format is invalid` };
                    }
                    break;
                case custom_field_entity_1.CustomFieldType.NUMBER:
                    const numValue = Number(value);
                    if (isNaN(numValue)) {
                        return { isValid: false, error: `${field.label} must be a number` };
                    }
                    if (field.validation?.min && numValue < field.validation.min) {
                        return { isValid: false, error: `${field.label} must be at least ${field.validation.min}` };
                    }
                    if (field.validation?.max && numValue > field.validation.max) {
                        return { isValid: false, error: `${field.label} must be at most ${field.validation.max}` };
                    }
                    break;
                case custom_field_entity_1.CustomFieldType.DATE:
                    const dateValue = new Date(value);
                    if (isNaN(dateValue.getTime())) {
                        return { isValid: false, error: `${field.label} must be a valid date` };
                    }
                    break;
                case custom_field_entity_1.CustomFieldType.BOOLEAN:
                    if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
                        return { isValid: false, error: `${field.label} must be true or false` };
                    }
                    break;
                case custom_field_entity_1.CustomFieldType.SELECT:
                    if (!field.options?.includes(value)) {
                        return { isValid: false, error: `${field.label} must be one of: ${field.options?.join(', ')}` };
                    }
                    break;
                case custom_field_entity_1.CustomFieldType.MULTI_SELECT:
                    if (!Array.isArray(value)) {
                        return { isValid: false, error: `${field.label} must be an array` };
                    }
                    const invalidOptions = value.filter(v => !field.options?.includes(v));
                    if (invalidOptions.length > 0) {
                        return { isValid: false, error: `${field.label} contains invalid options: ${invalidOptions.join(', ')}` };
                    }
                    break;
            }
            return { isValid: true };
        }
        async validateCustomFieldsData(customFieldsData) {
            const errors = [];
            const validatedData = {};
            const activeFields = await this.findAll(true);
            // Validate each provided custom field
            for (const [fieldName, value] of Object.entries(customFieldsData)) {
                const field = activeFields.find(f => f.name === fieldName);
                if (!field) {
                    errors.push(`Unknown custom field: ${fieldName}`);
                    continue;
                }
                const validation = await this.validateCustomFieldValue(field, value);
                if (!validation.isValid) {
                    errors.push(validation.error);
                }
                else {
                    validatedData[fieldName] = value;
                }
            }
            // Check for required fields that are missing
            for (const field of activeFields) {
                if (field.required && !(field.name in customFieldsData)) {
                    errors.push(`Required custom field missing: ${field.label}`);
                }
            }
            return {
                isValid: errors.length === 0,
                errors,
                validatedData
            };
        }
    };
    return CustomFieldService = _classThis;
})();
exports.CustomFieldService = CustomFieldService;
//# sourceMappingURL=custom-field.service.js.map