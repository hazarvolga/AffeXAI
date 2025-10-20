import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';
import { promises as fs } from 'fs';
import { join } from 'path';
import { CertificateTemplate } from './entities/certificate-template.entity';

interface CertificateData {
  recipientName: string | null;
  recipientEmail: string | null;
  trainingTitle: string | null;
  description?: string | null;
  issuedAt: string;
  validUntil?: string | null;
  logoUrl?: string | null;
  signatureUrl?: string | null;
  certificateNumber?: string | null;
  eventId?: string | null;
  [key: string]: any; // Allow custom variables
}

@Injectable()
export class PdfGeneratorService {
  private readonly logger = new Logger(PdfGeneratorService.name);
  private readonly uploadsDir = join(process.cwd(), 'uploads', 'certificates');

  constructor() {
    // Ensure uploads directory exists
    this.ensureUploadDirectory();
  }

  private async ensureUploadDirectory() {
    try {
      await fs.mkdir(this.uploadsDir, { recursive: true });
      this.logger.log(`Certificates upload directory ready: ${this.uploadsDir}`);
    } catch (error) {
      this.logger.error('Failed to create uploads directory', error);
    }
  }

  /**
   * Generate PDF from HTML template and certificate data
   */
  async generateCertificatePdf(
    template: CertificateTemplate,
    data: CertificateData,
    certificateId: string,
  ): Promise<string> {
    try {
      this.logger.log(`Generating PDF for certificate ${certificateId}`);

      // 1. Compile Handlebars template
      const compiledTemplate = Handlebars.compile(template.htmlContent);
      
      // 2. Prepare data with formatted dates
      const formattedIssuedAt = this.formatDate(data.issuedAt);
      
      // Fetch company information from site settings
      let companyName = 'AFFEX Technology Solutions';
      let companyAddress = 'Example Street 123\n34000 Istanbul\nTurkey';
      
      try {
        const settingsResponse = await fetch('http://localhost:9005/api/settings/site');
        if (settingsResponse.ok) {
          const settings = await settingsResponse.json();
          companyName = settings.companyName || companyName;
          companyAddress = settings.contact?.address || companyAddress;
        }
      } catch (error) {
        this.logger.warn('Failed to fetch site settings, using defaults', error);
      }
      
      const templateData = {
        ...data,
        issuedAt: formattedIssuedAt,
        issueDate: formattedIssuedAt, // Backward compatibility for templates
        validUntil: data.validUntil ? this.formatDate(data.validUntil) : undefined,
        companyName,
        companyAddress,
        customLogoUrl: data.customLogoUrl,
        companyLogoUrl: data.companyLogoUrl,
      };

      // Debug: Log template data to verify logo URLs
      this.logger.log('Template data:', JSON.stringify({
        customLogoUrl: templateData.customLogoUrl,
        companyLogoUrl: templateData.companyLogoUrl,
        logoUrl: (templateData as any).logoUrl,
      }, null, 2));

      const html = compiledTemplate(templateData);

      // 3. Generate PDF with Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      });

      const page = await browser.newPage();

      // Set content and wait for resources
      await page.setContent(html, { 
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Generate PDF buffer
      const pdfBuffer = await page.pdf({
        format: template.pageFormat as any || 'A4',
        landscape: template.orientation === 'landscape',
        printBackground: true,
        margin: { 
          top: '0', 
          right: '0', 
          bottom: '0', 
          left: '0' 
        },
      });

      await browser.close();

      // 4. Save PDF to file system
      const filename = `certificate-${certificateId}-${Date.now()}.pdf`;
      const filePath = join(this.uploadsDir, filename);
      
      await fs.writeFile(filePath, pdfBuffer);

      // 5. Return URL (adjust based on your storage strategy)
      const pdfUrl = `/uploads/certificates/${filename}`;
      
      this.logger.log(`PDF generated successfully: ${pdfUrl}`);
      return pdfUrl;

      // Alternative: Upload to S3
      // const s3Url = await this.uploadToS3(pdfBuffer, filename);
      // return s3Url;
    } catch (error) {
      this.logger.error('PDF generation failed', error);
      throw new Error(`PDF generation failed: ${error.message}`);
    }
  }

  /**
   * Upload PDF to AWS S3 (optional)
   */
  // private async uploadToS3(buffer: Buffer, filename: string): Promise<string> {
  //   const s3 = new AWS.S3();
  //   const params = {
  //     Bucket: process.env.AWS_S3_BUCKET || 'your-bucket',
  //     Key: `certificates/${filename}`,
  //     Body: buffer,
  //     ContentType: 'application/pdf',
  //     ACL: 'public-read',
  //   };
  //
  //   const result = await s3.upload(params).promise();
  //   return result.Location;
  // }

  /**
   * Format date for template
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('tr-TR', options);
  }

  /**
   * Delete PDF file
   */
  async deletePdf(pdfUrl: string): Promise<void> {
    try {
      const filename = pdfUrl.split('/').pop();
      if (!filename) {
        throw new Error('Invalid PDF URL');
      }
      const filePath = join(this.uploadsDir, filename);
      await fs.unlink(filePath);
      this.logger.log(`PDF deleted: ${filename}`);
    } catch (error) {
      this.logger.error('Failed to delete PDF', error);
    }
  }

  /**
   * Check if PDF exists
   */
  async pdfExists(pdfUrl: string): Promise<boolean> {
    try {
      const filename = pdfUrl.split('/').pop();
      if (!filename) {
        return false;
      }
      const filePath = join(this.uploadsDir, filename);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
