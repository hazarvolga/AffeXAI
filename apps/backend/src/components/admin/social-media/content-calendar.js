"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentCalendar = void 0;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const social_media_data_1 = require("@/lib/social-media-data");
const calendar_1 = require("@/components/ui/calendar");
const popover_1 = require("@/components/ui/popover");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const scroll_area_1 = require("@/components/ui/scroll-area");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
// --- SHARED HELPER ---
const scheduledPosts = social_media_data_1.socialPosts.filter(p => p.status === 'Planlandı' && p.scheduledAt);
const postsByDay = scheduledPosts.reduce((acc, post) => {
    const day = new Date(post.scheduledAt).toDateString();
    if (!acc[day]) {
        acc[day] = [];
    }
    acc[day].push(post);
    return acc;
}, {});
// --- MONTHLY VIEW ---
const MonthlyView = ({ selectedDate, onDateChange }) => {
    const DayCell = ({ date }) => {
        const posts = postsByDay[date.toDateString()];
        if (posts && posts.length > 0) {
            return (<popover_1.Popover>
                    <popover_1.PopoverTrigger asChild>
                         <div className="relative flex h-full w-full items-center justify-center">
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            {date.getDate()}
                         </div>
                    </popover_1.PopoverTrigger>
                    <popover_1.PopoverContent className="w-80 z-50">
                        <div className="space-y-4">
                             <h4 className="font-medium leading-none">{date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
                             {posts.map(post => {
                    const account = social_media_data_1.socialAccounts.find(a => a.id === post.accountId);
                    const PlatformIcon = account ? (0, social_media_data_1.getPlatformIcon)(account.platform) : lucide_react_1.Share2;
                    return (<div key={post.id} className="text-sm">
                                         <div className="flex items-center gap-2 font-semibold">
                                            <PlatformIcon className="h-4 w-4 text-muted-foreground"/>
                                            <span>{account?.platform}</span>
                                            <span className="text-xs text-muted-foreground font-normal">{new Date(post.scheduledAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <p className="line-clamp-2 text-muted-foreground">{post.content}</p>
                                    </div>);
                })}
                        </div>
                    </popover_1.PopoverContent>
                </popover_1.Popover>);
        }
        return date.getDate();
    };
    return (<div className="flex justify-center">
             <calendar_1.Calendar mode="single" selected={selectedDate} onSelect={onDateChange} className="w-full" components={{ Day: DayCell }}/>
        </div>);
};
// --- DAILY VIEW ---
const DailyView = ({ selectedDate }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23
    const selectedDayPosts = selectedDate ? postsByDay[selectedDate.toDateString()] || [] : [];
    const postsByHour = selectedDayPosts.reduce((acc, post) => {
        const hour = new Date(post.scheduledAt).getHours();
        if (!acc[hour]) {
            acc[hour] = [];
        }
        acc[hour].push(post);
        return acc;
    }, {});
    return (<div className="border rounded-md">
            <h3 className="font-semibold mb-4 p-4 border-b">{selectedDate ? selectedDate.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Bir gün seçin'}</h3>
            <scroll_area_1.ScrollArea className="h-[400px]">
                <div className="p-4 space-y-2">
                    {hours.map(hour => {
            const postsInHour = postsByHour[hour] || [];
            return (<div key={hour} className="grid grid-cols-[auto_1fr] gap-4 items-start min-h-[60px]">
                                <div className="text-right text-xs text-muted-foreground pt-1">
                                    {(0, date_fns_1.format)(new Date(0, 0, 0, hour), 'HH:mm')}
                                </div>
                                <div className="border-l pl-4 py-1 space-y-2">
                                    {postsInHour.length > 0 ? (postsInHour.map(post => {
                    const account = social_media_data_1.socialAccounts.find(a => a.id === post.accountId);
                    const PlatformIcon = account ? (0, social_media_data_1.getPlatformIcon)(account.platform) : lucide_react_1.Share2;
                    return (<div key={post.id} className="bg-secondary p-2 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <PlatformIcon className="h-4 w-4 text-muted-foreground"/>
                                                        <span className="font-semibold text-sm">{account?.platform}</span>
                                                        <span className="text-xs text-muted-foreground">({(0, date_fns_1.format)(new Date(post.scheduledAt), 'HH:mm')})</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
                                                </div>);
                })) : (<div className="h-full"></div>)}
                                </div>
                            </div>);
        })}
                </div>
            </scroll_area_1.ScrollArea>
        </div>);
};
// --- WEEKLY VIEW ---
const WeeklyView = ({ selectedDate, onDateChange }) => {
    const weekStart = (0, date_fns_1.startOfWeek)(selectedDate, { weekStartsOn: 1 });
    const weekDays = (0, date_fns_1.eachDayOfInterval)({ start: weekStart, end: (0, date_fns_1.add)(weekStart, { days: 6 }) });
    return (<div className="border rounded-md">
            <div className="grid grid-cols-7">
                {weekDays.map(day => (<div key={day.toString()} className="border-b border-r last:border-r-0">
                        <h4 className="text-center font-semibold text-sm py-2 border-b">
                            {(0, date_fns_1.format)(day, 'EEE', { locale: locale_1.tr })}
                             <span className='block text-xs font-normal text-muted-foreground'>{(0, date_fns_1.format)(day, 'd MMM', { locale: locale_1.tr })}</span>
                        </h4>
                        <div className="h-64 p-2 space-y-2 overflow-y-auto">
                            {(postsByDay[day.toDateString()] || []).map(post => {
                const account = social_media_data_1.socialAccounts.find(a => a.id === post.accountId);
                const PlatformIcon = account ? (0, social_media_data_1.getPlatformIcon)(account.platform) : lucide_react_1.Share2;
                return (<div key={post.id} className="p-1.5 rounded-md bg-secondary text-xs">
                                        <div className="flex items-center justify-between font-semibold">
                                            <PlatformIcon className="h-3 w-3"/>
                                            <span className="flex items-center gap-1">
                                                <lucide_react_1.Clock className="h-3 w-3"/>
                                                {new Date(post.scheduledAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="line-clamp-2 text-muted-foreground mt-1">{post.content}</p>
                                    </div>);
            })}
                        </div>
                    </div>))}
            </div>
        </div>);
};
// --- YEARLY VIEW ---
const YearlyView = ({ selectedDate, onDateChange, onTabChange }) => {
    const year = (0, date_fns_1.getYear)(selectedDate);
    const months = Array.from({ length: 12 }, (_, i) => i);
    const getPostCountForMonth = (month) => {
        return scheduledPosts.filter(p => {
            const postDate = new Date(p.scheduledAt);
            return (0, date_fns_1.getYear)(postDate) === year && (0, date_fns_1.getMonth)(postDate) === month;
        }).length;
    };
    const handleMonthClick = (month) => {
        onDateChange((0, date_fns_1.setMonth)(new Date(year, 0, 1), month));
        onTabChange('monthly');
    };
    return (<div className="p-4 border rounded-md">
            <h3 className="text-lg font-bold text-center mb-4">{year} Yılı İçerik Yoğunluğu</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {months.map(month => {
            const postCount = getPostCountForMonth(month);
            const opacity = Math.min(postCount / 10, 1); // Max 10 posts for full opacity
            return (<button_1.Button key={month} variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" style={{ backgroundColor: postCount > 0 ? `rgba(59, 130, 246, ${opacity})` : undefined, color: postCount > 0 ? 'white' : undefined }} onClick={() => handleMonthClick(month)}>
                            <span className="font-semibold">{(0, date_fns_1.format)(new Date(year, month), 'MMMM', { locale: locale_1.tr })}</span>
                            <span className={(0, utils_1.cn)("text-xs", postCount > 0 ? 'text-white/80' : 'text-muted-foreground')}>{postCount} gönderi</span>
                        </button_1.Button>);
        })}
            </div>
        </div>);
};
const ContentCalendar = () => {
    const [date, setDate] = (0, react_1.useState)(new Date());
    const [activeTab, setActiveTab] = (0, react_1.useState)('monthly');
    return (<card_1.Card>
            <card_1.CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                     <div>
                        <card_1.CardTitle>İçerik Takvimi</card_1.CardTitle>
                        <card_1.CardDescription>Planlanmış sosyal medya gönderilerinin takvimi.</card_1.CardDescription>
                    </div>
                     <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab}>
                        <tabs_1.TabsList>
                            <tabs_1.TabsTrigger value="daily">Günlük</tabs_1.TabsTrigger>
                            <tabs_1.TabsTrigger value="weekly">Haftalık</tabs_1.TabsTrigger>
                            <tabs_1.TabsTrigger value="monthly">Aylık</tabs_1.TabsTrigger>
                            <tabs_1.TabsTrigger value="yearly">Yıllık</tabs_1.TabsTrigger>
                        </tabs_1.TabsList>
                    </tabs_1.Tabs>
                </div>
            </card_1.CardHeader>
            <card_1.CardContent>
                 <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab}>
                    <tabs_1.TabsContent value="monthly">
                        <MonthlyView selectedDate={date} onDateChange={setDate}/>
                    </tabs_1.TabsContent>
                     <tabs_1.TabsContent value="daily">
                        <DailyView selectedDate={date}/>
                    </tabs_1.TabsContent>
                    <tabs_1.TabsContent value="weekly">
                        <WeeklyView selectedDate={date || new Date()} onDateChange={setDate}/>
                    </tabs_1.TabsContent>
                    <tabs_1.TabsContent value="yearly">
                        <YearlyView selectedDate={date || new Date()} onDateChange={setDate} onTabChange={setActiveTab}/>
                    </tabs_1.TabsContent>
                </tabs_1.Tabs>
            </card_1.CardContent>
        </card_1.Card>);
};
exports.ContentCalendar = ContentCalendar;
//# sourceMappingURL=content-calendar.js.map