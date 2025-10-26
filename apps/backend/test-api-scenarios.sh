#!/bin/bash

# ========================================
# AFFEXAI API TEST SUITE
# Comprehensive API Testing with User Scenarios
# ========================================

BASE_URL="http://localhost:9006/api"
RESULTS_FILE="api-test-results.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Initialize results file
echo "{\"tests\": [], \"summary\": {}}" > "$RESULTS_FILE"

# ========================================
# HELPER FUNCTIONS
# ========================================

log_test() {
  local test_name="$1"
  local status="$2"
  local message="$3"

  TOTAL_TESTS=$((TOTAL_TESTS + 1))

  if [ "$status" == "PASS" ]; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
    echo -e "${GREEN}✓${NC} $test_name: $message"
  else
    FAILED_TESTS=$((FAILED_TESTS + 1))
    echo -e "${RED}✗${NC} $test_name: $message"
  fi
}

api_call() {
  local method="$1"
  local endpoint="$2"
  local token="$3"
  local data="$4"

  local url="${BASE_URL}${endpoint}"

  if [ -z "$data" ]; then
    curl -s -X "$method" "$url" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json"
  else
    curl -s -X "$method" "$url" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "$data"
  fi
}

login_user() {
  local email="$1"
  local password="$2"

  local response=$(curl -s -X POST "${BASE_URL}/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$email\",\"password\":\"$password\"}")

  echo "$response" | jq -r '.data.access_token // empty'
}

# ========================================
# TEST SCENARIOS
# ========================================

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}AFFEXAI API TEST SUITE${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# ========================================
# SCENARIO 1: Authentication Flow
# ========================================
echo -e "${YELLOW}[SCENARIO 1] Authentication Flow${NC}"
echo ""

# Test 1.1: Login as Admin
ADMIN_TOKEN=$(login_user "admin@affexai.com" "Admin123!")
if [ -n "$ADMIN_TOKEN" ]; then
  log_test "1.1 Admin Login" "PASS" "Token: ${ADMIN_TOKEN:0:20}..."
else
  log_test "1.1 Admin Login" "FAIL" "No token returned"
fi

# Test 1.2: Login as Support Manager
SUPPORT_TOKEN=$(login_user "support@affexai.com" "Support123!")
if [ -n "$SUPPORT_TOKEN" ]; then
  log_test "1.2 Support Manager Login" "PASS" "Token: ${SUPPORT_TOKEN:0:20}..."
else
  log_test "1.2 Support Manager Login" "FAIL" "No token returned"
fi

# Test 1.3: Login as Customer
CUSTOMER_TOKEN=$(login_user "hazarvolga@gmail.com" "hazarvolga")
if [ -n "$CUSTOMER_TOKEN" ]; then
  log_test "1.3 Customer Login" "PASS" "Token: ${CUSTOMER_TOKEN:0:20}..."
else
  log_test "1.3 Customer Login" "FAIL" "No token returned"
fi

echo ""

# ========================================
# SCENARIO 2: RBAC Permissions Check
# ========================================
echo -e "${YELLOW}[SCENARIO 2] RBAC Permissions Check${NC}"
echo ""

# Test 2.1: Admin access to /tickets/stats/overview
RESPONSE=$(api_call "GET" "/tickets/stats/overview" "$ADMIN_TOKEN")
STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
if [ "$STATUS" == "true" ]; then
  log_test "2.1 Admin - Ticket Stats" "PASS" "Admin can access stats"
else
  ERROR=$(echo "$RESPONSE" | jq -r '.message // "Unknown error"')
  log_test "2.1 Admin - Ticket Stats" "FAIL" "Error: $ERROR"
fi

# Test 2.2: Support Manager access to /tickets/stats/overview
RESPONSE=$(api_call "GET" "/tickets/stats/overview" "$SUPPORT_TOKEN")
STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
if [ "$STATUS" == "true" ]; then
  log_test "2.2 Support Manager - Ticket Stats" "PASS" "Support manager can access stats"
else
  ERROR=$(echo "$RESPONSE" | jq -r '.message // "Unknown error"')
  log_test "2.2 Support Manager - Ticket Stats" "FAIL" "Error: $ERROR"
fi

# Test 2.3: Customer access to /tickets/stats/overview (should fail)
RESPONSE=$(api_call "GET" "/tickets/stats/overview" "$CUSTOMER_TOKEN")
STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
if [ "$STATUS" == "false" ]; then
  log_test "2.3 Customer - Ticket Stats (Denied)" "PASS" "Correctly denied access"
else
  log_test "2.3 Customer - Ticket Stats (Denied)" "FAIL" "Customer should not access admin stats"
fi

echo ""

# ========================================
# SCENARIO 3: AI Settings & Detection
# ========================================
echo -e "${YELLOW}[SCENARIO 3] AI Settings & Detection${NC}"
echo ""

# Test 3.1: Get AI Settings (Admin)
RESPONSE=$(api_call "GET" "/settings/ai" "$ADMIN_TOKEN")
STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
if [ "$STATUS" == "true" ]; then
  log_test "3.1 Get AI Settings" "PASS" "Settings retrieved"
else
  log_test "3.1 Get AI Settings" "FAIL" "Failed to get settings"
fi

# Test 3.2: Detect OpenAI Provider
RESPONSE=$(api_call "POST" "/settings/ai/detect-provider" "$ADMIN_TOKEN" '{"apiKey":"sk-proj-testkey123"}')
PROVIDER=$(echo "$RESPONSE" | jq -r '.data.provider // empty')
if [ "$PROVIDER" == "openai" ]; then
  log_test "3.2 Detect OpenAI Key" "PASS" "Detected: $PROVIDER"
else
  log_test "3.2 Detect OpenAI Key" "FAIL" "Expected 'openai', got: $PROVIDER"
fi

# Test 3.3: Detect Anthropic Provider
RESPONSE=$(api_call "POST" "/settings/ai/detect-provider" "$ADMIN_TOKEN" '{"apiKey":"sk-ant-testkey123"}')
PROVIDER=$(echo "$RESPONSE" | jq -r '.data.provider // empty')
if [ "$PROVIDER" == "anthropic" ]; then
  log_test "3.3 Detect Anthropic Key" "PASS" "Detected: $PROVIDER"
else
  log_test "3.3 Detect Anthropic Key" "FAIL" "Expected 'anthropic', got: $PROVIDER"
fi

# Test 3.4: Detect Google Provider
RESPONSE=$(api_call "POST" "/settings/ai/detect-provider" "$ADMIN_TOKEN" '{"apiKey":"AIzaSytestkey123"}')
PROVIDER=$(echo "$RESPONSE" | jq -r '.data.provider // empty')
if [ "$PROVIDER" == "google" ]; then
  log_test "3.4 Detect Google Key" "PASS" "Detected: $PROVIDER"
else
  log_test "3.4 Detect Google Key" "FAIL" "Expected 'google', got: $PROVIDER"
fi

echo ""

# ========================================
# SCENARIO 4: Ticket Creation (Customer)
# ========================================
echo -e "${YELLOW}[SCENARIO 4] Ticket Creation (Customer)${NC}"
echo ""

# Test 4.1: Create ticket as customer
TICKET_DATA='{
  "title": "Test Ticket - API Automated",
  "description": "This is a test ticket created via API automation script",
  "priority": "medium"
}'

