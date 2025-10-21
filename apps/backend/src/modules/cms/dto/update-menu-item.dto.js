"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCmsMenuItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_menu_item_dto_1 = require("./create-menu-item.dto");
class UpdateCmsMenuItemDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_menu_item_dto_1.CreateCmsMenuItemDto, ['menuId'])) {
}
exports.UpdateCmsMenuItemDto = UpdateCmsMenuItemDto;
//# sourceMappingURL=update-menu-item.dto.js.map