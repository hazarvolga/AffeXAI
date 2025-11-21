import { notFound } from 'next/navigation';
import { cmsService } from '@/lib/cms/cms-service';
import { PageRenderer } from '@/components/cms/page-renderer';

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default async function DynamicCMSPage({ params }: PageProps) {
  // Build slug from params (e.g., ['solutions', 'building-design', 'architecture'] → 'solutions/building-design/architecture')
  const slug = params.slug ? params.slug.join('/') : 'home';

  // Ignore Next.js internal routes and static files
  if (
    slug.includes('_next') ||
    slug.includes('.') || // Files with extensions (.js, .map, .css, etc.)
    slug.startsWith('api/') ||
    slug.startsWith('admin/') ||
    slug.startsWith('portal/')
  ) {
    notFound();
  }

  try {
    // Fetch page from CMS by slug
    const page = await cmsService.getPageBySlug(slug);

    if (!page || page.status !== 'published') {
      notFound();
    }

    // Render page with components
    return <PageRenderer components={page.components || []} />;
  } catch (error) {
    console.error('Error fetching CMS page:', error);
    notFound();
  }
}

// Generate static params for known pages (optional, for build-time optimization)
export async function generateStaticParams() {
  try {
    const pages = await cmsService.getPages('published');

    return pages.map((page) => ({
      slug: page.slug.split('/'),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const slug = params.slug ? params.slug.join('/') : 'home';

  try {
    const page = await cmsService.getPageBySlug(slug, false);

    if (!page) {
      return {
        title: 'Page Not Found',
      };
    }

    return {
      title: page.title,
      description: page.description || '',
      openGraph: {
        title: page.title,
        description: page.description || '',
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Page Not Found',
    };
  }
}
