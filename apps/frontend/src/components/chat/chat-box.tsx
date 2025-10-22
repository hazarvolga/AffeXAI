'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  X,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  Loader2,
  AlertCircle,
  Sparkles,
  MessageCircle,
  Minimize2,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatService, ChatMessage, ChatResponse } from '@/lib/api/chatService';
import { toast } from 'sonner';

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function ChatBox({ isOpen, onClose, className }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isAiAvailable, setIsAiAvailable] = useState(true);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load suggested questions on mount
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadSuggestedQuestions();
    }
  }, [isOpen]);

  const loadSuggestedQuestions = async () => {
    try {
      const response = await chatService.getSuggestedQuestions({
        currentPage: window.location.pathname
      });
      // Backend returns { success: true, suggestions: string[] }
      const suggestions = response?.suggestions || [];
      setSuggestedQuestions(suggestions.slice(0, 3)); // Show max 3 suggestions
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setSuggestedQuestions([]); // Clear suggestions after first message

    try {
      console.log('🤖 ChatBox: Sending message to chatService:', {
        message: messageText.trim(),
        sessionId: sessionId || undefined,
        context: {
          currentPage: window.location.pathname,
          userAgent: navigator.userAgent,
        }
      });

      const response: ChatResponse = await chatService.sendMessage({
        message: messageText.trim(),
        sessionId: sessionId || undefined,
        context: {
          currentPage: window.location.pathname,
          userAgent: navigator.userAgent,
        }
      });

      console.log('🤖 ChatBox: Received response:', response);

      // Response is already unwrapped by postWrapped
      if (response && response.content) {
        const botMessage: ChatMessage = {
          id: response.messageId,
          content: response.content,
          isBot: true,
          timestamp: new Date(),
          metadata: {
            confidence: response.confidence,
            sources: response.sources,
            suggestedActions: response.suggestedActions,
          },
        };

        setMessages(prev => [...prev, botMessage]);
        setSessionId(response.sessionId);
        setIsAiAvailable(true); // AI is working if we get a response
      } else {
        // Handle error response
        const errorMessage: ChatMessage = {
          id: Date.now().toString(),
          content: 'Üzgünüm, şu anda bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.',
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsAiAvailable(false);
      }
    } catch (error) {
      console.error('Chat error:', error);

      // Handle different error types
      let errorContent = 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.';

      if (error instanceof Error) {
        if (error.message.includes('400')) {
          errorContent = 'Mesaj formatı hatalı. Lütfen tekrar deneyin.';
        } else if (error.message.includes('401')) {
          errorContent = 'Oturum süreniz dolmuş. Lütfen yeniden giriş yapın.';
        } else if (error.message.includes('500')) {
          errorContent = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
        }
      }

      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: errorContent,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Mesaj gönderilemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const provideFeedback = async (messageId: string, isHelpful: boolean) => {
    try {
      await chatService.provideFeedback({
        messageId,
        isHelpful,
      });
      toast.success('Geri bildiriminiz kaydedildi');
    } catch (error) {
      console.error('Feedback error:', error);
      toast.error('Geri bildirim gönderilemedi');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      // Container positioning & sizing
      'fixed bottom-4 right-4 z-50 flex flex-col',
      // Responsive sizing
      'w-[380px] h-[600px]',
      'sm:w-[400px] sm:h-[650px]',
      'max-h-[calc(100vh-2rem)]',
      // Dark mode styling with design tokens
      'bg-gray-900/95 backdrop-blur-xl',
      'border border-gray-700/60',
      'rounded-2xl shadow-2xl shadow-black/20',
      // Smooth animations
      'transition-all duration-300 ease-out',
      'transform-gpu',
      className
    )}>
      {/* Modern Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/80 bg-gray-800/80 backdrop-blur-sm rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full',
            'bg-gradient-to-br from-blue-500 to-purple-600',
            'shadow-lg shadow-blue-500/25',
            isAiAvailable ? 'animate-pulse' : 'opacity-60'
          )}>
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-sm">AffeXAI</h3>
            <p className={cn(
              'text-xs',
              isAiAvailable ? 'text-green-400' : 'text-gray-400'
            )}>
              {isAiAvailable ? 'Çevrimiçi' : 'Çevrimdışı'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/80 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 px-4 py-2">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 px-4 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-white text-lg">
                    Merhaba! 👋
                  </h3>
                  <p className="text-sm text-gray-300 max-w-xs">
                    Size nasıl yardımcı olabilirim? Sorularınızı yazabilir veya aşağıdaki önerilerden birini seçebilirsiniz.
                  </p>
                </div>
              </div>

              {/* Suggested Questions */}
              {suggestedQuestions.length > 0 && (
                <div className="w-full space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={cn(
                        'w-full text-left justify-start h-auto p-3 text-sm',
                        'border-gray-600 hover:border-blue-400 hover:bg-gray-700/50 text-gray-200',
                        'transition-all duration-200 rounded-xl'
                      )}
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2 text-gray-500" />
                      {question}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3 animate-in slide-in-from-bottom-2 duration-300',
                    message.isBot ? 'justify-start' : 'justify-end'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 space-y-3 shadow-sm',
                    'transition-all duration-200 hover:shadow-md',
                    message.isBot
                      ? 'bg-gray-800 border border-gray-600 text-gray-100'
                      : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-auto'
                  )}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

                    {/* Message metadata */}
                    {message.metadata?.sources && message.metadata.sources.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gray-600">
                        <p className="text-xs text-gray-400 font-medium">Kaynaklar:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.metadata.sources.map((source, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-blue-900/50 text-blue-300 border-blue-700"
                            >
                              {source.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Actions */}
                    {message.metadata?.suggestedActions && message.metadata.suggestedActions.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="flex flex-wrap gap-1">
                          {message.metadata.suggestedActions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 text-xs bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200 rounded-full"
                              onClick={() => sendMessage(action)}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Feedback buttons for bot messages */}
                    {message.isBot && (
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-green-900/50 rounded-full"
                            onClick={() => provideFeedback(message.id, true)}
                          >
                            <ThumbsUp className="h-3 w-3 text-gray-400 hover:text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-red-900/50 rounded-full"
                            onClick={() => provideFeedback(message.id, false)}
                          >
                            <ThumbsDown className="h-3 w-3 text-gray-400 hover:text-red-600" />
                          </Button>
                        </div>
                        {message.metadata?.confidence && (
                          <span className="text-xs text-gray-400">
                            Güven: %{message.metadata.confidence}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {!message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Modern Loading indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-800 border border-gray-600 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-300">AI düşünüyor...</span>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Modern Input Area */}
        <div className="p-4 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700/80 rounded-b-2xl">
          {!isAiAvailable && (
            <div className="flex items-center gap-2 mb-3 p-3 bg-amber-900/20 border border-amber-700 rounded-xl">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
              <span className="text-sm text-amber-800">
                AI asistan şu anda kullanılamıyor
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isAiAvailable ? "Mesajınızı yazın..." : "AI asistan çevrimdışı"}
                disabled={isLoading || !isAiAvailable}
                className={cn(
                  'min-h-[44px] pr-12 resize-none rounded-xl border-gray-600 bg-gray-700 text-white',
                  'focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20',
                  'disabled:bg-gray-800 disabled:text-gray-500',
                  'placeholder:text-gray-400',
                  'transition-all duration-200'
                )}
                maxLength={1000}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                {inputValue.length}/1000
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim() || !isAiAvailable}
              className={cn(
                'h-11 w-11 rounded-xl p-0',
                'bg-gradient-to-br from-blue-500 to-blue-600',
                'hover:from-blue-600 hover:to-blue-700',
                'disabled:from-gray-300 disabled:to-gray-400',
                'shadow-lg shadow-blue-500/25',
                'transition-all duration-200 transform hover:scale-105 active:scale-95'
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <Send className="h-5 w-5 text-white" />
              )}
            </Button>
          </form>

          {inputValue.length > 900 && (
            <p className="text-xs text-amber-400 mt-2 text-center">
              {1000 - inputValue.length} karakter kaldı
            </p>
          )}

          {/* Quick Actions */}
          <div className="mt-3 pt-3 border-t border-gray-700/50">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => sendMessage("Destek ekibiyle iletişime geçmek istiyorum")}
                className={cn(
                  'flex-1 h-9 text-xs',
                  'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200',
                  'transition-all duration-200'
                )}
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Destek Mesajı
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => sendMessage("Bilgi bankasında arama yapmak istiyorum")}
                className={cn(
                  'flex-1 h-9 text-xs',
                  'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200',
                  'transition-all duration-200'
                )}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Bilgi Bankası
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}