#!/usr/bin/env python3
import psycopg2
import os
from pathlib import Path

# Database connection
conn = psycopg2.connect(
    dbname="aluplan_dev",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5433"
)

cur = conn.cursor()

# Template files
templates_dir = Path(__file__).parent / "src/modules/certificates/templates"

templates = [
    {
        "name": "Default",
        "file": "standard-template.html",
        "description": "Standard certificate - Clean classic design (optimized for single-page PDF)"
    },
    {
        "name": "Premium",
        "file": "premium-template.html",
        "description": "Premium certificate - Modern gradient design with badge (optimized for single-page PDF)"
    },
    {
        "name": "Executive",
        "file": "executive-template.html",
        "description": "Executive certificate - Dark formal design with double borders (optimized for single-page PDF)"
    }
]

print("📝 Updating certificate templates...")

for template in templates:
    file_path = templates_dir / template["file"]
    
    if not file_path.exists():
        print(f"⚠️  File not found: {file_path}")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    cur.execute("""
        UPDATE certificate_templates 
        SET html_content = %s, 
            description = %s,
            updated_at = NOW()
        WHERE name = %s
        RETURNING id, name
    """, (html_content, template["description"], template["name"]))
    
    result = cur.fetchone()
    if result:
        print(f"✅ Updated {result[1]} template (ID: {result[0]})")
    else:
        print(f"⚠️  Template '{template['name']}' not found in database")

conn.commit()

# Show updated templates
print("\n📋 Template Summary:")
cur.execute("""
    SELECT id, name, description, LENGTH(html_content) as html_length, updated_at 
    FROM certificate_templates 
    ORDER BY name
""")

for row in cur.fetchall():
    print(f"  - {row[1]}: {row[2]} ({row[3]} bytes)")

cur.close()
conn.close()

print("\n🎉 Certificate templates updated successfully!")
print("💡 You can now generate certificates and they should be single-page PDFs.")
