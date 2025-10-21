"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const zod_1 = require("zod");
const navigation_1 = require("next/navigation");
const LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Geçerli bir e-posta adresi girin.'),
    password: zod_1.z.string().min(6, 'Şifre en az 6 karakter olmalıdır.'),
});
async function login(prevState, formData) {
    const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return {
            message: 'Form doğrulama hatası.',
            issues: validatedFields.error.flatten().fieldErrors.email,
        };
    }
    // TODO: Gerçek kimlik doğrulama mantığını burada uygulayın (örneğin Firebase Auth, NextAuth.js)
    console.log('Giriş denemesi:', validatedFields.data);
    // For demo purposes, we'll redirect to the admin dashboard
    // In a real application, you would verify credentials first
    (0, navigation_1.redirect)('/admin');
}
//# sourceMappingURL=actions.js.map