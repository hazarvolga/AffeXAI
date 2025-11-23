# CMS Architecture Overview

## Overview
The Aluplan CMS is a component-based content management system built with modern web technologies. It provides a flexible and scalable solution for managing website content through a visual editor interface.

## Architecture Layers

### 1. Database Layer
The database layer uses PostgreSQL with TypeORM for object-relational mapping.

**Entities:**
- **Page**: Represents a content page with metadata and status
- **Component**: Represents individual content components that make up pages

**Relationships:**
- One-to-Many: Page → Components
- Self-referencing: Component → Child Components (for nested structures)

**Status Management:**
- Draft: Content in progress
- Published: Live content
- Archived: Inactive but preserved content

### 2. Backend Layer (NestJS)
The backend is built with NestJS, providing a robust API for CMS operations.

**Modules:**
- **CmsModule**: Main module organizing all CMS functionality
- **Entities**: Data models for pages and components
- **DTOs**: Data transfer objects for API requests
- **Services**: Business logic implementation
- **Controllers**: RESTful API endpoints

**Key Features:**
- CRUD operations for pages and components
- Page publishing workflow
- Component hierarchy management
- Database migrations

### 3. Frontend Layer (Next.js)
The frontend is built with Next.js, providing both public-facing pages and admin interfaces.

**Component Library:**
- TextComponent: Headings, paragraphs, captions
- ButtonComponent: Action buttons with various styles
- ImageComponent: Images with captions and styling
- ContainerComponent: Layout containers with padding/margin
- CardComponent: Content cards with consistent styling
- GridComponent: Responsive grid layouts

**Editor Components:**
- ComponentLibrary: Palette of available components
- EditorCanvas: Visual canvas for building pages
- PropertiesPanel: Context-sensitive property editor
- VisualEditor: Main editor interface

**Pages:**
- Public CMS pages (dynamic routing)
- Admin dashboard
- Visual editor interface

### 4. Service Layer
- **Backend Services**: PageService, ComponentService for business logic
- **Frontend Service**: CmsService for API communication

## Data Flow

### Content Creation
1. User creates page in admin dashboard
2. User opens visual editor for the page
3. User drags components from library to canvas
4. User configures component properties
5. Changes are saved to backend API
6. Components are stored in database with hierarchical relationships

### Content Delivery
1. Visitor requests CMS page by slug
2. Next.js API route fetches page data from backend
3. Page data includes all components with their properties
4. CMS Page Renderer component builds page dynamically
5. Page is served to visitor

## Component Hierarchy
Components support nested structures:
```
Page
├── Container
│   ├── Text (Heading)
│   ├── Grid
│   │   ├── Card
│   │   │   ├── Text (Title)
│   │   │   └── Text (Body)
│   │   └── Card
│   │       ├── Image
│   │       └── Button
│   └── Container
│       └── Text (Footer)
└── Text (Copyright)
```

## API Endpoints

### Pages
```
GET    /cms/pages           # List all pages
POST   /cms/pages           # Create new page
GET    /cms/pages/:id       # Get page by ID
GET    /cms/pages/slug/:slug # Get page by slug
PATCH  /cms/pages/:id       # Update page
DELETE /cms/pages/:id       # Delete page
POST   /cms/pages/:id/publish # Publish page
POST   /cms/pages/:id/unpublish # Unpublish page
```

### Components
```
GET    /cms/components      # List components
POST   /cms/components      # Create new component
GET    /cms/components/:id  # Get component by ID
PATCH  /cms/components/:id  # Update component
DELETE /cms/components/:id  # Delete component
POST   /cms/components/reorder # Reorder components
```

## Security Considerations
- API endpoints should be protected with authentication
- Role-based access control for content management
- Input validation for all API requests
- SQL injection protection through TypeORM
- XSS protection through React component rendering

## Performance Optimization
- Database indexing for frequent queries
- Component caching strategies
- Image optimization for media content
- Server-side rendering for public pages
- Lazy loading for editor components

## Extensibility
The CMS architecture is designed for easy extension:
- New component types can be added without schema changes
- Plugin system for additional functionality
- Custom property editors for specialized components
- Theme system for styling variations

## Integration Points
- **Site Settings**: Reuse existing site configuration
- **Media Management**: Integrate with existing media service
- **Email System**: Reference CMS pages in email templates
- **Authentication**: Connect with existing user system

## Deployment
- Database migrations for schema updates
- Environment-specific configuration
- CI/CD pipeline for automated deployment
- Backup and recovery procedures