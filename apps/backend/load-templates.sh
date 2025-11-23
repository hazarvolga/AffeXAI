#!/bin/bash

# Load Standard template
echo "Loading Standard template..."
STANDARD_HTML=$(cat src/modules/certificates/templates/standard.html | jq -Rs .)
curl -X POST http://localhost:9005/api/certificates/templates \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Standard\",
    \"description\": \"Standart Türkçe sertifika tasarımı\",
    \"htmlContent\": $STANDARD_HTML,
    \"isActive\": true,
    \"orientation\": \"landscape\",
    \"pageFormat\": \"A4\"
  }" | jq '.success'

echo ""
# Load Premium template
echo "Loading Premium template..."
PREMIUM_HTML=$(cat src/modules/certificates/templates/premium.html | jq -Rs .)
curl -X POST http://localhost:9005/api/certificates/templates \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Premium\",
    \"description\": \"Premium Türkçe sertifika tasarımı\",
    \"htmlContent\": $PREMIUM_HTML,
    \"isActive\": true,
    \"orientation\": \"landscape\",
    \"pageFormat\": \"A4\"
  }" | jq '.success'

echo ""
echo "Loading Executive template..."
EXECUTIVE_HTML=$(cat src/modules/certificates/templates/executive.html | jq -Rs .)
curl -X POST http://localhost:9005/api/certificates/templates \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Executive\",
    \"description\": \"Executive Türkçe sertifika tasarımı\",
    \"htmlContent\": $EXECUTIVE_HTML,
    \"isActive\": true,
    \"orientation\": \"landscape\",
    \"pageFormat\": \"A4\"
  }" | jq '.success'

echo ""
echo "All templates loaded successfully!"
