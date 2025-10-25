#!/bin/bash

# Stop Backend Script
# Safely stops all running backend processes

echo "🛑 Stopping Affexai Backend..."

# Find all nest processes
PIDS=$(lsof -ti:9006 2>/dev/null)

if [ -z "$PIDS" ]; then
  echo "✅ No backend process running on port 9006"
  exit 0
fi

# Kill processes gracefully
echo "   Found process(es): $PIDS"
for PID in $PIDS; do
  echo "   Stopping process $PID..."
  kill -15 "$PID" 2>/dev/null || kill -9 "$PID" 2>/dev/null
done

# Wait a moment
sleep 2

# Verify stopped
if lsof -ti:9006 > /dev/null 2>&1; then
  echo "⚠️  Some processes may still be running. Forcing shutdown..."
  lsof -ti:9006 | xargs kill -9 2>/dev/null
else
  echo "✅ Backend stopped successfully"
fi
