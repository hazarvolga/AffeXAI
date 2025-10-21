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
export declare const CurrentUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
//# sourceMappingURL=current-user.decorator.d.ts.map