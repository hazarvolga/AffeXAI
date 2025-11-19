/**
 * Blog Post Grid Block Component
 *
 * Grid layout for blog posts/articles with images and metadata.
 * Supports 2-3 columns responsive layout.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, Clock, User } from 'lucide-react';

export interface BlogPost {
  title: string;
  excerpt: string;
  imageUrl?: string;
  category: string;
  author: string;
  date: string;
  readTime?: string;
  url: string;
}

export interface BlogPostGridProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  columns?: 2 | 3;
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const BlogPostGrid: React.FC<BlogPostGridProps> = ({
  title,
  subtitle,
  posts = [
    {
      title: 'Getting Started with Modern Web Development',
      excerpt: 'Learn the fundamentals of modern web development with this comprehensive guide.',
      imageUrl: 'https://picsum.photos/seed/blog1/800/600',
      category: 'Web Development',
      author: 'John Doe',
      date: '2024-01-15',
      readTime: '5 min',
      url: '/blog/getting-started',
    },
  ],
  columns = 3,
  backgroundColor = 'transparent',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const gridColsClass = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-background', cssClasses)}
      style={{ backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined, paddingTop, paddingBottom }}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        <div className={cn('grid gap-8', gridColsClass)}>
          {posts.map((post, index) => (
            <Link key={index} href={post.url} className="group">
              <article className="overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all h-full flex flex-col">
                {post.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <Badge variant="secondary" className="w-fit mb-3">{post.category}</Badge>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    {post.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
