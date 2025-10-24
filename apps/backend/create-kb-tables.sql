-- Create knowledge_base_categories table
CREATE TABLE IF NOT EXISTS knowledge_base_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    color VARCHAR(50) DEFAULT 'blue',
    icon VARCHAR(50) DEFAULT 'folder',
    "sortOrder" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "parentId" UUID,
    "articleCount" INTEGER DEFAULT 0,
    "createdBy" UUID NOT NULL,
    "updatedBy" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    
    -- Foreign key constraints
    CONSTRAINT fk_kb_categories_parent FOREIGN KEY ("parentId") REFERENCES knowledge_base_categories(id) ON DELETE SET NULL,
    CONSTRAINT fk_kb_categories_created_by FOREIGN KEY ("createdBy") REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_kb_categories_updated_by FOREIGN KEY ("updatedBy") REFERENCES users(id) ON DELETE RESTRICT
);

-- Create knowledge_base_articles table
CREATE TABLE IF NOT EXISTS knowledge_base_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    slug VARCHAR(500) UNIQUE NOT NULL,
    "categoryId" UUID,
    "authorId" UUID NOT NULL,
    tags TEXT,
    "isPublished" BOOLEAN DEFAULT false,
    "isFeatured" BOOLEAN DEFAULT false,
    "viewCount" INTEGER DEFAULT 0,
    "helpfulCount" INTEGER DEFAULT 0,
    "notHelpfulCount" INTEGER DEFAULT 0,
    "searchScore" INTEGER DEFAULT 0,
    "relatedArticleIds" TEXT,
    metadata JSONB,
    status VARCHAR(50) DEFAULT 'draft',
    "publishedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraints
    CONSTRAINT fk_kb_articles_category FOREIGN KEY ("categoryId") REFERENCES knowledge_base_categories(id) ON DELETE SET NULL,
    CONSTRAINT fk_kb_articles_author FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE RESTRICT
);

-- Create indexes for knowledge_base_categories
CREATE INDEX IF NOT EXISTS idx_kb_categories_slug ON knowledge_base_categories(slug);
CREATE INDEX IF NOT EXISTS idx_kb_categories_parent ON knowledge_base_categories("parentId");
CREATE INDEX IF NOT EXISTS idx_kb_categories_active ON knowledge_base_categories("isActive");
CREATE INDEX IF NOT EXISTS idx_kb_categories_sort ON knowledge_base_categories("sortOrder");
CREATE INDEX IF NOT EXISTS idx_kb_categories_created_at ON knowledge_base_categories("createdAt");
CREATE INDEX IF NOT EXISTS idx_kb_categories_parent_sort_active ON knowledge_base_categories("parentId", "sortOrder", "isActive");

-- Create indexes for knowledge_base_articles
CREATE INDEX IF NOT EXISTS idx_kb_articles_slug ON knowledge_base_articles(slug);
CREATE INDEX IF NOT EXISTS idx_kb_articles_category ON knowledge_base_articles("categoryId");
CREATE INDEX IF NOT EXISTS idx_kb_articles_author ON knowledge_base_articles("authorId");
CREATE INDEX IF NOT EXISTS idx_kb_articles_published ON knowledge_base_articles("isPublished");
CREATE INDEX IF NOT EXISTS idx_kb_articles_status ON knowledge_base_articles(status);
CREATE INDEX IF NOT EXISTS idx_kb_articles_created_at ON knowledge_base_articles("createdAt");
CREATE INDEX IF NOT EXISTS idx_kb_articles_published_at ON knowledge_base_articles("publishedAt");
CREATE INDEX IF NOT EXISTS idx_kb_articles_category_published ON knowledge_base_articles("categoryId", "isPublished", "publishedAt");

-- Create full-text search index for articles
CREATE INDEX IF NOT EXISTS idx_kb_articles_search 
ON knowledge_base_articles 
USING gin(to_tsvector('english', title || ' ' || content));

-- Insert migration record to track this change
INSERT INTO migrations (timestamp, name) 
VALUES (1761134726000, 'CreateKnowledgeBaseCategoriesTable1761134726000'),
       (1761134727000, 'CreateKnowledgeBaseArticlesTable1761134727000')
ON CONFLICT (timestamp) DO NOTHING;