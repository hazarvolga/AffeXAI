/**
 * AES-256-GCM şifreleme/deşifreleme yardımcı sınıfı
 * Email API anahtarları gibi hassas verileri güvenli saklamak için kullanılır
 */
export declare class EncryptionUtil {
    private static readonly ALGORITHM;
    private static readonly SALT_LENGTH;
    private static readonly IV_LENGTH;
    private static readonly TAG_LENGTH;
    private static readonly KEY_LENGTH;
    /**
     * Environment'tan encryption key'i alır
     * Yoksa development ortamı için varsayılan bir key döner (production'da HATA!)
     */
    private static getEncryptionKey;
    /**
     * Encryption key'den türetilmiş cipher key üretir
     */
    private static deriveKey;
    /**
     * Metni şifreler
     * Format: salt(32) + iv(16) + tag(16) + encryptedData
     * @param plaintext Şifrelenecek metin
     * @returns Base64 encoded şifreli veri
     */
    static encrypt(plaintext: string): string;
    /**
     * Şifreli metni çözer
     * @param ciphertext Base64 encoded şifreli veri
     * @returns Orijinal metin
     */
    static decrypt(ciphertext: string): string;
    /**
     * Test için: şifrele ve deşifrele döngüsü
     */
    static test(): boolean;
}
//# sourceMappingURL=encryption.util.d.ts.map