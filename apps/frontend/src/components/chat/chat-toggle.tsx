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
        'fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl z-40 transition-all duration-300',
        'hover:scale-110 active:scale-95',
        isOpen && 'bottom-[520px]', // Move up when chat is open
        className
      )}
      size="lg"
    >
      <div className="relative">
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {hasUnreadMessages && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </>
        )}
      </div>
    </Button>
  );
}