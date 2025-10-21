/**
 * Design Token Reference Configuration
 * Used to specify that a property can reference design tokens
 */
export interface TokenReferenceConfig {
    /**
     * Token category to filter available tokens
     */
    category: 'color' | 'spacing' | 'typography' | 'shadow' | 'border' | 'dimension' | 'fontFamily' | 'fontWeight';
    /**
     * Suggested token path (used as hint in UI)
     * Example: "color.primary", "spacing.lg"
     */
    suggestedPath?: string;
    /**
     * Allow custom values in addition to token references
     * If false, only token references are allowed
     */
    allowCustom?: boolean;
    /**
     * Help text shown in token picker
     */
    description?: string;
}
export interface BlockPropertySchema {
    [key: string]: {
        type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'list' | 'textarea' | 'token';
        label: string;
        options?: string[];
        defaultValue?: any;
        /**
         * NEW: Token reference configuration
         * When specified, the property can reference design tokens
         * Works with 'color', 'text', 'number' types
         */
        tokenReference?: TokenReferenceConfig;
        itemSchema?: {
            [subKey: string]: {
                type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'list' | 'token';
                label: string;
                options?: string[];
                defaultValue?: any;
                tokenReference?: TokenReferenceConfig;
                itemSchema?: {
                    [subKey: string]: {
                        type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'list' | 'token';
                        label: string;
                        options?: string[];
                        defaultValue?: any;
                        tokenReference?: TokenReferenceConfig;
                        itemSchema?: {
                            [subKey: string]: {
                                type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'textarea' | 'token';
                                label: string;
                                options?: string[];
                                defaultValue?: any;
                                tokenReference?: TokenReferenceConfig;
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
export declare const testimonialsBlocksConfig: Record<string, BlockPropertySchema>;
export declare const featuresBlocksConfig: Record<string, BlockPropertySchema>;
export declare const statsBlocksConfig: Record<string, BlockPropertySchema>;
export declare const pricingBlocksConfig: Record<string, BlockPropertySchema>;
export declare const ratingBlocksConfig: Record<string, BlockPropertySchema>;
export declare const progressBlocksConfig: Record<string, BlockPropertySchema>;
export declare const allBlockConfigs: Record<string, BlockPropertySchema>;
//# sourceMappingURL=block-configs.d.ts.map