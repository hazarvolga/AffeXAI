'use client';

import { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import emailCampaignsService, { EmailCampaign } from '@/lib/api/emailCampaignsService';

interface ChartData {
    name: string;
    sent: number;
    opened: number;
    clicked: number;
    openRate: number;
    clickRate: number;
}

export function CampaignPerformanceChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const campaigns = await emailCampaignsService.getAll();
                const chartData = campaigns.map(campaign => {
                    const sent = campaign.sentCount || 0;
                    const opened = campaign.openedCount || 0;
                    const clicked = campaign.clickedCount || 0;
                    
                    return {
                        name: campaign.subject?.substring(0, 20) + (campaign.subject?.length > 20 ? '...' : ''),
                        sent,
                        opened,
                        clicked,
                        openRate: sent > 0 ? Math.round((opened / sent) * 100) : 0,
                        clickRate: sent > 0 ? Math.round((clicked / sent) * 100) : 0,
                    };
                });
                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching campaign data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Kampanya Performansı</CardTitle>
                    <CardDescription>Son gönderilen kampanyaların açılma ve tıklanma oranları.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[300px]">
                        <div className="text-muted-foreground">Veriler yükleniyor...</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kampanya Performansı</CardTitle>
                <CardDescription>Son gönderilen kampanyaların açılma ve tıklanma oranları.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                             cursor={{ fill: "hsl(var(--muted))" }}
                             contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                        />
                        <Legend />
                        <Bar dataKey="openRate" name="Açılma Oranı (%)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="clickRate" name="Tıklanma Oranı (%)" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}