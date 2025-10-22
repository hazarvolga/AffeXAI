'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnreadMessages?: boolean;
  className?: string;
}

export function ChatToggle({ 
  isOpen, 
  onClick, 
  hasUnreadMessages = false, 
  className 
}: ChatToggleProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        // Positioning & sizing
        'fixed bottom-4 right-4 h-14 w-14 z-40',
        // Modern styling with design tokens
        'bg-gradient-to-br from-blue-500 to-purple-600',
        'hover:from-blue-600 hover:to-purple-700',
        'border-0 rounded-2xl shadow-2xl shadow-blue-500/25',
        // Smooth animations
        'transition-all duration-300 ease-out transform-gpu',
        'hover:scale-110 hover:shadow-3xl hover:shadow-blue-500/30',
        'active:scale-95',
        // Position adjustment when open
        isOpen && 'bottom-[680px] sm:bottom-[730px]',
        className
      )}
      size="lg"
    >
      <div className="relative flex items-center justify-center">
        {isOpen ? (
          <X className="h-6 w-6 text-white transition-transform duration-200" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white transition-transform duration-200" />
            {hasUnreadMessages && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </>
        )}
      </div>
    </Button>
  );
}