#!/bin/bash

# Affexai Development Server Stop Script
# Bu script backend ve frontend'i güvenli şekilde durdurur

echo "🛑 Affexai Development Server Durduruluyor..."
echo ""

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. PID dosyalarından process'leri durdur
if [ -f ".backend.pid" ]; then
  BACKEND_PID=$(cat .backend.pid)
  echo -e "${BLUE}🔧 Backend durduruluyor (PID: $BACKEND_PID)...${NC}"

  if kill -0 $BACKEND_PID 2>/dev/null; then
    kill -9 $BACKEND_PID 2>/dev/null
    echo -e "${GREEN}  ✅ Backend durduruldu${NC}"
  else
    echo -e "${YELLOW}  ⚠️  Backend zaten çalışmıyor${NC}"
  fi

  rm .backend.pid
else
  echo -e "${YELLOW}⚠️  .backend.pid dosyası bulunamadı${NC}"
fi

if [ -f ".frontend.pid" ]; then
  FRONTEND_PID=$(cat .frontend.pid)
  echo -e "${BLUE}🔧 Frontend durduruluyor (PID: $FRONTEND_PID)...${NC}"

  if kill -0 $FRONTEND_PID 2>/dev/null; then
    kill -9 $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}  ✅ Frontend durduruldu${NC}"
  else
    echo -e "${YELLOW}  ⚠️  Frontend zaten çalışmıyor${NC}"
  fi

  rm .frontend.pid
else
  echo -e "${YELLOW}⚠️  .frontend.pid dosyası bulunamadı${NC}"
fi

echo ""
echo -e "${BLUE}🔍 Port kontrolü yapılıyor...${NC}"

# 2. Port'ları kontrol et ve gerekirse temizle
if lsof -ti:9006 > /dev/null 2>&1; then
  echo -e "${YELLOW}  → Port 9006'da hala process var, temizleniyor...${NC}"
  kill -9 $(lsof -ti:9006) 2>/dev/null || true
  echo -e "${GREEN}  ✅ Port 9006 temizlendi${NC}"
else
  echo -e "${GREEN}  ✅ Port 9006 boş${NC}"
fi

if lsof -ti:9003 > /dev/null 2>&1; then
  echo -e "${YELLOW}  → Port 9003'te hala process var, temizleniyor...${NC}"
  kill -9 $(lsof -ti:9003) 2>/dev/null || true
  echo -e "${GREEN}  ✅ Port 9003 temizlendi${NC}"
else
  echo -e "${GREEN}  ✅ Port 9003 boş${NC}"
fi

echo ""
echo -e "${GREEN}✅ Tüm servisler durduruldu!${NC}"
echo ""
echo -e "${YELLOW}📝 Not: Docker servisleri çalışmaya devam ediyor.${NC}"
echo -e "${YELLOW}Docker'ı durdurmak için: ${BLUE}npm run docker:down${NC}"
echo ""
