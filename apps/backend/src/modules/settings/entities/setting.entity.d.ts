export declare enum SettingCategory {
    COMPANY = "company",
    AI = "ai",
    EMAIL = "email",
    SOCIAL_MEDIA = "social_media",
    ANALYTICS = "analytics"
}
export declare class Setting {
    id: string;
    category: SettingCategory;
    key: string;
    value: string;
    isEncrypted: boolean;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Key'e göre otomatik şifreleme/deşifreleme
     */
    encryptSensitiveData(): void;
    /**
     * Şifreli veriyi oku (getter)
     */
    getDecryptedValue(): string;
    /**
     * Şifreli değer güncelle (setter)
     */
    setEncryptedValue(plainValue: string): void;
}
//# sourceMappingURL=setting.entity.d.ts.map