RESPONSE=$(api_call "POST" "/tickets" "$CUSTOMER_TOKEN" "$TICKET_DATA")
STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
TICKET_ID=$(echo "$RESPONSE" | jq -r '.data.id // empty')

if [ "$STATUS" == "true" ] && [ -n "$TICKET_ID" ]; then
  log_test "4.1 Create Ticket (Customer)" "PASS" "Ticket ID: $TICKET_ID"
else
  ERROR=$(echo "$RESPONSE" | jq -r '.message // "Unknown error"')
  log_test "4.1 Create Ticket (Customer)" "FAIL" "Error: $ERROR"
fi

# Test 4.2: Get created ticket
if [ -n "$TICKET_ID" ]; then
  RESPONSE=$(api_call "GET" "/tickets/$TICKET_ID" "$CUSTOMER_TOKEN")
  STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
  if [ "$STATUS" == "true" ]; then
    log_test "4.2 Get Ticket Details" "PASS" "Retrieved ticket $TICKET_ID"
  else
    log_test "4.2 Get Ticket Details" "FAIL" "Failed to retrieve ticket"
  fi
fi

echo ""

# ========================================
# SCENARIO 5: Support Manager Workflow
# ========================================
echo -e "${YELLOW}[SCENARIO 5] Support Manager Workflow${NC}"
echo ""

# Test 5.1: List tickets (Support Manager)
RESPONSE=$(api_call "GET" "/tickets?limit=10" "$SUPPORT_TOKEN")
STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
if [ "$STATUS" == "true" ]; then
  COUNT=$(echo "$RESPONSE" | jq -r '.data | length')
  log_test "5.1 List Tickets (Support)" "PASS" "Retrieved $COUNT tickets"
else
  log_test "5.1 List Tickets (Support)" "FAIL" "Failed to list tickets"
fi

# Test 5.2: Assign ticket (if we have one)
if [ -n "$TICKET_ID" ]; then
  ASSIGN_DATA="{\"assignedTo\":\"ee381b3a-fe3b-40d7-9203-218b96d505a2\"}"
  RESPONSE=$(api_call "PATCH" "/tickets/$TICKET_ID/assign" "$SUPPORT_TOKEN" "$ASSIGN_DATA")
  STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
  if [ "$STATUS" == "true" ]; then
    log_test "5.2 Assign Ticket (Support)" "PASS" "Ticket assigned"
  else
    ERROR=$(echo "$RESPONSE" | jq -r '.message // "Unknown error"')
    log_test "5.2 Assign Ticket (Support)" "FAIL" "Error: $ERROR"
  fi
fi

echo ""

# ========================================
# SCENARIO 6: Knowledge Base
# ========================================
echo -e "${YELLOW}[SCENARIO 6] Knowledge Base${NC}"
echo ""

# Test 6.1: List KB articles (Public)
RESPONSE=$(curl -s -X GET "${BASE_URL}/knowledge-base/articles")
STATUS=$(echo "$RESPONSE" | jq -r '.success // false')
if [ "$STATUS" == "true" ]; then
  COUNT=$(echo "$RESPONSE" | jq -r '.data | length')
  log_test "6.1 List KB Articles (Public)" "PASS" "Retrieved $COUNT articles"
else
  log_test "6.1 List KB Articles (Public)" "FAIL" "Failed to list articles"
fi

echo ""

# ========================================
# SUMMARY
# ========================================
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}TEST SUMMARY${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "Total Tests: ${BLUE}$TOTAL_TESTS${NC}"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✓ All tests passed!${NC}"
  exit 0
else
  echo ""
  echo -e "${RED}✗ Some tests failed. Review the output above.${NC}"
  exit 1
fi
