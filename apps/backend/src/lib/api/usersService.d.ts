export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
    role: string;
}
export interface UpdateUserDto {
    email?: string;
    name?: string;
    password?: string;
    role?: string;
}
declare class UsersService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(id: string, userData: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
declare const _default: UsersService;
export default _default;
//# sourceMappingURL=usersService.d.ts.map