const { Client } = require('pg');
const readline = require('readline');

const client = new Client({
  host: 'localhost',
  port: 5434,
  database: 'affexai_dev',
  user: 'postgres',
  password: 'postgres',
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function addApiKeys() {
  try {
    console.log('🔑 API Key Configuration\n');
    console.log('This will configure your API keys for:');
    console.log('  1. Email sending (Resend)');
    console.log('  2. AI features (OpenAI/Anthropic/Google)\n');

    await client.connect();
    console.log('✅ Connected to database\n');

    // Check current settings
    const currentSettings = await client.query(`
      SELECT category, key, value, is_encrypted
      FROM settings
      WHERE (category = 'ai' AND key = 'global.apiKey')
         OR (category = 'email')
      ORDER BY category, key
    `);

    if (currentSettings.rows.length > 0) {
      console.log('📋 Current settings:');
      console.table(currentSettings.rows.map(r => ({
        category: r.category,
        key: r.key,
        hasValue: r.value ? '✅ Set' : '❌ Empty',
        encrypted: r.is_encrypted ? '🔒' : '🔓'
      })));
      console.log('');
    }

    // === EMAIL SETTINGS ===
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 EMAIL CONFIGURATION (Resend)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const useEmail = await question('Do you want to configure email? (y/n): ');

    if (useEmail.toLowerCase() === 'y') {
      console.log('\n📝 Enter Resend API key (or press Enter to skip):');
      console.log('   Get your key from: https://resend.com/api-keys\n');

      const resendKey = await question('Resend API Key: ');

      if (resendKey && resendKey.trim()) {
        // Delete existing email settings
        await client.query("DELETE FROM settings WHERE category = 'email'");

        // Insert email settings (encryption will be handled by entity hooks)
        const emailSettings = [
          { key: 'provider', value: 'resend', encrypted: false },
          { key: 'provider.apiKey', value: resendKey.trim(), encrypted: true },
          { key: 'from.name', value: 'Affexai Platform', encrypted: false },
          { key: 'from.email', value: 'noreply@affexai.com', encrypted: false },
          { key: 'replyTo.email', value: 'support@affexai.com', encrypted: false },
        ];

        for (const setting of emailSettings) {
          await client.query(`
            INSERT INTO settings (id, category, key, value, is_encrypted, created_at, updated_at)
            VALUES (uuid_generate_v4(), 'email', $1, $2, $3, NOW(), NOW())
          `, [setting.key, setting.value, setting.encrypted]);
        }

        console.log('\n✅ Email settings configured!');
        console.log('   Provider: Resend');
        console.log('   From: Affexai Platform <noreply@affexai.com>');
      } else {
        console.log('\n⏭️  Skipped email configuration');
      }
    } else {
      console.log('\n⏭️  Skipped email configuration');
    }

    // === AI SETTINGS ===
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🤖 AI CONFIGURATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const useAI = await question('Do you want to configure AI? (y/n): ');

    if (useAI.toLowerCase() === 'y') {
      console.log('\n📝 Choose AI Provider:');
      console.log('   1. OpenAI (GPT-4, GPT-4o)');
      console.log('   2. Anthropic (Claude 3.5 Sonnet)');
      console.log('   3. Google (Gemini Pro)');
      console.log('   4. Skip\n');

      const providerChoice = await question('Enter choice (1-4): ');

      let provider, model, apiKey;

      switch(providerChoice) {
        case '1':
          provider = 'openai';
          console.log('\n📝 Choose OpenAI Model:');
          console.log('   1. gpt-4o (Recommended - Fast & Smart)');
          console.log('   2. gpt-4-turbo');
          console.log('   3. gpt-3.5-turbo\n');
          const modelChoice = await question('Enter choice (1-3): ');
          model = modelChoice === '1' ? 'gpt-4o' :
                  modelChoice === '2' ? 'gpt-4-turbo' : 'gpt-3.5-turbo';
          console.log(`\n📝 Enter OpenAI API key:`);
          console.log(`   Get your key from: https://platform.openai.com/api-keys\n`);
          apiKey = await question('OpenAI API Key: ');
          break;

        case '2':
          provider = 'anthropic';
          model = 'claude-3-5-sonnet-20241022';
          console.log(`\n📝 Enter Anthropic API key:`);
          console.log(`   Get your key from: https://console.anthropic.com/\n`);
          apiKey = await question('Anthropic API Key: ');
          break;

        case '3':
          provider = 'google';
          model = 'gemini-pro';
          console.log(`\n📝 Enter Google AI API key:`);
          console.log(`   Get your key from: https://makersuite.google.com/app/apikey\n`);
          apiKey = await question('Google AI API Key: ');
          break;

        default:
          console.log('\n⏭️  Skipped AI configuration');
          provider = null;
      }

      if (provider && apiKey && apiKey.trim()) {
        // Update AI settings
        await client.query(`
          UPDATE settings
          SET value = $1, updated_at = NOW()
          WHERE category = 'ai' AND key = 'global.apiKey'
        `, [apiKey.trim()]);

        await client.query(`
          UPDATE settings
          SET value = $1, updated_at = NOW()
          WHERE category = 'ai' AND key = 'global.model'
        `, [model]);

        console.log(`\n✅ AI settings configured!`);
        console.log(`   Provider: ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
        console.log(`   Model: ${model}`);
      }
    } else {
      console.log('\n⏭️  Skipped AI configuration');
    }

    // === SUMMARY ===
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 CONFIGURATION SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const finalSettings = await client.query(`
      SELECT category, key,
             CASE
               WHEN value IS NOT NULL AND value != '' THEN '✅ Configured'
               ELSE '❌ Not Set'
             END as status,
             is_encrypted
      FROM settings
      WHERE category IN ('email', 'ai')
      ORDER BY category, key
    `);

    console.table(finalSettings.rows);

    // Check what features are now enabled
    const emailEnabled = await client.query(`
      SELECT COUNT(*) as count FROM settings
      WHERE category = 'email' AND key = 'provider.apiKey'
      AND value IS NOT NULL AND value != ''
    `);

    const aiEnabled = await client.query(`
      SELECT COUNT(*) as count FROM settings
      WHERE category = 'ai' AND key = 'global.apiKey'
      AND value IS NOT NULL AND value != ''
    `);

    console.log('\n🎯 ENABLED FEATURES:\n');

    if (parseInt(emailEnabled.rows[0].count) > 0) {
      console.log('✅ Email Sending');
      console.log('   - Welcome emails');
      console.log('   - Password reset');
      console.log('   - Certificate delivery');
      console.log('   - Ticket notifications');
      console.log('   - Email campaigns\n');
    } else {
      console.log('❌ Email Sending (not configured)\n');
    }

    if (parseInt(aiEnabled.rows[0].count) > 0) {
      console.log('✅ AI Features');
      console.log('   - AI Chatbot');
      console.log('   - FAQ Learning');
      console.log('   - Smart ticket categorization');
      console.log('   - Email content generation\n');
    } else {
      console.log('❌ AI Features (not configured)\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Configuration complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Restart backend: cd apps/backend && npm run start:dev');
    console.log('   2. Test features in the application');
    console.log('   3. Check logs for any errors\n');

    await client.end();
    rl.close();

  } catch (error) {
    console.error('❌ Error configuring API keys:', error);
    rl.close();
    process.exit(1);
  }
}

addApiKeys();
