'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, KeyRound, Save, Phone, MapPin, Building2, Globe } from "lucide-react";
import Link from "next/link";
import { usersService, rolesService } from '@/lib/api';
import { User as UserType, Role, CreateUserDto, UpdateUserDto } from '@affexai/shared-types';
import { useToast } from '@/hooks/use-toast';

type UserFormProps = {
    user?: UserType | null;
}

export function UserForm({ user = null }: UserFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const isEditing = !!user;

    // Store initial roleId for comparison later
    const initialRoleId = user?.roleId;

    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>(() => {
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
    const [formData, setFormData] = useState({
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

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            const rolesData = await rolesService.getAllRoles();
            setRoles(rolesData);

            // Initialize selected roles after roles are loaded
            if (isEditing && user?.primaryRole) {
                // Get primary and additional roles from user entity
                const primary = [user.primaryRole.id];
                const additional = user.roles
                    ?.filter(role => role.id !== user.primaryRole?.id)
                    .map(role => role.id) || [];
                setSelectedRoles([...primary, ...additional]);
            } else if (!isEditing && rolesData.length > 0) {
                // If creating new user, set default viewer role
                const viewerRole = rolesData.find(r => r.name === 'viewer');
                if (viewerRole) {
                    setSelectedRoles([viewerRole.id]);
                }
            }
        } catch (error) {
            console.error('Failed to load roles:', error);
            toast({
                title: 'Hata',
                description: 'Roller yüklenirken bir hata oluştu',
                variant: 'destructive',
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleRoleToggle = (roleId: string, checked: boolean) => {
        setSelectedRoles(prev => {
            if (checked) {
                return [...prev, roleId];
            } else {
                return prev.filter(id => id !== roleId);
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            // Multi-role support: First role is primary, rest are additional
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

                // Update existing user with multi-role system
                const updateData: UpdateUserDto = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    primaryRoleId: primaryRoleId, // NEW: Multi-role system
                    additionalRoleIds: additionalRoleIds, // NEW: Additional roles
                    phone: formData.phone || undefined,
                    city: formData.city || undefined,
                    country: formData.country || undefined,
                    address: formData.address || undefined,
                    bio: formData.bio || undefined,
                };

                // Only include password if it's provided
                if (formData.password) {
                    updateData.password = formData.password;
                }

                // Single atomic update - roles are now handled in updateUser
                await usersService.updateUser(user.id, updateData);
                console.log('✅ updateUser completed with roles');

                toast({
                    title: 'Başarılı',
                    description: 'Kullanıcı ve roller başarıyla güncellendi',
                });
            } else {
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

                const createData: CreateUserDto = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    primaryRoleId: primaryRoleId, // NEW: Multi-role system
                    additionalRoleIds: additionalRoleIds, // NEW: Additional roles
                    phone: formData.phone || undefined,
                    city: formData.city || undefined,
                    country: formData.country || undefined,
                    address: formData.address || undefined,
                    bio: formData.bio || undefined,
                };

                await usersService.createUser(createData);

                toast({
                    title: 'Başarılı',
                    description: 'Kullanıcı başarıyla oluşturuldu',
                });
            }

            router.push('/admin/users');
        } catch (error: any) {
            console.error('Failed to save user:', error);
            toast({
                title: 'Hata',
                description: error.message || 'Kullanıcı kaydedilirken bir hata oluştu',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>{isEditing ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Oluştur'}</CardTitle>
                    <CardDescription>
                        {isEditing ? 'Kullanıcı bilgilerini ve rolünü güncelleyin.' : 'Sisteme yeni bir kullanıcı ekleyin.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Ad *</Label>
                            <div className="relative flex items-center">
                                <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="firstName" 
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Ahmet" 
                                    className="pl-10" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Soyad *</Label>
                            <div className="relative flex items-center">
                                <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="lastName" 
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Yılmaz" 
                                    className="pl-10" 
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-posta *</Label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                                id="email" 
                                type="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="ornek@example.com" 
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Şifre {!isEditing && '*'}
                        </Label>
                        <div className="relative flex items-center">
                            <KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                                id="password" 
                                type="password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder={isEditing ? 'Değiştirmek için yeni şifre girin' : 'Yeni kullanıcı şifresi'} 
                                className="pl-10"
                                required={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <div className="relative flex items-center">
                            <Phone className="absolute left-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                                id="phone" 
                                type="tel" 
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+90 555 123 4567" 
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="city">Şehir</Label>
                            <div className="relative flex items-center">
                                <Building2 className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="city" 
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="İstanbul" 
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Ülke</Label>
                            <div className="relative flex items-center">
                                <Globe className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="country" 
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="Türkiye" 
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Adres</Label>
                        <div className="relative flex items-center">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea 
                                id="address" 
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Tam adres" 
                                className="pl-10 min-h-[80px]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Biyografi</Label>
                        <Textarea 
                            id="bio" 
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Kısa bir biyografi..." 
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label>Roller *</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                                Kullanıcının sahip olacağı rolleri seçin. İlk seçilen rol ana rol olarak atanır.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {roles.map((role, index) => (
                                <div key={role.id} className="flex items-start space-x-3 space-y-0">
                                    <Checkbox
                                        id={`role-${role.id}`}
                                        checked={selectedRoles.includes(role.id)}
                                        onCheckedChange={(checked) => handleRoleToggle(role.id, checked as boolean)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor={`role-${role.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {role.displayName}
                                            {selectedRoles[0] === role.id && (
                                                <span className="ml-2 text-xs text-primary">(Ana Rol)</span>
                                            )}
                                        </label>
                                        {role.description && (
                                            <p className="text-xs text-muted-foreground">
                                                {role.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {selectedRoles.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                                Seçili roller ({selectedRoles.length}): İlk seçim ana rol, diğerleri ek roller olarak kaydedilir.
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="outline" asChild type="button">
                        <Link href="/admin/users">İptal</Link>
                    </Button>
                    <Button type="submit" disabled={loading}>
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? 'Kaydediliyor...' : (isEditing ? 'Değişiklikleri Kaydet' : 'Kullanıcıyı Oluştur')}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
