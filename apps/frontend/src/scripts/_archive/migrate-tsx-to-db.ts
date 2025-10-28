/**
 * Migration Script: TSX Templates → Database MJML Structures
 *
 * Converts 20 file-based React Email (TSX) templates to database records
 * with MJML-compatible Email Builder structures.
 *
 * Phase 2 & 3 of Email Template Architecture Migration
 */

import { generateSmartStructure } from '../lib/email-template-designer';

// Template inventory with extracted metadata
const TSX_TEMPLATES = [
  {
    name: 'Abandoned Cart',
    fileName: 'abandoned-cart.tsx',
    description: 'Sepetinizde unutulan ürünleri hatırlatma emaili. Ürün resimleri ve checkout linki içerir.',
    type: 'promotional',
    variables: {
      userName: 'string',
      cartItems: 'array<{name: string, imageUrl: string, price: string}>',
      checkoutLink: 'string'
    },
    category: 'E-commerce',
    turkish: true
  },
  {
    name: 'Back in Stock',
    fileName: 'back-in-stock.tsx',
    description: 'Stokta olmayan ürünün tekrar mevcut olduğunu bildiren email.',
    type: 'transactional',
    variables: {
      userName: 'string',
      productName: 'string',
      productImageUrl: 'string',
      productPrice: 'string',
      productLink: 'string'
    },
    category: 'E-commerce',
    turkish: true
  },
  {
    name: 'Birthday Special',
    fileName: 'birthday-special.tsx',
    description: 'Doğum günü kutlaması ve özel indirim kodu içeren email.',
    type: 'promotional',
    variables: {
      userName: 'string',
      discountCode: 'string',
      discountAmount: 'string',
      expiryDate: 'string'
    },
    category: 'Marketing',
    turkish: true
  },
  {
    name: 'Cross-sell',
    fileName: 'cross-sell.tsx',
    description: 'Satın alınan ürünle ilgili tamamlayıcı ürün önerileri.',
    type: 'promotional',
    variables: {
      userName: 'string',
      purchasedProduct: 'string',
      recommendedProducts: 'array<{name: string, price: string, imageUrl: string}>'
    },
    category: 'E-commerce',
    turkish: true
  },
  {
    name: 'Flash Sale',
    fileName: 'flash-sale.tsx',
    description: 'Kısa süreli özel indirim kampanyası duyurusu.',
    type: 'promotional',
    variables: {
      saleName: 'string',
      discountPercentage: 'number',
      endTime: 'string',
      featuredProducts: 'array<{name: string, price: string, salePrice: string}>'
    },
    category: 'Marketing',
    turkish: true
  },
  {
    name: 'Loyalty Program',
    fileName: 'loyalty-program.tsx',
    description: 'Sadakat programı bilgilendirmesi ve puan durumu.',
    type: 'transactional',
    variables: {
      userName: 'string',
      currentPoints: 'number',
      nextRewardPoints: 'number',
      availableRewards: 'array<{name: string, pointCost: number}>'
    },
    category: 'Customer Engagement',
    turkish: true
  },
  {
    name: 'Monthly Newsletter',
    fileName: 'monthly-newsletter.tsx',
    description: 'Aylık haber bülteni - ana hikaye ve yan içerikler.',
    type: 'newsletter',
    variables: {
      headline: 'string',
      mainStory: 'object<{title: string, excerpt: string, imageUrl: string, ctaText: string, ctaLink: string}>',
      secondaryStories: 'array<{title: string, excerpt: string, ctaText: string, ctaLink: string}>'
    },
    category: 'Content',
    turkish: true
  },
  {
    name: 'New Feature Announcement',
    fileName: 'new-feature-announcement.tsx',
    description: 'Yeni ürün özelliği veya güncelleme duyurusu.',
    type: 'transactional',
    variables: {
      featureName: 'string',
      featureDescription: 'string',
      featureImageUrl: 'string',
      learnMoreLink: 'string'
    },
    category: 'Product Updates',
    turkish: true
  },
  {
    name: 'Price Drop Alert',
    fileName: 'price-drop-alert.tsx',
    description: 'İzlenen ürünün fiyat düşüşü bildirimi.',
    type: 'transactional',
    variables: {
      userName: 'string',
      productName: 'string',
      oldPrice: 'string',
      newPrice: 'string',
      savingsAmount: 'string',
      productLink: 'string'
    },
    category: 'E-commerce',
    turkish: true
  },
  {
    name: 'Product Launch',
    fileName: 'product-launch.tsx',
    description: 'Yeni ürün lansmanı duyurusu.',
    type: 'promotional',
    variables: {
      productName: 'string',
      productDescription: 'string',
      productImageUrl: 'string',
      launchDate: 'string',
      preOrderLink: 'string'
    },
    category: 'Marketing',
    turkish: true
  },
  {
    name: 'Product Recommendation',
    fileName: 'product-recommendation.tsx',
    description: 'Kişiselleştirilmiş ürün önerileri.',
    type: 'promotional',
    variables: {
      userName: 'string',
      recommendedProducts: 'array<{name: string, price: string, imageUrl: string, reason: string}>'
    },
    category: 'E-commerce',
    turkish: true
  },
  {
    name: 'Product Update',
    fileName: 'product-update.tsx',
    description: 'Mevcut ürün güncellemeleri ve iyileştirmeler.',
    type: 'transactional',
    variables: {
      productName: 'string',
      updateSummary: 'string',
      updateDetails: 'array<string>',
      changelogLink: 'string'
    },
    category: 'Product Updates',
    turkish: true
  },
  {
    name: 'Re-engagement',
    fileName: 're-engagement.tsx',
    description: 'Uzun süredir aktif olmayan kullanıcıları geri kazanma.',
    type: 'promotional',
    variables: {
      userName: 'string',
      lastActivityDate: 'string',
      specialOffer: 'string',
      ctaLink: 'string'
    },
    category: 'Customer Engagement',
    turkish: true
  },
  {
    name: 'Referral Program',
    fileName: 'referral-program.tsx',
    description: 'Arkadaş tavsiye programı bilgilendirmesi.',
    type: 'promotional',
    variables: {
      userName: 'string',
      referralCode: 'string',
      referrerReward: 'string',
      refereeReward: 'string',
      shareLink: 'string'
    },
    category: 'Marketing',
    turkish: true
  },
  {
    name: 'Seasonal Campaign',
    fileName: 'seasonal-campaign.tsx',
    description: 'Mevsimsel kampanya (yılbaşı, bayram, vb.).',
    type: 'promotional',
    variables: {
      seasonName: 'string',
      campaignTitle: 'string',
      discountDetails: 'string',
      featuredProducts: 'array<{name: string, price: string, imageUrl: string}>'
    },
    category: 'Marketing',
    turkish: true
  },
  {
    name: 'Survey & Feedback',
    fileName: 'survey-feedback.tsx',
    description: 'Müşteri memnuniyeti anketi talebi.',
    type: 'transactional',
    variables: {
      userName: 'string',
      surveyTitle: 'string',
      surveyDescription: 'string',
      surveyLink: 'string',
      incentive: 'string'
    },
    category: 'Customer Engagement',
    turkish: true
  },
  {
    name: 'Upsell',
    fileName: 'upsell.tsx',
    description: 'Mevcut ürünün premium versiyonu veya eklentiler.',
    type: 'promotional',
    variables: {
      userName: 'string',
      currentProduct: 'string',
      upsellProduct: 'string',
      benefits: 'array<string>',
      upgradeLink: 'string'
    },
    category: 'E-commerce',
    turkish: true
  },
  {
    name: 'Weekly Digest',
    fileName: 'weekly-digest.tsx',
    description: 'Haftalık özet - toplam aktivite ve önemli bilgiler.',
    type: 'newsletter',
    variables: {
      userName: 'string',
      weekRange: 'string',
      highlights: 'array<{title: string, description: string, link: string}>',
      stats: 'object<{key: string, value: string}>'
    },
    category: 'Content',
    turkish: true
  },
  {
    name: 'Welcome Email',
    fileName: 'welcome-email.tsx',
    description: 'Yeni kullanıcı karşılama emaili. Hesap bilgileri ve başlangıç adımları.',
    type: 'welcome',
    variables: {
      userName: 'string',
      userEmail: 'string',
      loginUrl: 'string',
      gettingStartedUrl: 'string',
      supportUrl: 'string'
    },
    category: 'Onboarding',
    turkish: true
  },
  {
    name: 'Win-back Campaign',
    fileName: 'win-back.tsx',
    description: 'Kaybedilen müşterileri geri kazanma kampanyası.',
    type: 'promotional',
    variables: {
      userName: 'string',
      specialOffer: 'string',
      expiryDate: 'string',
      whyComeback: 'array<string>',
      ctaLink: 'string'
    },
    category: 'Customer Engagement',
    turkish: true
  }
];

