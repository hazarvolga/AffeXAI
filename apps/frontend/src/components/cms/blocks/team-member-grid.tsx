/**
 * Team Member Grid Block Component
 *
 * Grid layout for team members with photos and social links.
 * Supports 2-4 columns responsive layout.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface TeamMemberGridProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const TeamMemberGrid: React.FC<TeamMemberGridProps> = ({
  title,
  subtitle,
  members = [
    {
      name: 'Jane Doe',
      role: 'CEO & Founder',
      bio: 'Passionate about building great products',
      imageUrl: 'https://i.pravatar.cc/400?img=1',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'jane@example.com',
    },
  ],
  columns = 3,
  backgroundColor = 'transparent',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

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
          {members.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-secondary/10">
                {member.imageUrl && (
                  <Image src={member.imageUrl} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              {member.bio && <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>}
              <div className="flex justify-center gap-3">
                {member.linkedin && (
                  <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
                {member.twitter && (
                  <Link href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {member.email && (
                  <Link href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
