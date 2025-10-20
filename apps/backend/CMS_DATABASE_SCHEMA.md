# CMS Database Schema Design

## Overview
This document outlines the proposed database schema for the Aluplan CMS system. The schema is designed to support flexible page creation and management with a component-based architecture.

## Core Tables

### Pages Table
```sql
CREATE TABLE cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);
```

### Components Table
```sql
CREATE TABLE cms_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES cms_components(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- text, button, image, container, etc.
  props JSONB NOT NULL, -- Component-specific properties
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Media Table (extending existing media system)
```sql
CREATE TABLE cms_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id VARCHAR(255) UNIQUE NOT NULL, -- References existing media system
  alt_text VARCHAR(255),
  caption TEXT,
  tags TEXT[], -- For categorization
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Relationships

1. **Pages to Components**: One-to-many relationship. Each page can have multiple components.
2. **Components to Components**: Self-referential relationship for nested components (e.g., containers containing other components).
3. **Components to Media**: Components can reference media items through the file_id.

## Indexes

```sql
-- For fast page lookups by slug
CREATE INDEX idx_cms_pages_slug ON cms_pages(slug);

-- For component ordering within pages
CREATE INDEX idx_cms_components_page_order ON cms_components(page_id, order_index);

-- For nested component lookups
CREATE INDEX idx_cms_components_parent ON cms_components(parent_id);

-- For media lookups
CREATE INDEX idx_cms_media_file_id ON cms_media(file_id);
```

## Sample Queries

### Get a page with all its components
```sql
SELECT p.*, 
       json_agg(
         json_build_object(
           'id', c.id,
           'type', c.type,
           'props', c.props,
           'order_index', c.order_index,
           'children', (
             SELECT json_agg(
               json_build_object(
                 'id', cc.id,
                 'type', cc.type,
                 'props', cc.props,
                 'order_index', cc.order_index
               ) ORDER BY cc.order_index
             )
             FROM cms_components cc
             WHERE cc.parent_id = c.id
           )
         ) ORDER BY c.order_index
       ) AS components
FROM cms_pages p
LEFT JOIN cms_components c ON p.id = c.page_id AND c.parent_id IS NULL
WHERE p.slug = $1 AND p.status = 'published'
GROUP BY p.id;
```

### Create a new page
```sql
INSERT INTO cms_pages (title, slug, description, status, created_by)
VALUES ($1, $2, $3, $4, $5)
RETURNING id;
```

### Add a component to a page
```sql
INSERT INTO cms_components (page_id, parent_id, type, props, order_index)
VALUES ($1, $2, $3, $4, $5)
RETURNING id;
```

## Extensibility

The schema is designed to be extensible:
1. New component types can be added without schema changes (using the `type` field)
2. Component properties are stored as JSONB, allowing flexible data structures
3. Media integration uses references to the existing media system
4. User tracking is included for audit purposes

## Performance Considerations

1. Indexes on frequently queried fields
2. JSONB for flexible component properties
3. CASCADE deletes for clean data management
4. Efficient querying through pre-aggregated component structures