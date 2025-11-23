# Changelog

All notable changes to the Aluplan Email Marketing System will be documented in this file.

## [1.0.0] - 2025-10-06

### Added
- Complete email marketing system with groups, segments, campaigns, and subscribers
- Dynamic site settings with real-time backend fetching
- Media management system with file upload capabilities
- Comprehensive email template management interface
- Email validation and IP reputation checking
- Theme-based logo switching (light/dark mode)
- Navigation bar on template preview page
- Real data implementation for events dashboard

### Changed
- Increased header logo size for better visibility (200x60 pixels)
- Improved header layout with better spacing and padding
- Enhanced site settings management with database persistence
- Fixed logo persistence issue by properly saving to backend database
- Resolved port conflicts and API connectivity issues
- Improved process management with automatic port cleanup

### Fixed
- CORS configuration to enable proper frontend-backend communication
- Logo selection issue in admin settings panel
- Type compatibility issues between frontend and backend
- DNSBL query logic for IP reputation checking
- Route ordering issues in SubscriberController
- File upload and media management issues

### Security
- Implemented file type validation for uploads
- Added size limits for media files
- Enhanced CORS configuration
- Improved error handling and logging

## [0.9.0] - 2025-10-05

### Added
- Initial email marketing module implementation
- Basic site settings configuration
- Simple media handling with placeholder URLs
- Email template management with preview functionality

### Changed
- Improved dashboard with real data from backend API
- Enhanced frontend-backend communication
- Better error handling and loading states

## Key Features Implemented

### Email Marketing System
- **Groups Management**: Create, edit, and manage subscriber groups
- **Segments Management**: Define and manage subscriber segments with custom criteria
- **Campaigns Management**: Create and send email campaigns
- **Subscribers Management**: Add, edit, and manage newsletter subscribers
- **Template Management**: Create and manage email templates

### Media Management System
- **File Upload**: Drag-and-drop file upload functionality
- **Media Library**: Browse and manage uploaded media files
- **Image Preview**: Preview images with metadata display
- **Media Picker**: Component for selecting media in forms

### Site Settings Integration
- **Dynamic Configuration**: Real-time site settings from backend
- **Theme Support**: Light/dark mode logo switching
- **Company Information**: Dynamic company data in templates
- **Contact Information**: Manage contact details

### Email Validation
- **Real-time Validation**: Email validation during subscriber creation
- **IP Reputation**: Check IP reputation for deliverability
- **Validation Dashboard**: Monitor email validation results

### Template Management
- **Template Editor**: Create and edit email templates
- **Template Preview**: Preview templates with real data
- **Site Integration**: Dynamic site settings in templates
- **Navigation**: Easy navigation between templates

## Technical Improvements

### Backend (NestJS)
- Proper CORS configuration for frontend-backend communication
- Enhanced database operations with TypeORM
- Improved API endpoint structure
- Better error handling and logging
- File upload and management system

### Frontend (Next.js)
- Dynamic data fetching from backend APIs
- Improved component structure and reusability
- Better state management with React hooks
- Enhanced user interface with Tailwind CSS
- Responsive design for all device sizes

### Development Workflow
- Automated port management to prevent conflicts
- Improved development scripts
- Better project organization
- Comprehensive documentation