#!/usr/bin/env node

/**
 * Script to help update email templates to use the standardized EmailFooter component
 * 
 * Usage: node scripts/update-email-footers.js
 */

const fs = require('fs');
const path = require('path');

// Email templates directory
const EMAILS_DIR = path.join(__dirname, '..', 'src', 'emails');
const COMPONENTS_DIR = path.join(EMAILS_DIR, 'components');

// Templates that have already been updated
const UPDATED_TEMPLATES = [
  'welcome.tsx',
  'monthly-newsletter.tsx',
  'subscription-renewal.tsx',
  'password-reset.tsx',
  'account-summary.tsx'
];

// Templates that should not show unsubscribe links (informational emails)
const NO_UNSUBSCRIBE_TEMPLATES = [
  'account-summary.tsx',
  'order-confirmation.tsx',
  'invoice.tsx'
];

// Function to check if a template has been updated
function isTemplateUpdated(templateName) {
  return UPDATED_TEMPLATES.includes(templateName);
}

// Function to check if a template should show unsubscribe link
function shouldShowUnsubscribe(templateName) {
  return !NO_UNSUBSCRIBE_TEMPLATES.includes(templateName);
}

// Function to get all email template files
function getEmailTemplates() {
  const files = fs.readdirSync(EMAILS_DIR);
  return files.filter(file => 
    file.endsWith('.tsx') && 
    file !== 'test-social-links.tsx' && 
    !file.includes('components')
  );
}

// Function to update a single template
function updateTemplate(templateName) {
  if (isTemplateUpdated(templateName)) {
    console.log(`✓ ${templateName} already updated`);
    return;
  }

  const templatePath = path.join(EMAILS_DIR, templateName);
  let content = fs.readFileSync(templatePath, 'utf8');

  try {
    // Add import for EmailFooter component
    if (!content.includes('EmailFooter')) {
      // Find the last import statement
      const importRegex = /import\s+{[^}]*}[^;]*from\s+["'][^"']*["'];/g;
      let lastImportMatch;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        lastImportMatch = match;
      }
      
      if (lastImportMatch) {
        const insertPos = lastImportMatch.index + lastImportMatch[0].length;
        content = content.slice(0, insertPos) + 
                  `\nimport { EmailFooter } from "./components/EmailFooter";` + 
                  content.slice(insertPos);
      }
    }

    // Remove old footer styles (this is a simplified approach)
    // In a real implementation, you'd want to be more precise about this
    content = content.replace(/\nconst (footer|socialContainer|socialIconColumn|footerText|footerLink|hr)[\s\S]*?};/g, '');

    // Replace old footer implementation with new component
    // This is a simplified pattern - in practice you'd need more precise regex
    const showUnsubscribe = shouldShowUnsubscribe(templateName);
    
    console.log(`  Updated ${templateName}`);
  } catch (error) {
    console.error(`  Error updating ${templateName}:`, error.message);
  }
}

// Main function
function main() {
  console.log('Email Footer Standardization Script');
  console.log('====================================\n');

  // Check if components directory exists
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.log('Creating components directory...');
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
  }

  // Get all email templates
  const templates = getEmailTemplates();
  
  console.log(`Found ${templates.length} email templates`);
  console.log(`Already updated: ${UPDATED_TEMPLATES.length} templates\n`);

  // Show templates that still need to be updated
  const remainingTemplates = templates.filter(template => !isTemplateUpdated(template));
  console.log('Templates needing updates:');
  remainingTemplates.forEach(template => console.log(`  - ${template}`));
  
  console.log(`\n${remainingTemplates.length} templates still need manual updates`);
  console.log('\nTo update templates manually:');
  console.log('1. Add import: import { EmailFooter } from "./components/EmailFooter";');
  console.log('2. Replace footer section with: <EmailFooter ... />');
  console.log('3. Remove footer-related styles');
  console.log('4. Add socialMediaLinks to siteSettings interface if missing');
  console.log('5. Add socialMediaLinks to component props if missing');

  console.log('\nRefer to the updated templates for examples:');
  UPDATED_TEMPLATES.forEach(template => console.log(`  - ${template}`));
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  isTemplateUpdated,
  shouldShowUnsubscribe,
  getEmailTemplates,
  updateTemplate
};