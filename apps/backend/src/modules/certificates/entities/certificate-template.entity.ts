import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('certificate_templates')
export class CertificateTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  htmlContent: string;

  @Column({ type: 'simple-json', nullable: true })
  variables: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  previewImageUrl: string;

  @Column({ default: 'landscape' })
  orientation: 'landscape' | 'portrait';

  @Column({ default: 'A4' })
  pageFormat: string;

  @Column({ type: 'simple-json', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
