"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTicketTemplateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_template_dto_1 = require("./create-template.dto");
/**
 * DTO for updating a ticket template
 */
class UpdateTicketTemplateDto extends (0, swagger_1.PartialType)(create_template_dto_1.CreateTicketTemplateDto) {
}
exports.UpdateTicketTemplateDto = UpdateTicketTemplateDto;
//# sourceMappingURL=update-template.dto.js.map