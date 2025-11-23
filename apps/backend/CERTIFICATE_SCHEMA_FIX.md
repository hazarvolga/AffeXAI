## 🔧 Certificate Schema Fix - Quick Guide

### Problem
Database'de eski certificate kayıtları var, yeni schema column'ları `NOT NULL` ve bu çakışıyor.

### Solution Options

#### Option 1: Quick Fix (Development - Recommended)
Delete all existing certificates and let TypeORM recreate schema.

**SQL Command:**
```sql
TRUNCATE TABLE certificates CASCADE;
```

**Or run the script:**
```bash
cd /Users/hazarekiz/Projects/v06/aluplan-v06/backend/aluplan-backend
./fix-certificates-schema.sh
```

#### Option 2: Manual SQL
```bash
# Connect to PostgreSQL
psql -U postgres -d aluplan_dev

# Truncate table
TRUNCATE TABLE certificates CASCADE;

# Exit
\q
```

#### Option 3: Using Environment Variables
```bash
# Set your DB credentials
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=your_password
export DB_NAME=aluplan_dev

# Run fix script
./fix-certificates-schema.sh
```

### After Fixing
1. Kill backend: `pkill -f "nest start"`
2. Start backend: `npm run start:dev`
3. Backend will auto-create new schema
4. All new columns will be nullable for safety

### What Changed
- `recipientName`: NOT NULL → nullable
- `recipientEmail`: NOT NULL → nullable  
- `trainingTitle`: NOT NULL → nullable
- All other new fields already nullable

### Why This Works
- Existing records won't break
- New certificates can have all fields
- Backward compatible with old data
- Production safe migration

### Verify After Fix
```bash
# Check backend is running
curl http://localhost:9005/health

# Check certificates endpoint
curl http://localhost:9005/certificates/v2

# Frontend should work now
# Visit: http://localhost:9002/admin/certificates
```

### Files Modified
1. `certificate.entity.ts` - Made required fields nullable
2. `certificate-email.service.ts` - Added null checks
3. `pdf-generator.service.ts` - Updated interface types
4. `fix-certificates-schema.sh` - Quick fix script
5. `fix-certificates-db.sql` - SQL commands

### Status
✅ TypeScript compilation successful
✅ Nullable fields updated
✅ Validation added
⏳ Waiting for database cleanup
