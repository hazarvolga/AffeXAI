export declare class AuthUtilsService {
    private readonly saltRounds;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=auth-utils.service.d.ts.map