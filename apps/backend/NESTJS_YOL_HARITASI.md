# NestJS Backend Geliştirme Yol Haritası
## Genel Bakış
Bu yol haritası, sıfırdan modern bir NestJS backend uygulaması geliştirmeniz için adım adım rehberdir.
**Toplam Süre:** 6-8 Hafta
**Stack:** NestJS + TypeScript + PostgreSQL + Redis + BullMQ + Socket.io + S3
**Hedef:** Production-ready, scalable backend API

### FAZ 1: PROJE KURULUMU VE TEMEL YAPILANDIRMA (3-4 Gün)
**Adım 1.1: NestJS Projesi Oluşturma**
*Süre: 2 saat*
Yapılacaklar:
1. Node.js ve npm kurulu olduğundan emin ol
2. Nest CLI kur: `npm i -g @nestjs/cli`
3. Yeni proje oluştur: `nest new project-name`
4. TypeScript, ESLint, Prettier ayarlarını kontrol et
5. `package.json` scripts'leri incele
6. İlk `npm run start` ile test et
**Test Kriteri:** Uygulama `localhost:3000` adresinde çalışmalı

**Adım 1.2: Temel Klasör Yapısı Oluşturma**
*Süre: 1 saat*
Yapılacaklar:
- `src/modules/` klasörü oluştur
- `src/common/` klasörü oluştur (guards, interceptors, filters, decorators)
- `src/config/` klasörü oluştur
- `src/database/` klasörü oluştur (migrations, seeds)
- `.env.example` dosyası oluştur
- `.gitignore` güncelle
**Klasör Yapısı:**
```
src/
├── modules/           # Feature modülleri
├── common/           # Paylaşılan kodlar
├── config/           # Configuration dosyaları
├── database/         # Database ilgili
├── utils/            # Utility fonksiyonlar
└── main.ts           # Entry point
```
**Test Kriteri:** Import path'leri düzgün çalışmalı

**Adım 1.3: Environment Configuration**
*Süre: 2 saat*
Yapılacaklar:
1. `@nestjs/config` paketini kur
2. `ConfigModule`'u `app.module.ts`'e ekle
3. `.env` dosyası oluştur
4. `config/database.config.ts` oluştur
5. `config/jwt.config.ts` oluştur
6. `config/redis.config.ts` oluştur
7. `config/s3.config.ts` oluştur
8. Environment validation ekle (Joi)
**Test Kriteri:** Environment variables okunabilmeli

**Adım 1.4: Docker Compose Setup**
*Süre: 2 saat*
Yapılacaklar:
1. `docker-compose.yml` dosyası oluştur
2. PostgreSQL container ekle
3. Redis container ekle
4. MinIO container ekle (S3 alternative)
5. Adminer ekle (DB yönetimi için)
6. `docker-compose up -d` ile başlat
7. Container'ların sağlıklı çalıştığını kontrol et
**Test Kriteri:** Tüm container'lar ayakta olmalı

**Adım 1.5: Logger ve Global Middleware Setup**
*Süre: 2 saat*
Yapılacaklar:
1. `winston` logger kur ve yapılandır
2. `LoggerModule` oluştur
3. Global exception filter oluştur
4. HTTP logger middleware ekle
5. Request/Response interceptor oluştur
6. `main.ts`'de global pipes ekle (ValidationPipe)
**Test Kriteri:** Tüm requestler loglanmalı

### FAZ 2: DATABASE VE ORM KURULUMU (2-3 Gün)
**Adım 2.1: TypeORM Kurulumu**
*Süre: 3 saat*
Yapılacaklar:
1. `typeorm` ve `pg` paketlerini kur
2. `@nestjs/typeorm` kur
3. `TypeOrmModule`'u `app.module.ts`'e ekle
4. `database.config.ts`'de connection ayarlarını yap
5. CLI için `ormconfig.ts` oluştur
6. Migration ayarlarını yap
**Test Kriteri:** Database'e bağlantı kurulmalı

**Adım 2.2: Base Entity Oluşturma**
*Süre: 1 saat*
Yapılacaklar:
1. `src/database/entities/base.entity.ts` oluştur
2. UUID primary key ekle
3. `createdAt`, `updatedAt`, `deletedAt` (soft delete) ekle
4. `BaseEntity` tüm entity'ler için extend edilebilir hale getir
**Test Kriteri:** Base entity compile olmalı

**Adım 2.3: Migration System Kurulumu**
*Süre: 2 saat*
Yapılacaklar:
1. `src/database/migrations/` klasörü oluştur
2. `package.json`'a migration script'leri ekle
   - `typeorm:migration:generate`
   - `typeorm:migration:run`
   - `typeorm:migration:revert`
3. İlk test migration oluştur ve çalıştır
**Test Kriteri:** Migration çalıştırılabilmeli

**Adım 2.4: Database Seeding Setup**
*Süre: 2 saat*
Yapılacaklar:
1. `src/database/seeds/` klasörü oluştur
2. Seeder interface oluştur
3. User seeder örneği oluştur
4. `npm run seed` script ekle
5. Test data oluştur
**Test Kriteri:** Seed data database'e eklenebilmeli

