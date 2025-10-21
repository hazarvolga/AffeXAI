export declare enum MetricType {
    VIEW = "view",
    CLICK = "click",
    EDIT = "edit",
    PUBLISH = "publish"
}
export declare class CmsMetric {
    id: string;
    metricType: MetricType;
    pageId: string;
    pageTitle: string;
    category: string;
    linkUrl: string;
    linkText: string;
    visitorId: string;
    metadata: Record<string, any>;
    createdAt: Date;
}
//# sourceMappingURL=cms-metric.entity.d.ts.map