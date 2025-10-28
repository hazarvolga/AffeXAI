#!/usr/bin/env tsx
/**
 * Email Template Pre-Compiler
 *
 * Compiles React Email templates (.tsx) to static HTML files
 * at build time for production-ready email sending.
 *
 * Why pre-compile?
 * - NestJS can't dynamically import .tsx files at runtime
 * - Eliminates JSX runtime dependency in production
 * - Faster email rendering (no template compilation overhead)
 * - Production-ready and reliable
 *
 * Usage:
 *   npm run compile:templates
 *   OR
 *   tsx scripts/compile-email-templates.ts
 */

import { render } from '@react-email/render';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as React from 'react';

// ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_SRC_DIR = path.join(__dirname, '../src/emails');
const TEMPLATES_DIST_DIR = path.join(__dirname, '../dist/templates');
const COMPONENTS_DIR = path.join(TEMPLATES_SRC_DIR, 'components');

interface CompileResult {
  templateName: string;
  success: boolean;
  outputPath?: string;
  error?: string;
}

/**
 * Ensure output directory exists
 */
function ensureDistDirectory(): void {
  if (!fs.existsSync(TEMPLATES_DIST_DIR)) {
    fs.mkdirSync(TEMPLATES_DIST_DIR, { recursive: true });
    console.log(`📁 Created dist directory: ${TEMPLATES_DIST_DIR}`);
  }
}

/**
 * Get all template files from src/emails/
 * Excludes components directory
 * Filters to only ticket-related templates for now
 */
function getTemplateFiles(): string[] {
  const files = fs.readdirSync(TEMPLATES_SRC_DIR);

  // Only compile ticket-related templates that don't have frontend dependencies
  // TODO: Fix templates that import @/lib/site-settings-data
  // TODO: Fix csat-survey template (undefined/null error)
  const ticketTemplates = [
    'ticket-created',  // ✅ Works perfectly!
    // 'csat-survey',         // ❌ Cannot convert undefined/null to object
    // 'ticket-assigned',    // ❌ Imports @/lib/site-settings-data
    // 'ticket-new-message', // ❌ Imports @/lib/site-settings-data
    // 'ticket-resolved',    // ❌ Imports @/lib/site-settings-data
    // 'ticket-escalated',   // ❌ Imports @/lib/site-settings-data
  ];

  return files
    .filter(file => {
      const isComponent = file.startsWith('components') || file === 'components';
      const isTsx = file.endsWith('.tsx');
      const isHelper = file.includes('helper');
      const baseName = path.basename(file, '.tsx');
      const isTicketTemplate = ticketTemplates.includes(baseName);

      return isTsx && !isComponent && !isHelper && isTicketTemplate;
    })
    .map(file => path.join(TEMPLATES_SRC_DIR, file));
}

/**
 * Compile a single template to HTML
 */