### FAZ 3: AUTHENTICATION MODÜLÜ (3-4 Gün)
**Adım 3.1: Users Module Oluşturma**
*Süre: 4 saat*
Yapılacaklar:
1. `nest g module modules/users` komutu ile module oluştur
2. `nest g service modules/users`
3. `nest g controller modules/users`
4. `src/modules/users/entities/user.entity.ts` oluştur (email, password, firstName, lastName, role)
5. `create-user.dto.ts` ve `update-user.dto.ts` oluştur
6. CRUD operasyonları yaz (create, findAll, findOne, update, remove)
**Test Kriteri:** User CRUD API endpoint'leri çalışmalı

**Adım 3.2: Password Hashing**
*Süre: 1 saat*
Yapılacaklar:
1. `bcrypt` kur
2. User entity'de `BeforeInsert` ve `BeforeUpdate` hook'ları ekle
3. Password'u hash'le
4. `comparePassword` metodu ekle
**Test Kriteri:** Password hash'lenmiş şekilde kaydedilmeli

**Adım 3.3: Auth Module Setup**
*Süre: 4 saat*
Yapılacaklar:
1. `nest g module modules/auth`
2. `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `passport-local` kur
3. `JwtModule`'u `AuthModule`'e ekle
4. JWT secret ve expiration config'den al
**Test Kriteri:** Auth module compile olmalı

**(Diğer Fazlar ve Adımlar Planlandığı Gibi Devam Edecek...)**


┌─────────────────────────────────────────────┐
│           FRONTEND (Mevcut)                  │
│     Next.js / React / Vue / Angular         │
└─────────────────────────────────────────────┘
                    ↓ REST/GraphQL
┌─────────────────────────────────────────────┐
│         API GATEWAY (Optional)               │
│              - Kong / Traefik                │
│              - Rate Limiting                 │
│              - Authentication                │
└─────────────────────────────────────────────┘
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
┌──────────────┐       ┌──────────────┐
│   Core API   │       │ Worker API   │
│   (NestJS)   │       │   (BullMQ)   │
└──────────────┘       └──────────────┘
        ↓                       ↓
    ┌───┴────┬──────┬──────┬───┴────┐
    ↓        ↓      ↓      ↓        ↓
┌────────┐ ┌────┐ ┌────┐ ┌────┐ ┌─────┐
│Postgres│ │Redis│ │S3  │ │Mongo│ │Elastic│
└────────┘ └────┘ └────┘ └────┘ └─────┘

DATABASE STRATEJİSİ
Seçenek 1: PostgreSQL-First (Önerilen) ⭐
PostgreSQL (Primary Database)
├── Users & Authentication
├── Event Management
│   ├── events
│   ├── event_registrations
│   ├── event_payments
│   └── event_attendance
├── Support Tickets
│   ├── tickets
│   ├── ticket_messages
│   └── ticket_attachments
├── Email Marketing
│   ├── campaigns
│   ├── email_lists
│   ├── email_logs
│   └── campaign_stats
├── Certificates
│   ├── certificates
│   └── certificate_templates
└── Social Media
    ├── social_posts
    ├── social_accounts
    └── post_analytics

MongoDB (Optional - Sadece gerekirse)
├── CMS Content (blog posts, pages)
├── Activity Logs
└── Audit Trails

Redis
├── Session Store
├── Cache Layer
├── Rate Limiting
├── Real-time Data
└── Queue (BullMQ)

Elasticsearch (Optional)
├── Full-text Search
├── Logs
└── Analytics

S3/MinIO
├── Media Files
├── User Uploads
├── Certificate PDFs
└── Email Attachments
Neden PostgreSQL-First?

✅ ACID compliance (güvenilir transactions)
✅ Foreign keys ve relations
✅ JSON support (esnek data için)
✅ Full-text search
✅ Mature ecosystem
✅ Excellent performance
✅ Kolay migration ve backup



🔧 BACKEND FRAMEWORK ÖNERİSİ
1. NestJS (En Önerilen) ⭐⭐⭐
typescript// Modüler yapı
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   └── guards/
│   │       └── jwt-auth.guard.ts
│   │
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── events/
│   │   ├── events.controller.ts
│   │   ├── events.service.ts
│   │   ├── events.module.ts
│   │   ├── entities/
│   │   │   ├── event.entity.ts
│   │   │   └── registration.entity.ts
│   │   └── dto/
│   │
│   ├── email-marketing/
│   │   ├── campaigns.controller.ts
│   │   ├── campaigns.service.ts
│   │   ├── campaigns.module.ts
│   │   ├── processors/
│   │   │   └── email.processor.ts
│   │   └── entities/
│   │
│   ├── support/
│   │   ├── tickets.controller.ts
│   │   ├── tickets.service.ts
│   │   ├── tickets.module.ts
│   │   ├── gateway/
│   │   │   └── tickets.gateway.ts  // WebSocket
│   │   └── entities/
│   │
│   ├── certificates/
│   │   ├── certificates.controller.ts
│   │   ├── certificates.service.ts
│   │   ├── certificates.module.ts
│   │   ├── processors/
│   │   │   └── pdf.processor.ts
│   │   └── entities/
│   │
│   └── social-media/
│       ├── posts.controller.ts
│       ├── posts.service.ts
│       ├── posts.module.ts
│       ├── processors/
│       │   └── scheduler.processor.ts
│       └── entities/
│
├── common/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── decorators/
│   └── pipes/
│
├── config/
│   ├── database.config.ts
│   ├── redis.config.ts
│   └── s3.config.ts
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── factories/
│
└── app.module.ts
NestJS Avantajları:

✅ TypeScript native
✅ Modüler architecture
✅ Dependency injection
✅ Built-in validation
✅ WebSocket support
✅ Queue support
✅ Testing utilities
✅ Mikroservis desteği

Tech Stack (NestJS ile):
bash# Core
@nestjs/core
@nestjs/common
@nestjs/platform-express

# Database
@nestjs/typeorm
typeorm
pg

# Authentication
@nestjs/jwt
@nestjs/passport
passport-jwt

# Queue
@nestjs/bullmq
bullmq
ioredis

# WebSocket
@nestjs/websockets
@nestjs/platform-socket.io

# Validation
class-validator
class-transformer

# File Upload
@nestjs/platform-express
multer
@aws-sdk/client-s3

# Cache
@nestjs/cache-manager
cache-manager
cache-manager-redis-store

2. Express + TypeScript (Minimal)
typescript// Daha hafif, kontrolü sizde
src/
├── api/
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── events.routes.ts
│   │   ├── email.routes.ts
│   │   ├── support.routes.ts
│   │   ├── certificates.routes.ts
│   │   └── social.routes.ts
│   ├── controllers/
│   ├── services/
│   └── middlewares/
│
├── database/
│   ├── models/
│   ├── migrations/
│   └── seeds/
│
├── workers/
│   ├── email.worker.ts
│   ├── certificate.worker.ts
│   └── social.worker.ts
│
├── utils/
├── config/
└── app.ts

3. Fastify (En Hızlı)
Express'ten 2x daha hızlı, NestJS ile de kullanılabilir.

💾 DATABASE SCHEMA ÖRNEĞİ (PostgreSQL)
TypeORM ile:
typescript// entities/user.entity.ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'jsonb', nullable: true })
  profile: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => EventRegistration, reg => reg.user)
  registrations: EventRegistration[];

  @OneToMany(() => SupportTicket, ticket => ticket.user)
  tickets: SupportTicket[];

  @OneToMany(() => Certificate, cert => cert.user)
  certificates: Certificate[];
}

// entities/event.entity.ts
@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  location: string;

  @Column('int')
  capacity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ default: 'draft' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EventRegistration, reg => reg.event)
  registrations: EventRegistration[];

  // Virtual field
  @Column({ type: 'int', select: false })
  registrationCount?: number;
}

// entities/event-registration.entity.ts
@Entity('event_registrations')
export class EventRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.registrations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Event, event => event.registrations)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number;

  @Column({ type: 'jsonb', nullable: true })
  paymentDetails: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  checkedInAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  additionalInfo: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index(['user_id', 'event_id'], { unique: true })
  userEventIndex: any;
}

// entities/email-campaign.entity.ts
@Entity('email_campaigns')
export class EmailCampaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column('text')
  content: string;

  @Column({ default: 'draft' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  @Column({ type: 'int', default: 0 })
  totalRecipients: number;

  @Column({ type: 'int', default: 0 })
  sentCount: number;

  @Column({ type: 'int', default: 0 })
  openedCount: number;

  @Column({ type: 'int', default: 0 })
  clickedCount: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// entities/support-ticket.entity.ts
@Entity('support_tickets')
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ticketNumber: string;

  @ManyToOne(() => User, user => user.tickets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @Column({ default: 'open' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ nullable: true })
  category: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: User;

  @Column({ type: 'timestamp', nullable: true })
  firstResponseAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TicketMessage, msg => msg.ticket)
  messages: TicketMessage[];

  @Index(['status', 'priority'])
  statusPriorityIndex: any;

  @Index(['user_id', 'status'])
  userStatusIndex: any;
}

🔐 AUTHENTICATION STRATEJİSİ
typescript// JWT + Refresh Token Pattern
@Injectable()
export class AuthService {
  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m'
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d'
      })
    };
  }

  async refresh(refreshToken: string) {
    // Verify and generate new tokens
  }
}

// Role-based Access Control (RBAC)
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'jsonb' })
  permissions: string[];

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}

// Guard örneği
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.roles?.includes(role));
  }
}

// Kullanım
@Post()
@Roles('admin', 'moderator')
@UseGuards(JwtAuthGuard, RolesGuard)
async createEvent(@Body() dto: CreateEventDto) {
  return this.eventsService.create(dto);
}

📡 API DESIGN
RESTful API Structure:
# Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

# Users
GET    /api/users
GET    /api/users/:id
POST   /api/users
PATCH  /api/users/:id
DELETE /api/users/:id
GET    /api/users/me
PATCH  /api/users/me

# Events
GET    /api/events
GET    /api/events/:id
POST   /api/events
PATCH  /api/events/:id
DELETE /api/events/:id
GET    /api/events/:id/analytics
POST   /api/events/:id/register
POST   /api/events/:id/checkin
GET    /api/events/:id/registrations

# Email Campaigns
GET    /api/campaigns
GET    /api/campaigns/:id
POST   /api/campaigns
PATCH  /api/campaigns/:id
DELETE /api/campaigns/:id
POST   /api/campaigns/:id/send
POST   /api/campaigns/:id/schedule
GET    /api/campaigns/:id/stats
GET    /api/campaigns/:id/recipients

# Support Tickets
GET    /api/tickets
GET    /api/tickets/:id
POST   /api/tickets
PATCH  /api/tickets/:id
DELETE /api/tickets/:id
POST   /api/tickets/:id/messages
POST   /api/tickets/:id/assign
POST   /api/tickets/:id/close

# Certificates
GET    /api/certificates
GET    /api/certificates/:id
POST   /api/certificates
GET    /api/certificates/:id/download
POST   /api/certificates/generate

# Social Media
GET    /api/social/posts
GET    /api/social/posts/:id
POST   /api/social/posts
POST   /api/social/posts/:id/schedule
DELETE /api/social/posts/:id
GET    /api/social/analytics

🚀 DEPLOYMENT STRATEJİSİ
yaml# docker-compose.yml (Development)
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
      - minio

  worker:
    build: .
    command: npm run worker
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  redis_data:
  minio_data:

📈 PERFORMANS OPTİMİZASYONLARI
typescript// 1. Database Indexing
@Index(['email'])
@Index(['createdAt'])
@Index(['status', 'priority'])

// 2. Query Optimization
const events = await this.eventRepository
  .createQueryBuilder('event')
  .leftJoinAndSelect('event.registrations', 'registration')
  .where('event.status = :status', { status: 'published' })
  .andWhere('event.startDate > :now', { now: new Date() })
  .orderBy('event.startDate', 'ASC')
  .take(10)
  .getMany();

// 3. Caching Layer
@Injectable()
export class CacheService {
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl: number = 3600
  ): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);
    
    const data = await factory();
    await this.redis.setex(key, ttl, JSON.stringify(data));
    return data;
  }
}

// 4. Pagination
@Get()
async findAll(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10
) {
  const [data, total] = await this.repository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { createdAt: 'DESC' }
  });
  
  return {
    data,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
}

✅ ÖNERDİĞİM MİMARİ (Özet)
Backend: NestJS + TypeScript
Primary DB: PostgreSQL (TypeORM)
Cache: Redis
Queue: BullMQ
Storage: S3/MinIO
Search: Elasticsearch (optional)
Auth: JWT + Refresh Tokens
Real-time: Socket.io
API Style: RESTful
Bu yapı size:

✅ Tam kontrol
✅ Yüksek performans
✅ Kolay ölçeklendirme
✅ Modern development experience
✅ Production-ready

Daha detaylı implementasyon örneği ister misiniz? Hangi modülden başlamak istersiniz?RetryClaude does not have the ability to run the code it generates yet.HNestJS (En Önerilen) için bana bu nu bir pol haritası olarak hazırlar mısın tek bir metin bloğunda md formatında  githubcopilot a verebileyimEditNestJS Backend Geliştirme Yol Haritası
Genel Bakış
Bu yol haritası, sıfırdan modern bir NestJS backend uygulaması geliştirmeniz için adım adım rehberdir.
Toplam Süre: 6-8 Hafta
Stack: NestJS + TypeScript + PostgreSQL + Redis + BullMQ + Socket.io + S3
Hedef: Production-ready, scalable backend API

FAZ 1: PROJE KURULUMU VE TEMEL YAPILANDIRMA (3-4 Gün)
Adım 1.1: NestJS Projesi Oluşturma
Süre: 2 saat
Yapılacaklar:

Node.js ve npm kurulu olduğundan emin ol
Nest CLI kur: npm i -g @nestjs/cli
Yeni proje oluştur: nest new project-name
TypeScript, ESLint, Prettier ayarlarını kontrol et
package.json scripts'leri incele
İlk npm run start ile test et

Test Kriteri: Uygulama localhost:3000 adresinde çalışmalı

Adım 1.2: Temel Klasör Yapısı Oluşturma
Süre: 1 saat
Yapılacaklar:

src/modules/ klasörü oluştur
src/common/ klasörü oluştur (guards, interceptors, filters, decorators)
src/config/ klasörü oluştur
src/database/ klasörü oluştur (migrations, seeds)
.env.example dosyası oluştur
.gitignore güncelle

Klasör Yapısı:
src/
├── modules/           # Feature modülleri
├── common/           # Paylaşılan kodlar
├── config/           # Configuration dosyaları
├── database/         # Database ilgili
├── utils/            # Utility fonksiyonlar
└── main.ts           # Entry point
Test Kriteri: Import path'leri düzgün çalışmalı

Adım 1.3: Environment Configuration
Süre: 2 saat
Yapılacaklar:

@nestjs/config paketini kur
ConfigModule'u app.module.ts'e ekle
.env dosyası oluştur
config/database.config.ts oluştur
config/jwt.config.ts oluştur
config/redis.config.ts oluştur
config/s3.config.ts oluştur
Environment validation ekle (Joi)

Test Kriteri: Environment variables okunabilmeli

Adım 1.4: Docker Compose Setup
Süre: 2 saat
Yapılacaklar:

docker-compose.yml dosyası oluştur
PostgreSQL container ekle
Redis container ekle
MinIO container ekle (S3 alternative)
Adminer ekle (DB yönetimi için)
docker-compose up -d ile başlat
Container'ların sağlıklı çalıştığını kontrol et

Test Kriteri: Tüm container'lar ayakta olmalı

Adım 1.5: Logger ve Global Middleware Setup
Süre: 2 saat
Yapılacaklar:

winston logger kur ve yapılandır
LoggerModule oluştur
Global exception filter oluştur
HTTP logger middleware ekle
Request/Response interceptor oluştur
main.ts'de global pipes ekle (ValidationPipe)

Test Kriteri: Tüm requestler loglanmalı

FAZ 2: DATABASE VE ORM KURULUMU (2-3 Gün)
Adım 2.1: TypeORM Kurulumu
Süre: 3 saat
Yapılacaklar:

typeorm ve pg paketlerini kur
@nestjs/typeorm kur
TypeOrmModule'u app.module.ts'e ekle
database.config.ts'de connection ayarlarını yap
CLI için ormconfig.ts oluştur
Migration ayarlarını yap

Test Kriteri: Database'e bağlantı kurulmalı

Adım 2.2: Base Entity Oluşturma
Süre: 1 saat
Yapılacaklar:

src/database/entities/base.entity.ts oluştur
UUID primary key ekle
createdAt, updatedAt, deletedAt (soft delete) ekle
BaseEntity tüm entity'ler için extend edilebilir hale getir

Test Kriteri: Base entity compile olmalı

Adım 2.3: Migration System Kurulumu
Süre: 2 saat
Yapılacaklar:

src/database/migrations/ klasörü oluştur
package.json'a migration script'leri ekle
typeorm:migration:generate script
typeorm:migration:run script
typeorm:migration:revert script
İlk test migration oluştur ve çalıştır

Test Kriteri: Migration çalıştırılabilmeli

Adım 2.4: Database Seeding Setup
Süre: 2 saat
Yapılacaklar:

src/database/seeds/ klasörü oluştur
Seeder interface oluştur
User seeder örneği oluştur
npm run seed script ekle
Test data oluştur

Test Kriteri: Seed data database'e eklenebilmeli

FAZ 3: AUTHENTICATION MODÜLÜ (3-4 Gün)
Adım 3.1: Users Module Oluşturma
Süre: 4 saat
Yapılacaklar:

nest g module modules/users komutu ile module oluştur
nest g service modules/users komutu ile service oluştur
nest g controller modules/users komutu ile controller oluştur
src/modules/users/entities/user.entity.ts oluştur
User entity'de email, password, firstName, lastName, role ekle
src/modules/users/dto/create-user.dto.ts oluştur
src/modules/users/dto/update-user.dto.ts oluştur
CRUD operasyonları yaz (create, findAll, findOne, update, remove)

Test Kriteri: User CRUD API endpoint'leri çalışmalı

Adım 3.2: Password Hashing
Süre: 1 saat
Yapılacaklar:

bcrypt kur
User entity'de BeforeInsert ve BeforeUpdate hook'ları ekle
Password'u hash'le
comparePassword metodu ekle

Test Kriteri: Password hash'lenmiş şekilde kaydedilmeli

Adım 3.3: Auth Module Setup
Süre: 4 saat
Yapılacaklar:

nest g module modules/auth
nest g service modules/auth
nest g controller modules/auth
@nestjs/jwt ve @nestjs/passport kur
passport-jwt ve passport-local kur
JwtModule'u AuthModule'e ekle
JWT secret ve expiration config'den al

Test Kriteri: Auth module compile olmalı

Adım 3.4: Local Strategy (Login)
Süre: 3 saat
Yapılacaklar:

src/modules/auth/strategies/local.strategy.ts oluştur
Email ve password ile kullanıcı validate et
POST /auth/login endpoint'i oluştur
LoginDto oluştur
Başarılı login sonrası JWT token dön

Test Kriteri: Login yapılıp token alınabilmeli

Adım 3.5: JWT Strategy
Süre: 3 saat
Yapılacaklar:

src/modules/auth/strategies/jwt.strategy.ts oluştur
Token'dan user bilgisini extract et
JwtAuthGuard oluştur
Protected endpoint örneği oluştur (GET /users/me)
Authorization header'dan token oku

Test Kriteri: Token ile protected endpoint'e erişilebilmeli

Adım 3.6: Refresh Token Implementasyonu
Süre: 4 saat
Yapılacaklar:

RefreshToken entity oluştur
Refresh token generate et
POST /auth/refresh endpoint'i oluştur
Refresh token ile yeni access token al
Kullanılmış refresh token'ları invalidate et
Redis'te refresh token store et

Test Kriteri: Refresh token ile yeni token alınabilmeli

Adım 3.7: Role-Based Access Control (RBAC)
Süre: 4 saat
Yapılacaklar:

Role enum oluştur (Admin, User, Moderator)
Roles decorator oluştur
RolesGuard oluştur
User entity'ye roles field ekle
Admin-only endpoint örneği oluştur

Test Kriteri: Role bazlı erişim kontrolü çalışmalı

FAZ 4: CORE MODÜLLER (5-7 Gün)
Adım 4.1: Events Module
Süre: 1 gün
Yapılacaklar:

Events module, service, controller oluştur
Event entity oluştur (title, description, startDate, endDate, location, capacity, price, status)
EventRegistration entity oluştur
CreateEventDto, UpdateEventDto oluştur
CRUD endpoint'leri oluştur
GET /events (public, pagination, filtering)
POST /events (admin only)
PATCH /events/:id (admin only)
DELETE /events/:id (admin only)
GET /events/:id (public)

Test Kriteri: Event CRUD operasyonları çalışmalı

Adım 4.2: Event Registration System
Süre: 1 gün
Yapılacaklar:

POST /events/:id/register endpoint'i
Capacity kontrolü
Duplicate registration kontrolü
Registration entity'de status (pending, confirmed, cancelled)
Payment bilgileri (amount, payment method)
GET /events/:id/registrations (admin only)
GET /users/me/registrations (user'ın kendi kayıtları)
PATCH /registrations/:id/status (admin - confirm/cancel)

Test Kriteri: Event'e kayıt olunabilmeli

Adım 4.3: Event Analytics Endpoint
Süre: 4 saat
Yapılacaklar:

GET /events/:id/analytics endpoint'i
Kayıt sayısı hesapla
Toplam gelir hesapla
Doluluk oranı hesapla
Günlük kayıt trendi (zaman bazlı)
Query builder kullan
Cache ekle (Redis)

Test Kriteri: Analytics verisi dönmeli

Adım 4.4: Email Marketing Module
Süre: 1 gün
Yapılacaklar:

EmailCampaigns module oluştur
EmailCampaign entity (name, subject, content, status, scheduledAt, stats)
EmailList entity oluştur
EmailSubscriber entity oluştur
CRUD endpoint'leri
POST /campaigns (create)
GET /campaigns (list)
GET /campaigns/:id (detail)
PATCH /campaigns/:id (update)
DELETE /campaigns/:id (delete)

Test Kriteri: Campaign CRUD çalışmalı

Adım 4.5: Support Tickets Module
Süre: 1 gün
Yapılacaklar:

Tickets module oluştur
SupportTicket entity (ticketNumber, subject, description, status, priority, category)
TicketMessage entity oluştur
CRUD endpoint'leri
POST /tickets (user creates)
GET /tickets (list with filtering)
GET /tickets/:id (detail)
POST /tickets/:id/messages (add message)
PATCH /tickets/:id/assign (admin assigns)
PATCH /tickets/:id/status (update status)

Test Kriteri: Ticket sistemi çalışmalı

Adım 4.6: Certificates Module
Süre: 1 gün
Yapılacaklar:

Certificates module oluştur
Certificate entity (userId, eventId, certificateNumber, issuedAt)
CertificateTemplate entity
POST /certificates/generate (admin)
GET /certificates (user'ın sertifikaları)
GET /certificates/:id (detail)
GET /certificates/:id/download (PDF download)
Sertifika metadata'sı kaydet (PDF S3'te)

Test Kriteri: Sertifika metadata'sı oluşturulmalı

Adım 4.7: Social Media Module
Süre: 1 gün
Yapılacaklar:

SocialPosts module oluştur
SocialPost entity (content, platform, scheduledAt, status, postedAt)
SocialAccount entity (platform, credentials)
CRUD endpoint'leri
POST /social/posts (create)
POST /social/posts/:id/schedule (schedule)
GET /social/posts (list)
DELETE /social/posts/:id (delete)
GET /social/analytics (stats)

Test Kriteri: Social post CRUD çalışmalı

FAZ 5: QUEUE VE WORKER SYSTEM (3-4 Gün)
Adım 5.1: BullMQ Kurulumu
Süre: 3 saat
Yapılacaklar:

@nestjs/bullmq ve bullmq kur
BullModule'u app.module.ts'e ekle
Redis connection ayarla
Queue monitoring için Bull Board kur
/admin/queues endpoint'i oluştur

Test Kriteri: Queue monitoring dashboard açılmalı

Adım 5.2: Email Queue Setup
Süre: 4 saat
Yapılacaklar:

src/modules/email-marketing/processors/email.processor.ts oluştur
Email queue tanımla
Send campaign job processor yaz
Batch email sending logic
Progress tracking
Error handling ve retry logic
Dead letter queue

Test Kriteri: Email queue'ya job eklenip işlenebilmeli

Adım 5.3: Email Sending Service
Süre: 4 saat
Yapılacaklar:

Nodemailer kur
EmailService oluştur
SMTP configuration
Email template rendering
Batch processing (1000'lik gruplar)
Campaign'e job ekle (afterChange hook benzeri)
POST /campaigns/:id/send endpoint'i

Test Kriteri: Test email gönderilebilmeli

Adım 5.4: Email Tracking
Süre: 4 saat
Yapılacaklar:

EmailLog entity oluştur (campaignId, recipientId, sentAt, openedAt, clickedAt)
Tracking pixel endpoint: GET /track/open/:emailId
Link click tracking: GET /track/click/:linkId
PostgreSQL'e event kaydet
Campaign stats güncelle (openedCount, clickedCount)
Real-time stats endpoint: GET /campaigns/:id/stats

Test Kriteri: Email tracking çalışmalı

Adım 5.5: Certificate Generation Worker
Süre: 1 gün
Yapılacaklar:

puppeteer veya pdfkit kur
CertificateProcessor oluştur
PDF template oluştur
Generate job processor yaz
S3'e upload et
Certificate entity'de fileUrl güncelle
POST /certificates/generate endpoint'inden queue'ya ekle

Test Kriteri: PDF oluşturulup S3'e yüklenebilmeli

Adım 5.6: Social Media Scheduler Worker
Süre: 1 gün
Yapılacaklar:

SocialProcessor oluştur
Schedule job processor yaz
Cron ile scheduled post'ları kontrol et
Platform API'lerine post at (Twitter, Facebook)
Post status güncelle (posted)
Analytics kaydet
Error handling

Test Kriteri: Scheduled post gönderilmeli

FAZ 6: FILE UPLOAD VE S3 INTEGRATION (2 Gün)
Adım 6.1: S3 Client Setup
Süre: 3 saat
Yapılacaklar:

@aws-sdk/client-s3 kur
S3Module oluştur
S3Service oluştur (upload, download, delete, getSignedUrl)
MinIO ile test et
config/s3.config.ts ayarla

Test Kriteri: S3'e dosya yüklenebilmeli

Adım 6.2: File Upload Endpoints
Süre: 4 saat
Yapılacaklar:

Multer kur
FileInterceptor kullan
POST /upload endpoint'i (single file)
POST /upload/multiple endpoint'i (multiple files)
File validation (size, type)
Media entity oluştur (filename, url, size, mimeType)
GET /media (list)
DELETE /media/:id

Test Kriteri: Dosya upload edilip S3'e kaydedilebilmeli

Adım 6.3: Image Processing
Süre: 4 saat
Yapılacaklar:

sharp kur
ImageProcessor oluştur
Resize, crop, optimize işlemleri
Thumbnail generation
Multiple size variants (thumbnail, medium, large)
Queue'ya job ekle
S3'e farklı boyutları upload et

Test Kriteri: Resim işleme çalışmalı

FAZ 7: REAL-TIME FEATURES (2-3 Gün)
Adım 7.1: WebSocket Gateway Setup
Süre: 3 saat
Yapılacaklar:

@nestjs/websockets kur
@nestjs/platform-socket.io kur
TicketsGateway oluştur
WebSocket authentication (JWT)
Connection/disconnection handle et
Room/namespace yapısı kur

Test Kriteri: WebSocket bağlantısı kurulmalı

Adım 7.2: Real-time Ticket Updates
Süre: 4 saat
Yapılacaklar:

Yeni ticket oluşunca emit et
Yeni mesaj gelince emit et
Ticket status değişince emit et
User-specific rooms
Admin room (tüm ticket'lar)
Unread count tracking
Client'a event gönder

Test Kriteri: Real-time bildirimler gelmeli

Adım 7.3: Redis Adapter (Multi-instance)
Süre: 3 saat
Yapılacaklar:

socket.io-redis kur
Redis adapter ekle
Horizontal scaling için hazırla
Multiple server instance test et

Test Kriteri: Multi-instance WebSocket çalışmalı

Adım 7.4: Presence System
Süre: 3 saat
Yapılacaklar:

Online/offline tracking
Redis'te active users tut
Heartbeat mechanism
GET /users/online endpoint'i
Admin dashboard için real-time user count

Test Kriteri: Online user sayısı görülebilmeli

FAZ 8: CACHING VE PERFORMANCE (2-3 Gün)
Adım 8.1: Redis Cache Setup
Süre: 3 saat
Yapılacaklar:

@nestjs/cache-manager kur
cache-manager-redis-store kur
CacheModule'u global yap
Cache interceptor oluştur
CacheKey decorator oluştur
TTL ayarları

Test Kriteri: Cache çalışmalı

Adım 8.2: Cache Strategy Implementation
Süre: 4 saat
Yapılacaklar:

Frequently accessed data'yı cache'le
GET /events endpoint'ine cache ekle
GET /campaigns/:id/stats cache'le
Cache invalidation stratejisi
CacheClear decorator oluştur
Update/delete sonrası cache temizle

Test Kriteri: API response time iyileşmeli

Adım 8.3: Database Query Optimization
Süre: 4 saat
Yapılacaklar:

N+1 query problemlerini bul
Eager loading ekle (relations)
Query builder kullan
Index'leri kontrol et
Pagination optimize et
Query logging aç, slow query'leri bul

Test Kriteri: Query sayısı azalmalı

Adım 8.4: Rate Limiting
Süre: 2 saat
Yapılacaklar:

@nestjs/throttler kur
ThrottlerModule ekle
Global rate limit (100 req/min)
Endpoint-specific limit
IP-based limiting
Redis storage kullan

Test Kriteri: Rate limit aşıldığında 429 dönmeli

FAZ 9: TESTING (3-4 Gün)
Adım 9.1: Unit Test Setup
Süre: 2 saat
Yapılacaklar:

Jest config kontrol et
Test utilities oluştur
Mock factory'ler oluştur
İlk unit test yaz (UserService)

Test Kriteri: npm run test çalışmalı

Adım 9.2: Service Tests
Süre: 1 gün
Yapılacaklar:

AuthService test
UsersService test
EventsService test
TicketsService test
Repository'leri mock'la
Edge case'leri test et

Test Kriteri: Service testleri geçmeli

Adım 9.3: Controller Tests
Süre: 1 gün
Yapılacaklar:

Controller test template oluştur
AuthController test
UsersController test
EventsController test
Request/Response mock'la
Guard'ları mock'la

Test Kriteri: Controller testleri geçmeli

Adım 9.4: E2E Tests
Süre: 1 gün
Yapılacaklar:

E2E test setup
Test database oluştur
Auth flow test (register, login, refresh)
Event flow test (create, register, checkin)
Ticket flow test (create, message, close)
Cleanup after tests

Test Kriteri: E2E testler geçmeli

FAZ 10: DOCUMENTATION VE DEPLOYMENT (2-3 Gün)
Adım 10.1: Swagger API Documentation
Süre: 4 saat
Yapılacaklar:

@nestjs/swagger kur
SwaggerModule setup
ApiTags decorator'ları ekle
ApiOperation, ApiResponse ekle
DTO'lara ApiProperty ekle
Authentication ekle (Bearer token)
/api/docs endpoint'i

Test Kriteri: Swagger UI açılmalı ve API test edilebilmeli

Adım 10.2: Health Checks
Süre: 3 saat
Yapılacaklar:

@nestjs/terminus kur
HealthController oluştur
Database health check
Redis health check
Disk health check
Memory health check
GET /health endpoint'i
GET /health/ready (Kubernetes)
GET /health/live (Kubernetes)

Test Kriteri: Health endpoint'leri çalışmalı

Adım 10.3: Logging ve Monitoring
Süre: 4 saat
Yapılacaklar:

Structured logging (JSON format)
Request ID tracking
Error tracking (Sentry optional)
Performance metrics
Prometheus metrics endpoint (optional)
Log levels (error, warn, info, debug)

Test Kriteri: Loglar düzenli formatlanmış olmalı

Adım 10.4: Docker Production Setup
Süre: 4 saat
Yapılacaklar:

Dockerfile oluştur (multi-stage build)
.dockerignore oluştur
docker-compose.prod.yml oluştur
Environment variables production için ayarla
Health check Dockerfile'a ekle
Build ve test et

Test Kriteri: Docker container production modunda çalışmalı

Adım 10.5: CI/CD Pipeline
Süre: 4 saat
Yapılacaklar:

GitHub Actions workflow oluştur (.github/workflows/ci.yml)
Lint check
Test çalıştır
Build check
Docker image build
Optional: Deploy to staging

Test Kriteri: CI pipeline başarıyla çalışmalı

Adım 10.6: README ve Documentation
Süre: 3 saat
Yapılacaklar:

README.md güncelle
Project overview
Installation guide
Environment variables listesi
API endpoints overview
Development guide
Deployment guide
Architecture diagram

Test Kriteri: Yeni developer projeyi kurabilmeli

FAZ 11: SECURITY VE BEST PRACTICES (2 Gün)
Adım 11.1: Security Hardening
Süre: 4 saat
Yapılacaklar:

helmet kur (HTTP headers)
CORS ayarları
XSS protection
SQL injection protection (TypeORM otomatik yapar)
Rate limiting
Input validation (class-validator)
Password policy
Secure session storage

Test Kriteri: Security scan temiz çıkmalı

Adım 11.2: Error Handling
Süre: 3 saat
Yapılacaklar:

Global exception filter
Custom exception classes
Error response standardization
Sensitive data masking
Stack trace production'da gizle
HTTP status codes doğru kullan

Test Kriteri: Hata mesajları standardize olmalı

Adım 11.3: Database Backup Strategy
Süre: 2 saat
Yapılacaklar:

Backup script yaz
Automated daily backup
Backup retention policy
Restore script test et
S3'e backup upload

Test Kriteri: Backup alınıp restore edilebilmeli

Adım 11.4: Performance Testing
Süre: 3 saat
Yapılacaklar:

k6 veya Artillery kur
Load test script'leri yaz
Critical endpoint'leri test et
Bottleneck'leri tespit et
Connection pool size optimize et
Database query performance test

Test Kriteri: Yüksek yük altında sistem stabil olmalı

BONUS: İLERİ SEVİYE ÖZELLIKLER (Optional)
Mikroservis Geçiş Hazırlığı
Süre: 2-3 gün
Yapılacaklar:

@nestjs/microservices kur
Message broker seç (RabbitMQ/Kafka)
Event-driven architecture pattern'i uygula
Module'leri servis olarak ayırma stratejisi
API Gateway pattern


GraphQL API
Süre: 2-3 gün
Yapılacaklar:

@nestjs/graphql kur
GraphQL schema oluştur
Resolver'lar yaz
DataLoader ile N+1 problemini çöz
Subscription'lar ekle (real-time)


Elasticsearch Integration
Süre: 2 gün
Yapılacaklar:

@nestjs/elasticsearch kur
Full-text search implementation
Ticket search
Event search
Analytics queries


İLERLEME TAKİBİ
Her faz sonunda kontrol edilecekler:

Tüm testler geçiyor mu?
API documentation güncel mi?
Security scan temiz mi?
Performance metrikleri kabul edilebilir mi?
Code review yapıldı mı?

KRİTİK NOTLAR

Her modül için önce entity ve DTO'ları yaz
Her endpoint için input validation ekle
Her servis için unit test yaz
Database migration'ları geri alınabilir yap
Sensitive data'yı loglamayın
Error message'larda internal detail vermeyin
Her API endpoint'inde authentication/authorization kontrol et
Database query'lerini optimize et (N+1 problemi)
Cache invalidation stratejisini doğru kur
Production environment variables'ı güvenli sakla

GITHUB COPILOT İPUÇLARI
Her adımda Copilot'a şöyle promptlar verin:

"Create a NestJS controller for events with CRUD operations"
"Write a TypeORM entity for SupportTicket with relations"
"Implement JWT authentication strategy with refresh tokens"
"Create a BullMQ processor for email sending with retry logic"
"Write unit tests for UserService with mocked repository"
"Generate Swagger documentation for EventsController"
"Implement role-based access control guard"
"Create a WebSocket gateway for real-time notifications"
"Write a database migration for adding indexes"
"Implement Redis caching with invalidation strategy"

HELPFUL COMMANDS
bash# Module oluşturma
nest g module modules/events
nest g service modules/events
nest g controller modules/events

# Test çalıştırma
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e

# Migration
npm run typeorm:migration:generate -- -n AddUsersTable
npm run typeorm:migration:run
npm run typeorm:migration:revert

# Build ve başlatma
npm run build
npm run start:prod
npm run start:dev

# Lint ve format
npm run lint
npm run format
BAŞARI KRİTERLERİ
Projeniz tamamlandığında:

Tüm modüller çalışıyor olmalı
Test coverage minimum %70 olmalı
API documentation eksiksiz olmalı
Security scan temiz geçmeli
Load test başarılı olmalı
Docker container production-ready olmalı
CI/CD pipeline çalışıyor olmalı
README comprehensive olmalı