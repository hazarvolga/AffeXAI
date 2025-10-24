# Role & Permission Sistemi Analiz Raporu

## 📊 Mevcut Durum

### ✅ Çalışan Sistemler

1. **Multi-Role Desteği**
   - `user_roles` junction table ile many-to-many ilişki ✅
   - Primary role designation ✅
   - Eager loading ile role bilgisi yükleme ✅

2. **JWT Authentication**
   - Token-based authentication ✅
   - Token version kontrolü (role değişikliklerinde invalidation) ✅
   - Fresh user data her request'te DB'den çekiliyor ✅

3. **Database Yapısı**
   - 10 farklı role tanımlı ✅
   - Her role'de JSONB formatında permissions array ✅
   - User-Role ilişkisi doğru kurulmuş ✅

### ❌ Tespit Edilen Sorunlar

#### 1. **CRITICAL: UserRole Enum ve Database Uyumsuzluğu**

**Sorun:**
```typescript
// apps/backend/src/modules/users/enums/user-role.enum.ts
export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  CUSTOMER = 'Customer',
  VIEWER = 'Viewer',
  SUPPORT_MANAGER = 'Support Manager',
  SUPPORT_AGENT = 'Support Agent',
}
```

**Database'deki Roller:**
- admin → Admin ✅
- editor → Editor ✅
- customer → Customer ✅
- viewer → Viewer ✅
- support → Support Team ❌ (Enum'da yok!)
- student → Student ❌ (Enum'da yok!)
- subscriber → Subscriber ❌ (Enum'da yok!)
- marketing_manager → Marketing Manager ❌ (Enum'da yok!)
- social_media_manager → Social Media Manager ❌ (Enum'da yok!)
- content_manager → Content Manager ❌ (Enum'da yok!)

**Etki:**
- `@Roles()` decorator'ında yeni roller kullanılamıyor
- Type safety kaybı
- Controller'larda yeni rollere erişim tanımlanamıyor

#### 2. **Permission-Based Authorization Eksik**

**Sorun:**
- Sadece role-based authorization var
- Permission-based authorization guard yok
- Granular permission kontrolü yapılamıyor

**Örnek:**
```typescript
// Şu an sadece bu mümkün:
@Roles(UserRole.ADMIN, UserRole.EDITOR)

// Ama bu mümkün değil:
@RequirePermissions('tickets.view', 'tickets.respond')
```

#### 3. **RolesGuard'da Role Name Karşılaştırması**

**Sorun:**
```typescript
// apps/backend/src/auth/guards/roles.guard.ts
const hasRole = requiredRoles.some((requiredRole) =>
  userRoleNames.some(
    (userRole: string) => userRole.toLowerCase() === requiredRole.toLowerCase()
  )
);
```

- `userRoleNames` → DB'den gelen: `['Admin', 'Editor']`
- `requiredRoles` → Enum'dan gelen: `['Admin', 'Editor']`
- Şu an çalışıyor ama yeni roller için enum güncellemesi gerekli

#### 4. **Seed Dosyasında Permission Tanımları Eksik**

**Sorun:**
Yeni rollerin permissions'ları seed dosyasında var ama:
- Frontend'de bu permissions kullanılmıyor
- Permission listesi merkezi bir yerde tanımlı değil
- Permission kategorileri yok

#### 5. **Frontend Role Kontrolü**

**Sorun:**
Frontend'de role kontrolü için kullanılan yapı:
```typescript
// Frontend'de role kontrolü nasıl yapılıyor?
// Bu bilgi eksik - kontrol edilmeli
```

## 🔧 Önerilen Düzeltmeler

### 1. UserRole Enum'unu Güncelle (CRITICAL)

```typescript
// apps/backend/src/modules/users/enums/user-role.enum.ts
export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  CUSTOMER = 'Customer',
  VIEWER = 'Viewer',
  SUPPORT = 'Support Team',
  STUDENT = 'Student',
  SUBSCRIBER = 'Subscriber',
  MARKETING_MANAGER = 'Marketing Manager',
  SOCIAL_MEDIA_MANAGER = 'Social Media Manager',
  CONTENT_MANAGER = 'Content Manager',
}
```

### 2. Permission Guard Ekle

```typescript
// apps/backend/src/auth/guards/permissions.guard.ts
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Get all permissions from all user roles
    const userPermissions = new Set<string>();
    user.roles?.forEach(role => {
      role.permissions?.forEach(permission => {
        userPermissions.add(permission);
      });
    });

    // Check if user has ALL required permissions
    const hasAllPermissions = requiredPermissions.every(permission =>
      userPermissions.has(permission)
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException(
        `Access denied. Required permissions: ${requiredPermissions.join(', ')}`
      );
    }

    return true;
  }
}
```

### 3. Permission Decorator Ekle

```typescript
// apps/backend/src/auth/decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const RequirePermissions = (...permissions: string[]) => 
  SetMetadata('permissions', permissions);
```

### 4. Merkezi Permission Tanımları

```typescript
// apps/backend/src/lib/permissions.ts
export const PERMISSIONS = {
  // User Management
  USERS_VIEW: 'users.view',
  USERS_CREATE: 'users.create',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  
  // Role Management
  ROLES_VIEW: 'roles.view',
  ROLES_MANAGE: 'roles.manage',
  
  // Support
  SUPPORT_VIEW: 'support.view',
  SUPPORT_RESPOND: 'support.respond',
  SUPPORT_ASSIGN: 'support.assign',
  
  // Marketing
  MARKETING_CAMPAIGNS: 'marketing.manage_campaigns',
  MARKETING_NEWSLETTERS: 'marketing.manage_newsletters',
  MARKETING_SOCIAL: 'marketing.manage_social',
  
  // CMS
  CMS_VIEW: 'cms.view',
  CMS_CREATE: 'cms.create',
  CMS_EDIT: 'cms.edit',
  CMS_DELETE: 'cms.delete',
  CMS_MENUS: 'cms.manage_menus',
  
  // Events
  EVENTS_VIEW: 'events.view',
  EVENTS_CREATE: 'events.create',
  EVENTS_EDIT: 'events.edit',
  EVENTS_DELETE: 'events.delete',
  EVENTS_ATTENDEES: 'events.manage_attendees',
  
  // Certificates
  CERTIFICATES_VIEW: 'certificates.view',
  CERTIFICATES_CREATE: 'certificates.create',
  CERTIFICATES_EDIT: 'certificates.edit',
  CERTIFICATES_REVOKE: 'certificates.revoke',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
```

## 📋 Yapılması Gerekenler (Priority Order)

### High Priority
1. ✅ **UserRole enum'unu güncelle** - Tüm rolleri ekle
2. ✅ **Permission guard ve decorator ekle** - Granular kontrol için
3. ✅ **Merkezi permission tanımları oluştur** - Type safety için

### Medium Priority
4. **Frontend role/permission kontrollerini kontrol et**
5. **Permission-based UI rendering ekle**
6. **Role management UI'ı güncelle** - Yeni rolleri göster

### Low Priority
7. **Permission kategorileri ekle** - UI'da gruplamak için
8. **Audit logging ekle** - Role/permission değişikliklerini logla
9. **Role hierarchy sistemi** - Rol kalıtımı için

## 🎯 Sonuç

**Sistem genel olarak sağlam ama:**
- UserRole enum güncellemesi CRITICAL
- Permission-based authorization eksik
- Yeni roller kullanılabilir hale getirilmeli

**Tahmini Düzeltme Süresi:** 2-3 saat
