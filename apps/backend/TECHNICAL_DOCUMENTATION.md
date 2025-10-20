# Aluplan Email Marketing System - Technical Documentation

## System Architecture

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **API**: RESTful API endpoints
- **Authentication**: JWT-based authentication
- **File Storage**: Local disk storage for media files
- **Validation**: Class-validator for input validation
- **Security**: Helmet, CORS, and rate limiting

### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks and context
- **API Communication**: Axios-based HTTP client
- **UI Components**: Custom component library

## Key Features Implementation

### 1. Dynamic Site Settings System

#### Backend Implementation
- **Controller**: `SettingsController` with endpoints for site settings
- **Service**: `SettingsService` for database operations
- **Entity**: `Setting` entity for storing configuration
- **DTOs**: `SiteSettingsDto` for data transfer

#### Frontend Implementation
- **Service**: `settingsService` for API communication
- **Hooks**: Custom hooks for fetching and updating settings
- **Components**: Dynamic header and footer with theme-based logos

#### Key Files
```
backend/
├── src/modules/settings/
│   ├── settings.controller.ts
│   ├── settings.service.ts
│   ├── entities/setting.entity.ts
│   └── dto/site-settings.dto.ts
src/
├── lib/api/settingsService.ts
├── lib/site-settings-data.ts
├── components/layout/header.tsx
└── components/layout/footer.tsx
```

### 2. Media Management System

#### Backend Implementation
- **Controller**: `MediaController` with upload and management endpoints
- **Service**: `MediaService` for file operations
- **Entity**: `Media` entity for storing file metadata
- **Storage**: Multer with disk storage

#### Frontend Implementation
- **Components**: `MediaPicker`, `MediaLibrary`
- **Service**: `mediaService` for API communication
- **Hooks**: `useMedia` for file operations

#### Key Files
```
backend/
├── src/modules/media/
│   ├── media.controller.ts
│   ├── media.service.ts
│   └── entities/media.entity.ts
src/
├── components/media/
│   ├── MediaPicker.tsx
│   └── MediaLibrary.tsx
├── lib/api/mediaService.ts
└── lib/hooks/useMedia.ts
```

### 3. Email Template Management

#### Backend Implementation
- **Controller**: Email template endpoints
- **Service**: Template management logic
- **Database**: File-based and database templates

#### Frontend Implementation
- **Pages**: Template listing, creation, editing, and preview
- **Components**: Template editor and preview components
- **Service**: `templatesService` for API communication

#### Key Files
```
src/
├── app/admin/newsletter/templates/
│   ├── page.tsx
│   ├── [templateId]/
│   │   ├── edit/page.tsx
│   │   └── preview/page.tsx
├── lib/api/templatesService.ts
└── emails/
    ├── welcome.tsx
    └── (other template files)
```

### 4. Email Validation System

#### Backend Implementation
- **Services**: `EmailValidationService`, `IpReputationService`
- **Endpoints**: Validation API endpoints
- **Integration**: Automatic validation on subscriber creation

#### Frontend Implementation
- **Pages**: Validation dashboard
- **Components**: Validation result displays
- **Service**: `emailValidationService` for API communication

#### Key Files
```
backend/
├── src/modules/email-validation/
│   ├── email-validation.service.ts
│   └── ip-reputation.service.ts
src/
├── app/admin/newsletter/validation/page.tsx
├── lib/api/emailValidationService.ts
└── lib/api/ipReputationService.ts
```

## API Endpoints

### Settings
```
GET    /api/settings/site     - Get site settings
PUT    /api/settings/site     - Update site settings
```

### Media
```
GET    /api/media             - List all media
POST   /api/media/upload      - Upload new media
GET    /api/media/:id         - Get media by ID
PATCH  /api/media/:id         - Update media
DELETE /api/media/:id         - Delete media
```

### Email Templates
```
GET    /api/templates         - List all templates
POST   /api/templates         - Create new template
GET    /api/templates/:id     - Get template by ID
PUT    /api/templates/:id     - Update template
DELETE /api/templates/:id     - Delete template
```

## Configuration Files

### Environment Variables
```
PORT=9005
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=aluplan
DATABASE_USER=postgres
DATABASE_PASSWORD=password
```

### Next.js Configuration
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9005',
        pathname: '/uploads/**',
      },
      // ... other patterns
    ],
  },
};
```

## Deployment Considerations

### Production Setup
1. **Database**: Use production PostgreSQL instance
2. **File Storage**: Consider cloud storage (AWS S3, Google Cloud Storage)
3. **Security**: Enable HTTPS, configure proper CORS policies
4. **Performance**: Implement caching, use CDN for static assets
5. **Monitoring**: Add logging and error tracking

### Scaling Recommendations
1. **Database**: Use connection pooling, read replicas
2. **API**: Implement rate limiting, caching strategies
3. **Frontend**: Use static generation where possible
4. **Media**: Use cloud storage with CDN distribution

## Testing Strategy

### Unit Testing
- Backend services and controllers
- Frontend components and hooks
- API integration tests

### End-to-End Testing
- User flows for email marketing
- Media upload and management
- Site settings configuration

### Performance Testing
- API response times
- File upload performance
- Database query optimization

## Security Best Practices

### Authentication
- JWT token management
- Role-based access control
- Secure password handling

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### File Security
- File type validation
- Size limitations
- Virus scanning (if possible)

## Troubleshooting Guide

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend API endpoints
   - Ensure proper origin whitelisting

2. **File Upload Issues**
   - Check file size limits
   - Verify file type restrictions
   - Confirm upload directory permissions

3. **API Connectivity**
   - Verify port availability
   - Check network connectivity
   - Review firewall settings

### Debugging Tools
- Browser developer tools
- Backend logging
- Database query monitoring
- Network traffic analysis

## Future Enhancements

### Planned Features
1. **Advanced Analytics**: Detailed campaign performance metrics
2. **A/B Testing**: Template and subject line testing
3. **Automation**: Workflow automation for campaigns
4. **Integrations**: Third-party service integrations
5. **Mobile App**: Dedicated mobile application

### Technical Improvements
1. **Caching**: Implement Redis for improved performance
2. **Microservices**: Split monolith into microservices
3. **Real-time**: WebSocket integration for live updates
4. **AI Features**: AI-powered content suggestions