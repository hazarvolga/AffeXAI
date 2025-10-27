import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { EncryptionUtil } from '../../../shared/utils/encryption.util';

export enum SettingCategory {
  COMPANY = 'company',
  AI = 'ai',
  EMAIL = 'email',
  SOCIAL_MEDIA = 'social_media',
  ANALYTICS = 'analytics',
}

/**
 * Şifrelenmesi gereken ayar key'leri
 * Bu listede olmayan key'ler plain text olarak saklanır
 */
const ENCRYPTED_KEYS = [
  'email.apiKey',
  'email.resend.apiKey',
  'email.sendgrid.apiKey',
  'email.postmark.apiKey',
  'email.mailgun.apiKey',
  'email.ses.accessKey',
  'email.ses.secretKey',
  'email.smtp.password',
  'ai.global.apiKey',
  'ai.social.apiKey',
  'ai.emailMarketing.apiKey',
  'ai.support.apiKey',
  'ai.analytics.apiKey',
];

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  category: SettingCategory;

  @Column({ type: 'varchar', length: 100 })
  key: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @Column({ type: 'boolean', default: false, name: 'is_encrypted' })
  isEncrypted: boolean;

  // KEK/DEK Pattern fields (added in migration 1738032000000)
  @Column({ type: 'text', nullable: true, name: 'encrypted_dek' })
  encryptedDek: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'provider' })
  provider: string;

  @Column({ type: 'timestamp', nullable: true, name: 'dek_created_at' })
  dekCreatedAt: Date;

  @Column({ type: 'integer', default: 0, name: 'dek_rotation_count' })
  dekRotationCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Key'e göre otomatik şifreleme/deşifreleme
   */
  @BeforeInsert()
  @BeforeUpdate()
  encryptSensitiveData(): void {
    const fullKey = `${this.category}.${this.key}`;
    
    if (ENCRYPTED_KEYS.includes(fullKey) && this.value) {
      // Zaten şifrelenmiş mi kontrol et (update durumunda)
      if (!this.isEncrypted) {
        this.value = EncryptionUtil.encrypt(this.value);
        this.isEncrypted = true;
      }
    }
  }

  /**
   * Şifreli veriyi oku (getter)
   */
  getDecryptedValue(): string {
    if (this.isEncrypted && this.value) {
      try {
        return EncryptionUtil.decrypt(this.value);
      } catch (error) {
        console.error(`[Setting] Decryption error for key=${this.key}, category=${this.category}:`, error.message);
        throw new Error(`Failed to decrypt setting ${this.category}.${this.key}: ${error.message}`);
      }
    }
    return this.value;
  }

  /**
   * Şifreli değer güncelle (setter)
   */
  setEncryptedValue(plainValue: string): void {
    const fullKey = `${this.category}.${this.key}`;
    
    if (ENCRYPTED_KEYS.includes(fullKey)) {
      this.value = EncryptionUtil.encrypt(plainValue);
      this.isEncrypted = true;
    } else {
      this.value = plainValue;
      this.isEncrypted = false;
    }
  }
}