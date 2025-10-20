'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlockRenderer } from '@/components/cms/editor/block-renderer';
import { EditorProvider } from '@/components/cms/editor/editor-context';
import { PreviewProvider } from '@/components/cms/preview-context';
import { Skeleton } from '@/components/loading/skeleton';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { BreadcrumbSchema } from '@/components/layout/breadcrumb-schema';
import { cmsService } from '@/lib/cms/cms-service';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EditorComponent {
  id: string;
  type: string;
  props: any;
  parentId?: string | null;
  orderIndex?: number;
  children?: EditorComponent[];
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: string;
  layoutOptions?: {
    showHeader?: boolean;
    showFooter?: boolean;
    fullWidth?: boolean;
  };
  components: EditorComponent[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export default function PublicPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch page by slug using dedicated API endpoint
        const page = await cmsService.getPageBySlug(slug);

        if (!page) {
          setError('Page not found');
          return;
        }

        // If page has no components loaded, fetch them separately
        if (!page.components || page.components.length === 0) {
          const components = await cmsService.getComponents(page.id);
          page.components = components as any;
        }

        // Transform components: if type is 'block', restore blockId from props as type
        const transformedComponents = page.components.map((comp: any) => ({
          ...comp,
          type: comp.type === 'block' && comp.props?.blockId ? comp.props.blockId : comp.type,
        }));

        setPageData({
          ...page,
          components: transformedComponents,
        });
      } catch (err) {
        console.error('Error loading page:', err);
        setError('Failed to load page. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPage();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-96 w-full max-w-4xl mx-auto" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">
            {error || 'Page Not Found'}
          </h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get layout options
  const showHeader = pageData.layoutOptions?.showHeader !== false; // default true
  const showFooter = pageData.layoutOptions?.showFooter !== false; // default true
  const isFullWidth = pageData.layoutOptions?.fullWidth || false;

  // Sort components by orderIndex
  const sortedComponents = [...pageData.components].sort((a, b) => {
    const orderA = a.orderIndex ?? 0;
    const orderB = b.orderIndex ?? 0;
    return orderA - orderB;
  });

  return (
    <PreviewProvider initialMode="public">
      <div className="min-h-screen bg-background">
        {/* Optional Header */}
        {showHeader && <Header />}
        
        {/* Breadcrumb with custom label for CMS page */}
        {showHeader && (
          <>
            <Breadcrumb 
              items={[
                { label: 'Anasayfa', href: '/' },
                { label: 'Sayfalar', href: '/pages' },
                { label: pageData.title, href: `/pages/${pageData.slug}`, isCurrentPage: true },
              ]}
              variant="minimal"
              showHomeIcon={true}
            />
            {/* SEO Schema.org markup for Google Rich Results */}
            <BreadcrumbSchema
              items={[
                { label: 'Anasayfa', href: '/' },
                { label: 'Sayfalar', href: '/pages' },
                { label: pageData.title, href: `/pages/${pageData.slug}`, isCurrentPage: true },
              ]}
            />
          </>
        )}

        {/* Page Content */}
        <main className={`${isFullWidth ? 'w-full' : 'container mx-auto px-4'} border-l border-r border-border/30`}>
          <EditorProvider onComponentUpdate={() => {}}>
            <div className="py-8 space-y-4">
              {sortedComponents.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    This page has no content yet.
                  </p>
                </div>
              ) : (
                sortedComponents.map((component) => (
                  <div key={component.id} className="w-full">
                    <BlockRenderer
                      blockId={component.type}
                      props={component.props}
                    />
                  </div>
                ))
              )}
            </div>
          </EditorProvider>
        </main>

        {/* Optional Footer */}
        {showFooter && <Footer />}
      </div>
    </PreviewProvider>
  );
}