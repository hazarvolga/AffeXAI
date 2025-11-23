#!/bin/bash

echo "Testing ticket creation..."

# Get token
TOKEN=$(curl -s -X POST http://localhost:9006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@affexai.com","password":"Admin123!"}' | jq -r '.data.access_token')

echo "Token obtained: ${TOKEN:0:30}..."

# Create ticket
curl -s -X POST http://localhost:9006/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Test Ticket","description":"Testing","priority":"medium"}' | jq '.'
