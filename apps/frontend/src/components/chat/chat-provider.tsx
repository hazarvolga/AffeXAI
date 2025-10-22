'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
// import { ChatBox } from './chat-box';
import { ChatToggle } from './chat-toggle';
import { useAuth } from '@/lib/auth/auth-context';

interface ChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  hasUnreadMessages: boolean;
  setHasUnreadMessages: (value: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

interface ChatProviderProps {
  children: React.ReactNode;
  enableChat?: boolean; // Allow disabling chat globally
}

export function ChatProvider({ children, enableChat = true }: ChatProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Check if chat is enabled for current user
  const isChatEnabled = enableChat && isAuthenticated && checkChatPermissions(user);

  function checkChatPermissions(user: any): boolean {
    if (!user) return false;
    
    // Add role-based chat permissions here
    // For now, enable for all authenticated users
    // Later: check user roles, subscription, etc.
    return true;
  }

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasUnreadMessages(false);
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setHasUnreadMessages(false);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  // Close chat when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setIsOpen(false);
    }
  }, [isAuthenticated]);

  const contextValue: ChatContextType = {
    isOpen,
    toggleChat,
    openChat,
    closeChat,
    hasUnreadMessages,
    setHasUnreadMessages,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
      {isChatEnabled && (
        <>
          <ChatToggle
            isOpen={isOpen}
            onClick={toggleChat}
            hasUnreadMessages={hasUnreadMessages}
          />
          {/* <ChatBox
            isOpen={isOpen}
            onToggle={toggleChat}
          /> */}
        </>
      )}
    </ChatContext.Provider>
  );
}