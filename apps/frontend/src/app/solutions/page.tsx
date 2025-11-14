import { Metadata } from 'next';
import { CmsPageService } from '@/services/cms-page.service';
import { PageRenderer } from '@/components/cms/page-renderer';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Generate metadata for Solutions page SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const cmsPage = await CmsPageService.getPageBySlug('solutions');

    if (!cmsPage) {
      return {
        title: 'Solutions - Affexai',
        description: 'Discover our comprehensive AEC solutions for your projects',
      };
    }

    return {
      title: cmsPage.metaTitle || cmsPage.title || 'Solutions - Affexai',
      description: cmsPage.metaDescription || 'Discover our comprehensive AEC solutions for your projects',
    };
  } catch (error) {
    return {
      title: 'Solutions - Affexai',
      description: 'Discover our comprehensive AEC solutions for your projects',
    };
  }
}

export default async function SolutionsPage() {
  try {
    // Fetch solutions page from CMS (slug: 'solutions')
    const cmsPage = await CmsPageService.getPageBySlug('solutions');

    // Render page with header and footer always visible
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {cmsPage && cmsPage.components && cmsPage.components.length > 0 ? (
            // Render CMS content
            <PageRenderer components={cmsPage.components} />
          ) : (
            // Fallback: No CMS content available
            <div className="container mx-auto px-4 py-20">
              <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold mb-4">
                    Solutions Page Content Pending
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    The CMS content for the Solutions page hasn't been added yet. Please add content through the CMS editor.
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/admin/cms/pages">
                      Go to CMS Pages
                    </Link>
                  </Button>
                  {cmsPage && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={`/admin/cms/editor?pageId=${cmsPage.id}`}>
                        Edit Solutions Page
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading solutions page:', error);

    // Fallback: Error occurred
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                <svg
                  className="w-8 h-8 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Solutions Page Could Not Be Loaded
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                An error occurred while loading the CMS content. Please try again later or contact your administrator.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/admin/cms/pages">
                    Go to CMS Panel
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
