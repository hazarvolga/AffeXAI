export interface BlockPropertySchema {
    [key: string]: {
        type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'list' | 'textarea';
        label: string;
        options?: string[];
        defaultValue?: any;
        itemSchema?: {
            [subKey: string]: {
                type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'list';
                label: string;
                options?: string[];
                defaultValue?: any;
                itemSchema?: {
                    [subKey: string]: {
                        type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'list';
                        label: string;
                        options?: string[];
                        defaultValue?: any;
                        itemSchema?: {
                            [subKey: string]: {
                                type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea';
                                label: string;
                                options?: string[];
                                defaultValue?: any;
                            };
                        };
                    };
                };
            };
        };
    };
}
export declare const navigationBlocksConfig: Record<string, BlockPropertySchema>;
export declare const heroBlocksConfig: Record<string, BlockPropertySchema>;
export declare const contentBlocksConfig: Record<string, BlockPropertySchema>;
export declare const elementBlocksConfig: Record<string, BlockPropertySchema>;
export declare const specialBlocksConfig: Record<string, BlockPropertySchema>;
export declare const ecommerceBlocksConfig: Record<string, BlockPropertySchema>;
export declare const galleryBlocksConfig: Record<string, BlockPropertySchema>;
export declare const footerBlocksConfig: Record<string, BlockPropertySchema>;
export declare const blogRssBlocksConfig: Record<string, BlockPropertySchema>;
export declare const socialSharingBlocksConfig: Record<string, BlockPropertySchema>;
export declare const allBlockConfigs: Record<string, BlockPropertySchema>;
//# sourceMappingURL=block-configs.d.ts.map