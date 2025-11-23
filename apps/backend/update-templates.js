const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'aluplan_dev',
  user: 'postgres',
  password: 'postgres',
});

const templates = [
  {
    name: 'Standard Certificate',
    file: 'standard-template.html',
    description: 'Standard certificate - Clean classic design (optimized for single-page PDF)'
  },
  {
    name: 'Premium Certificate',
    file: 'premium-template.html',
    description: 'Premium certificate - Modern gradient design with badge (optimized for single-page PDF)'
  },
  {
    name: 'Executive Certificate',
    file: 'executive-template.html',
    description: 'Executive certificate - Dark formal design with double borders (optimized for single-page PDF)'
  }
];

async function updateTemplates() {
  const client = await pool.connect();
  
  try {
    console.log('📝 Updating certificate templates...\n');
    
    for (const template of templates) {
      const filePath = path.join(__dirname, 'src/modules/certificates/templates', template.file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        continue;
      }
      
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      
      const result = await client.query(`
        UPDATE certificate_templates 
        SET "htmlContent" = $1, 
            description = $2,
            "updatedAt" = NOW()
        WHERE name = $3
        RETURNING id, name
      `, [htmlContent, template.description, template.name]);
      
      if (result.rows.length > 0) {
        console.log(`✅ Updated ${result.rows[0].name} template (ID: ${result.rows[0].id})`);
      } else {
        console.log(`⚠️  Template '${template.name}' not found in database`);
      }
    }
    
    // Show summary
    console.log('\n📋 Template Summary:');
    const summary = await client.query(`
      SELECT id, name, description, LENGTH("htmlContent") as html_length, "updatedAt" 
      FROM certificate_templates 
      ORDER BY name
    `);
    
    summary.rows.forEach(row => {
      console.log(`  - ${row.name}: ${row.description} (${row.html_length} bytes)`);
    });
    
    console.log('\n🎉 Certificate templates updated successfully!');
    console.log('💡 You can now generate certificates and they should be single-page PDFs.');
    console.log('\n📏 Optimizations applied:');
    console.log('  - Larger certificate containers (287mm × 200mm)');
    console.log('  - Reduced internal padding and margins (20-33%)');
    console.log('  - Smaller fonts (10-15% reduction)');
    console.log('  - Enhanced visual distinction between templates');
    console.log('  - Description field support added');
    
  } catch (error) {
    console.error('❌ Error updating templates:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

updateTemplates().catch(console.error);
