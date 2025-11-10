import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CmsPageService } from '@/services/cms-page.service';
import { PageRenderer } from '@/components/cms/page-renderer';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const page = await CmsPageService.getPageBySlug(params.slug);

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || `${page.title} - Affexai`,
    };
  } catch (error) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
}

export default async function CmsPage({ params }: PageProps) {
  try {
    const page = await CmsPageService.getPageBySlug(params.slug);

    // Check if page is published
    if (page.status !== 'published') {
      notFound();
    }

    return (
      <div className="min-h-screen">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {page.title}
            </h1>
          </div>
        </div>

        {/* Page Content - Render CMS blocks */}
        <div className="container mx-auto px-4 py-12">
          {page.content && page.content.components ? (
            <PageRenderer components={page.content.components} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No content available for this page.</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading CMS page:', error);
    notFound();
  }
}
