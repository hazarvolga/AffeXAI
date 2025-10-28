import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { glob } from 'glob';

@Injectable()
export class TemplateFileService {
  private readonly templatesPath: string;

  constructor() {
    // Point to email-marketing templates directory
    this.templatesPath = join(process.cwd(), 'src', 'modules', 'email-marketing', 'templates');
  }

  async getAllTemplateFiles(): Promise<{ id: string; name: string; fileName: string }[]> {
    try {
      const files = await glob('*.tsx', { cwd: this.templatesPath });
      
      return files.map(file => ({
        id: file.replace('.tsx', ''),
        name: this.formatTemplateName(file.replace('.tsx', '')),
        fileName: file,
      }));
    } catch (error) {
      throw new NotFoundException('Template files not found');
    }
  }

  async getTemplateFileContent(filename: string): Promise<string> {
    try {
      const filePath = join(this.templatesPath, filename);
      const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        throw new NotFoundException(`Template file ${filename} not found`);
      }
      
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new NotFoundException(`Template file ${filename} not found`);
    }
  }

  private formatTemplateName(templateId: string): string {
    // Convert kebab-case to readable format
    return templateId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}