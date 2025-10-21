"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCmsCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_category_dto_1 = require("./create-category.dto");
class UpdateCmsCategoryDto extends (0, mapped_types_1.PartialType)(create_category_dto_1.CreateCmsCategoryDto) {
}
exports.UpdateCmsCategoryDto = UpdateCmsCategoryDto;
//# sourceMappingURL=update-category.dto.js.map