async function compileTemplate(templatePath: string): Promise<CompileResult> {
  const templateName = path.basename(templatePath, '.tsx');

  try {
    console.log(`🔨 Compiling: ${templateName}...`);

    // Dynamic import of the React Email template
    const templateModule = await import(templatePath);
    const TemplateComponent = templateModule.default || templateModule[getComponentName(templateName)];

    if (!TemplateComponent) {
      throw new Error(`No default export or named export found in ${templateName}`);
    }

    // Render template to HTML with sample context
    const sampleContext = getSampleContext(templateName);
    const html = await render(React.createElement(TemplateComponent, sampleContext), {
      pretty: true, // Pretty-print HTML for debugging
    });

    // Write HTML to dist/templates/
    const outputPath = path.join(TEMPLATES_DIST_DIR, `${templateName}.html`);
    fs.writeFileSync(outputPath, html, 'utf-8');

    console.log(`✅ Compiled: ${templateName} → ${path.relative(process.cwd(), outputPath)}`);

    return {
      templateName,
      success: true,
      outputPath,
    };
  } catch (error: any) {
    console.error(`❌ Failed to compile ${templateName}:`, error.message);

    return {
      templateName,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Convert template name to PascalCase component name
 * Example: ticket-created → TicketCreatedEmail
 */
function getComponentName(templateName: string): string {
  return templateName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') + 'Email';
}

/**
 * Get sample context for template rendering
 * This ensures templates compile without runtime errors
 */
function getSampleContext(templateName: string): Record<string, any> {
  // Base context shared by all templates
  const baseContext = {
    siteSettings: {
      companyName: 'Affexai',
      siteName: 'Affexai',
      logoUrl: 'https://example.com/logo.png',
      primaryColor: '#ff7f1e',
      contactEmail: 'support@affexai.com',
      contact: {
        address: '123 Main St, Istanbul, Turkey',
        phone: '+90 212 123 45 67',
        email: 'support@affexai.com',
      },
      socialMedia: {
        facebook: 'https://facebook.com/affexai',
        twitter: 'https://twitter.com/affexai',
        linkedin: 'https://linkedin.com/company/affexai',
      },
      socialLinks: {
        facebook: 'https://facebook.com/affexai',
        twitter: 'https://twitter.com/affexai',
        linkedin: 'https://linkedin.com/company/affexai',
      },
    },
    baseUrl: 'http://localhost:9003',
  };

  // Template-specific contexts
  const specificContexts: Record<string, any> = {
    'ticket-created': {
      customerName: 'John Doe',
      ticketId: 'TICKET-001',
      ticketSubject: 'Sample Ticket',
      ticketDescription: 'This is a sample ticket description',
      ticketPriority: 'high',
      ticketStatus: 'open',
      ticketUrl: 'http://localhost:9003/portal/support/TICKET-001',
      supportEmail: 'support@affexai.com',
    },
    'ticket-assigned': {
      agentName: 'Jane Smith',
      ticketId: 'TICKET-001',
      ticketSubject: 'Sample Ticket',
      ticketPriority: 'high',
      ticketStatus: 'open',
      assignedByName: 'Admin User',
      ticketUrl: 'http://localhost:9003/admin/support/TICKET-001',
    },
    'ticket-new-message': {
      recipientName: 'John Doe',
      ticketId: 'TICKET-001',
      ticketSubject: 'Sample Ticket',
      messageContent: 'This is a sample message',
      messageAuthor: 'Support Agent',
      isCustomerMessage: false,
      ticketUrl: 'http://localhost:9003/portal/support/TICKET-001',
    },
    'ticket-resolved': {
      customerName: 'John Doe',
      ticketId: 'TICKET-001',
      ticketSubject: 'Sample Ticket',
      resolutionNotes: 'Issue has been resolved',
      resolvedBy: 'Support Agent',
      ticketUrl: 'http://localhost:9003/portal/support/TICKET-001',
      surveyUrl: 'http://localhost:9003/survey/TOKEN',
    },
    'csat-survey': {
      customerName: 'John Doe',
      ticketId: 'TICKET-001',
      ticketSubject: 'Sample Ticket',
      surveyUrl: 'http://localhost:9003/survey/TOKEN',
      agentName: 'Support Agent',
    },
    'email-verification': {
      userName: 'John Doe',
      verificationUrl: 'http://localhost:9003/verify/TOKEN',
      verificationCode: '123456',
    },
    'password-reset': {
      userName: 'John Doe',
      resetUrl: 'http://localhost:9003/reset-password/TOKEN',
    },
    'welcome': {
      userName: 'John Doe',
      loginUrl: 'http://localhost:9003/login',
    },
  };

  return {
    ...baseContext,
    ...(specificContexts[templateName] || {}),
  };
}

/**
 * Main compilation function
 */
async function compileAllTemplates(): Promise<void> {
  console.log('\n🚀 Email Template Pre-Compiler\n');
  console.log(`📂 Source: ${TEMPLATES_SRC_DIR}`);
  console.log(`📂 Output: ${TEMPLATES_DIST_DIR}\n`);

  // Ensure output directory exists
  ensureDistDirectory();

  // Get all template files
  const templateFiles = getTemplateFiles();
  console.log(`📝 Found ${templateFiles.length} templates\n`);

  // Compile all templates
  const results: CompileResult[] = [];

  for (const templatePath of templateFiles) {
    const result = await compileTemplate(templatePath);
    results.push(result);
  }

  // Summary
  console.log('\n📊 Compilation Summary\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Success: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n❌ Failed templates:');
    failed.forEach(f => {
      console.log(`   - ${f.templateName}: ${f.error}`);
    });
    process.exit(1);
  }

  console.log('\n✨ All templates compiled successfully!\n');
}

// Run compilation
compileAllTemplates().catch(error => {
  console.error('\n💥 Compilation failed:', error);
  process.exit(1);
});
