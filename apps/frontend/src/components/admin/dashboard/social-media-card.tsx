'use client'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { socialAccounts, getPlatformIcon } from "@/lib/social-media-data";

export function SocialMediaCard() {
  const connectedAccounts = socialAccounts.filter(a => a.isConnected).length;
  const totalAccounts = socialAccounts.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Sosyal Medya
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-bold">{connectedAccounts}/{totalAccounts}</p>
          <p className="text-xs text-muted-foreground">Bağlı Hesap</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {socialAccounts.map(account => {
              const Icon = getPlatformIcon(account.platform);
              return (
                <div
                  key={account.id}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center"
                  title={account.platform}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild size="sm" variant="outline" className="w-full">
          <Link href="/admin/social-media">
            Yönet <ArrowUpRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
