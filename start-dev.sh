#!/bin/bash

# Affexai Development Server Startup Script
# Bu script backend ve frontend'i güvenli şekilde başlatır

set -e  # Hata durumunda dur

echo "🚀 Affexai Development Server Başlatılıyor..."
echo ""

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Eski process'leri temizle
echo -e "${YELLOW}🧹 Eski process'ler temizleniyor...${NC}"

# Port 9006 (Backend)
if lsof -ti:9006 > /dev/null 2>&1; then
  echo -e "${BLUE}  → Port 9006'da çalışan process bulundu, durduruluyor...${NC}"
  kill -9 $(lsof -ti:9006) 2>/dev/null || true
  sleep 2
  echo -e "${GREEN}  ✅ Port 9006 temizlendi${NC}"
else
  echo -e "${GREEN}  ✅ Port 9006 zaten boş${NC}"
fi

# Port 9003 (Frontend)
if lsof -ti:9003 > /dev/null 2>&1; then
  echo -e "${BLUE}  → Port 9003'te çalışan process bulundu, durduruluyor...${NC}"
  kill -9 $(lsof -ti:9003) 2>/dev/null || true
  sleep 2
  echo -e "${GREEN}  ✅ Port 9003 temizlendi${NC}"
else
  echo -e "${GREEN}  ✅ Port 9003 zaten boş${NC}"
fi

echo ""
echo -e "${YELLOW}🔍 Docker servisler kontrol ediliyor...${NC}"

# 2. Docker servisleri kontrol et
DOCKER_SERVICES=("affexai-postgres" "affexai-redis" "affexai-minio")
ALL_HEALTHY=true

for service in "${DOCKER_SERVICES[@]}"; do
  if docker ps --filter "name=$service" --filter "health=healthy" --format "{{.Names}}" | grep -q "$service"; then
    echo -e "${GREEN}  ✅ $service (healthy)${NC}"
  else
    echo -e "${RED}  ❌ $service (not healthy)${NC}"
    ALL_HEALTHY=false
  fi
done

if [ "$ALL_HEALTHY" = false ]; then
  echo ""
  echo -e "${RED}⚠️  Docker servisleri hazır değil!${NC}"
  echo -e "${YELLOW}Docker servislerini başlatmak için: npm run docker:up${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}📦 Dependencies kontrol ediliyor...${NC}"

# 3. Dependencies kontrol et
if [ ! -d "node_modules" ]; then
  echo -e "${BLUE}  → node_modules bulunamadı, npm install çalıştırılıyor...${NC}"
  npm install
  echo -e "${GREEN}  ✅ Dependencies yüklendi${NC}"
else
  echo -e "${GREEN}  ✅ node_modules mevcut${NC}"
fi

echo ""
echo -e "${GREEN}🎯 Backend başlatılıyor (Port 9006)...${NC}"

# 4. Backend'i background'da başlat
cd apps/backend
npm run start:dev > ../../backend.log 2>&1 &
BACKEND_PID=$!
cd ../..

echo -e "${BLUE}  → Backend PID: $BACKEND_PID${NC}"
echo -e "${BLUE}  → Backend logları: backend.log${NC}"

# Backend'in başlamasını bekle (max 30 saniye)
echo -e "${YELLOW}  ⏳ Backend'in hazır olması bekleniyor...${NC}"
COUNTER=0
MAX_WAIT=30

while [ $COUNTER -lt $MAX_WAIT ]; do
  if curl -s http://localhost:9006/api > /dev/null 2>&1; then
    echo -e "${GREEN}  ✅ Backend hazır! (${COUNTER}s)${NC}"
    break
  fi

  # Backend process hala çalışıyor mu kontrol et
  if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}  ❌ Backend başlatılamadı! Log kontrol edin: tail backend.log${NC}"
    exit 1
  fi

  sleep 1
  COUNTER=$((COUNTER + 1))
  echo -ne "  \r  ⏳ Bekleniyor... ${COUNTER}s"
done

if [ $COUNTER -eq $MAX_WAIT ]; then
  echo ""
  echo -e "${RED}  ❌ Backend timeout! Log kontrol edin: tail backend.log${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}🎨 Frontend başlatılıyor (Port 9003)...${NC}"

# 5. Frontend'i background'da başlat
cd apps/frontend
npm run dev > ../../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ../..

echo -e "${BLUE}  → Frontend PID: $FRONTEND_PID${NC}"
echo -e "${BLUE}  → Frontend logları: frontend.log${NC}"

# Frontend'in başlamasını bekle (max 30 saniye)
echo -e "${YELLOW}  ⏳ Frontend'in hazır olması bekleniyor...${NC}"
COUNTER=0

while [ $COUNTER -lt $MAX_WAIT ]; do
  if curl -s http://localhost:9003 > /dev/null 2>&1; then
    echo -e "${GREEN}  ✅ Frontend hazır! (${COUNTER}s)${NC}"
    break
  fi

  # Frontend process hala çalışıyor mu kontrol et
  if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo -e "${RED}  ❌ Frontend başlatılamadı! Log kontrol edin: tail frontend.log${NC}"
    exit 1
  fi

  sleep 1
  COUNTER=$((COUNTER + 1))
  echo -ne "  \r  ⏳ Bekleniyor... ${COUNTER}s"
done

if [ $COUNTER -eq $MAX_WAIT ]; then
  echo ""
  echo -e "${RED}  ❌ Frontend timeout! Log kontrol edin: tail frontend.log${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ Affexai Development Server Başarıyla Başlatıldı! ✨${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📊 Servis Durumu:${NC}"
echo -e "  Backend API:  ${GREEN}http://localhost:9006/api${NC} (PID: $BACKEND_PID)"
echo -e "  Frontend:     ${GREEN}http://localhost:9003${NC} (PID: $FRONTEND_PID)"
echo -e "  PostgreSQL:   ${GREEN}localhost:5434${NC}"
echo -e "  Redis:        ${GREEN}localhost:6380${NC}"
echo -e "  MinIO:        ${GREEN}localhost:9007${NC}"
echo ""
echo -e "${YELLOW}📝 Loglar:${NC}"
echo -e "  Backend:  ${BLUE}tail -f backend.log${NC}"
echo -e "  Frontend: ${BLUE}tail -f frontend.log${NC}"
echo ""
echo -e "${YELLOW}🛑 Durdurmak için:${NC}"
echo -e "  ${BLUE}./stop-dev.sh${NC} veya ${BLUE}kill $BACKEND_PID $FRONTEND_PID${NC}"
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo ""

# PID'leri kaydet
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid

# Keep script running to show logs
echo -e "${YELLOW}📊 Canlı loglar (Ctrl+C ile çıkış):${NC}"
echo ""

trap 'echo ""; echo "Servisler arka planda çalışmaya devam ediyor..."; exit 0' INT

tail -f backend.log frontend.log
