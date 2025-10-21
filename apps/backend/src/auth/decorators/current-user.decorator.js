"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
/**
 * Current User Decorator
 * Extracts authenticated user from request
 *
 * @example
 * @Get('profile')
 * getProfile(@CurrentUser() user: any) {
 *   return user;
 * }
 *
 * // Get specific property
 * @Get('my-tickets')
 * getMyTickets(@CurrentUser('id') userId: string) {
 *   return this.ticketsService.findByUserId(userId);
 * }
 */
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});
//# sourceMappingURL=current-user.decorator.js.map