async function migrateTemplate(template: typeof TSX_TEMPLATES[0]) {
  console.log(`\n📧 Migrating: ${template.name} (${template.fileName})`);

  // Generate MJML-compatible Email Builder structure
  const structure = generateSmartStructure({
    name: template.name,
    type: template.type as any,
    description: template.description
  });

  // Create database record
  const payload = {
    name: template.name,
    description: template.description,
    type: 'custom', // TemplateType.CUSTOM
    structure: structure,
    variables: template.variables,
    isActive: true,
    thumbnailUrl: `/images/templates/${template.fileName.replace('.tsx', '.png')}`, // Placeholder
    fileTemplateName: null // Not file-based anymore
  };

  try {
    const response = await fetch('http://localhost:9006/api/email-templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Success: Database ID ${result.id || result.data?.id}`);

    return { success: true, template: template.name, result };
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    return { success: false, template: template.name, error: error.message };
  }
}

async function runMigration() {
  console.log('🚀 Starting TSX → Database Migration');
  console.log(`📊 Total templates to migrate: ${TSX_TEMPLATES.length}`);
  console.log('=' .repeat(60));

  const results = [];

  for (const template of TSX_TEMPLATES) {
    const result = await migrateTemplate(template);
    results.push(result);

    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📈 Migration Summary:');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Successful: ${successful}/${TSX_TEMPLATES.length}`);
  console.log(`❌ Failed: ${failed}/${TSX_TEMPLATES.length}`);

  if (failed > 0) {
    console.log('\n❌ Failed Templates:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.template}: ${r.error}`);
    });
  }

  console.log('\n✨ Migration complete!');
  console.log('Next steps:');
  console.log('  1. Verify all templates in admin panel');
  console.log('  2. Test preview and editing capabilities');
  console.log('  3. Update backend services to remove file-based fallback');
}

// Execute migration
runMigration().catch(console.error);
