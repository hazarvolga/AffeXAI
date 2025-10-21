"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
const zod_1 = require("zod");
const SignupSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'İsim en az 2 karakter olmalıdır.'),
    email: zod_1.z.string().email('Geçerli bir e-posta adresi girin.'),
    password: zod_1.z.string().min(8, 'Şifre en az 8 karakter olmalıdır.'),
});
async function signup(prevState, formData) {
    const validatedFields = SignupSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return {
            message: 'Form doğrulama hatası.',
            issues: validatedFields.error.flatten().fieldErrors.name || validatedFields.error.flatten().fieldErrors.email || validatedFields.error.flatten().fieldErrors.password,
        };
    }
    // TODO: Gerçek kullanıcı kayıt mantığını burada uygulayın (örneğin Firebase Auth)
    console.log('Kayıt denemesi:', validatedFields.data);
    // Başarılı kayıt varsayımı
    return { message: 'Kayıt başarılı! Lütfen giriş yapın.' };
}
//# sourceMappingURL=actions.js.map