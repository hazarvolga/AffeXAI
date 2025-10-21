"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserForm = UserForm;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const button_1 = require("@/components/ui/button");
const checkbox_1 = require("@/components/ui/checkbox");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const api_1 = require("@/lib/api");
const use_toast_1 = require("@/hooks/use-toast");
function UserForm({ user = null }) {
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    const isEditing = !!user;
    // Store initial roleId for comparison later
    const initialRoleId = user?.roleId;
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [roles, setRoles] = (0, react_1.useState)([]);
    const [selectedRoles, setSelectedRoles] = (0, react_1.useState)(() => {
        // Debug: Log user data to understand structure
        console.log('🔍 UserForm Initial User Data:', {
            user,
            hasUser: !!user,
            hasPrimaryRole: !!user?.primaryRole,
            hasRoles: !!user?.roles,
            hasUserRoles: !!user?.userRoles,
            userRoles: user?.userRoles,
            primaryRole: user?.primaryRole,
            roles: user?.roles,
        });
        // Primary role + additional roles from user_roles table
        if (user?.primaryRole) {
            // Get primary role ID
            const primary = [user.primaryRole.id];
            // Get additional role IDs from roles array (excluding primary)
            const additional = user.roles
                ?.filter(role => role.id !== user.primaryRole?.id)
                .map(role => role.id) || [];
            console.log('✅ Initialized with roles:', { primary, additional, combined: [...primary, ...additional] });
            return [...primary, ...additional];
        }
        console.log('⚠️ No primaryRole found, returning empty array');
        return [];
    });
    // Form state
    const [formData, setFormData] = (0, react_1.useState)({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        password: '',
        phone: user?.phone || '',
        city: user?.city || '',
        country: user?.country || '',
        address: user?.address || '',
        bio: user?.bio || '',
    });
    (0, react_1.useEffect)(() => {
        loadRoles();
    }, []);
    const loadRoles = async () => {
        try {
            const rolesData = await api_1.rolesService.getAllRoles();
            setRoles(rolesData);
            // Initialize selected roles after roles are loaded
            if (isEditing && user?.primaryRole) {
                // Get primary and additional roles from user entity
                const primary = [user.primaryRole.id];
                const additional = user.roles
                    ?.filter(role => role.id !== user.primaryRole?.id)
                    .map(role => role.id) || [];
                setSelectedRoles([...primary, ...additional]);
            }
            else if (!isEditing && rolesData.length > 0) {
                // If creating new user, set default viewer role
                const viewerRole = rolesData.find(r => r.name === 'viewer');
                if (viewerRole) {
                    setSelectedRoles([viewerRole.id]);
                }
            }
        }
        catch (error) {
            console.error('Failed to load roles:', error);
            toast({
                title: 'Hata',
                description: 'Roller yüklenirken bir hata oluştu',
                variant: 'destructive',
            });
        }
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    const handleRoleToggle = (roleId, checked) => {
        setSelectedRoles(prev => {
            if (checked) {
                return [...prev, roleId];
            }
            else {
                return prev.filter(id => id !== roleId);
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🚀 Form submitted!', { isEditing, hasUser: !!user });
        // Validate at least one role is selected
        if (selectedRoles.length === 0) {
            toast({
                title: 'Hata',
                description: 'En az bir rol seçmelisiniz',
                variant: 'destructive',
            });
            return;
        }
        setLoading(true);
        try {
            // First role is primary, rest are additional
            const primaryRoleId = selectedRoles[0];
            const additionalRoleIds = selectedRoles.slice(1);
            console.log('📋 Selected Roles:', {
                primaryRoleId,
                additionalRoleIds,
                selectedRoles,
            });
            if (isEditing && user) {
                console.log('🔍 Role Update Debug:', {
                    initialRoleId,
                    primaryRoleId,
                    additionalRoleIds,
                    selectedRoles,
                });
                // Update existing user with new multi-role system
                const updateData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    primaryRoleId: primaryRoleId, // NEW: Use new multi-role fields
                    additionalRoleIds: additionalRoleIds, // NEW: Additional roles
                    phone: formData.phone || undefined,
                    city: formData.city || undefined,
                    country: formData.country || undefined,
                    address: formData.address || undefined,
                    bio: formData.bio || undefined,
                    // No need to store roles in metadata anymore - handled by user_roles table
                };
                // Only include password if it's provided
                if (formData.password) {
                    updateData.password = formData.password;
                }
                // Single atomic update - roles are now handled in updateUser
                await api_1.usersService.updateUser(user.id, updateData);
                console.log('✅ updateUser completed with roles');
                toast({
                    title: 'Başarılı',
                    description: 'Kullanıcı ve roller başarıyla güncellendi',
                });
            }
            else {
                // Create new user
                if (!formData.password) {
                    toast({
                        title: 'Hata',
                        description: 'Şifre gereklidir',
                        variant: 'destructive',
                    });
                    setLoading(false);
                    return;
                }
                const createData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    roleId: primaryRoleId, // Legacy field for backward compatibility
                    primaryRoleId: primaryRoleId, // NEW: Primary role
                    additionalRoleIds: additionalRoleIds, // NEW: Additional roles
                    phone: formData.phone || undefined,
                    city: formData.city || undefined,
                    country: formData.country || undefined,
                    address: formData.address || undefined,
                    bio: formData.bio || undefined,
                };
                await api_1.usersService.createUser(createData);
                toast({
                    title: 'Başarılı',
                    description: 'Kullanıcı başarıyla oluşturuldu',
                });
            }
            router.push('/admin/users');
        }
        catch (error) {
            console.error('Failed to save user:', error);
            toast({
                title: 'Hata',
                description: error.message || 'Kullanıcı kaydedilirken bir hata oluştu',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (<form onSubmit={handleSubmit}>
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>{isEditing ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Oluştur'}</card_1.CardTitle>
                    <card_1.CardDescription>
                        {isEditing ? 'Kullanıcı bilgilerini ve rolünü güncelleyin.' : 'Sisteme yeni bir kullanıcı ekleyin.'}
                    </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label_1.Label htmlFor="firstName">Ad *</label_1.Label>
                            <div className="relative flex items-center">
                                <lucide_react_1.User className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Ahmet" className="pl-10" required/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label_1.Label htmlFor="lastName">Soyad *</label_1.Label>
                            <div className="relative flex items-center">
                                <lucide_react_1.User className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Yılmaz" className="pl-10" required/>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label_1.Label htmlFor="email">E-posta *</label_1.Label>
                        <div className="relative flex items-center">
                            <lucide_react_1.Mail className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                            <input_1.Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="ornek@example.com" className="pl-10" required/>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label_1.Label htmlFor="password">
                            Şifre {!isEditing && '*'}
                        </label_1.Label>
                        <div className="relative flex items-center">
                            <lucide_react_1.KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                            <input_1.Input id="password" type="password" value={formData.password} onChange={handleInputChange} placeholder={isEditing ? 'Değiştirmek için yeni şifre girin' : 'Yeni kullanıcı şifresi'} className="pl-10" required={!isEditing}/>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label_1.Label htmlFor="phone">Telefon</label_1.Label>
                        <div className="relative flex items-center">
                            <lucide_react_1.Phone className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                            <input_1.Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+90 555 123 4567" className="pl-10"/>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label_1.Label htmlFor="city">Şehir</label_1.Label>
                            <div className="relative flex items-center">
                                <lucide_react_1.Building2 className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="city" value={formData.city} onChange={handleInputChange} placeholder="İstanbul" className="pl-10"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label_1.Label htmlFor="country">Ülke</label_1.Label>
                            <div className="relative flex items-center">
                                <lucide_react_1.Globe className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="country" value={formData.country} onChange={handleInputChange} placeholder="Türkiye" className="pl-10"/>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label_1.Label htmlFor="address">Adres</label_1.Label>
                        <div className="relative flex items-center">
                            <lucide_react_1.MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                            <textarea_1.Textarea id="address" value={formData.address} onChange={handleInputChange} placeholder="Tam adres" className="pl-10 min-h-[80px]"/>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label_1.Label htmlFor="bio">Biyografi</label_1.Label>
                        <textarea_1.Textarea id="bio" value={formData.bio} onChange={handleInputChange} placeholder="Kısa bir biyografi..." className="min-h-[100px]"/>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label_1.Label>Roller *</label_1.Label>
                            <p className="text-sm text-muted-foreground mt-1">
                                Kullanıcının sahip olacağı rolleri seçin. İlk seçilen rol ana rol olarak atanır.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {roles.map((role, index) => (<div key={role.id} className="flex items-start space-x-3 space-y-0">
                                    <checkbox_1.Checkbox id={`role-${role.id}`} checked={selectedRoles.includes(role.id)} onCheckedChange={(checked) => handleRoleToggle(role.id, checked)}/>
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor={`role-${role.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                            {role.displayName}
                                            {selectedRoles[0] === role.id && (<span className="ml-2 text-xs text-primary">(Ana Rol)</span>)}
                                        </label>
                                        {role.description && (<p className="text-xs text-muted-foreground">
                                                {role.description}
                                            </p>)}
                                    </div>
                                </div>))}
                        </div>
                        {selectedRoles.length > 0 && (<p className="text-xs text-muted-foreground">
                                Seçili roller ({selectedRoles.length}): İlk seçim ana rol, diğerleri ek roller olarak kaydedilir.
                            </p>)}
                    </div>
                </card_1.CardContent>
                <card_1.CardFooter className="flex justify-end gap-4">
                    <button_1.Button variant="outline" asChild type="button">
                        <link_1.default href="/admin/users">İptal</link_1.default>
                    </button_1.Button>
                    <button_1.Button type="submit" disabled={loading}>
                        <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                        {loading ? 'Kaydediliyor...' : (isEditing ? 'Değişiklikleri Kaydet' : 'Kullanıcıyı Oluştur')}
                    </button_1.Button>
                </card_1.CardFooter>
            </card_1.Card>
        </form>);
}
//# sourceMappingURL=user-form.js.map