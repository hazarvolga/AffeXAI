#!/bin/bash

# Start Backend Script for Knowledge Sources Feature
# This script starts the backend with PDF upload support

echo "🚀 Starting Affexai Backend..."

# Check if backend is already running
if lsof -ti:9006 > /dev/null 2>&1; then
  echo "⚠️  Backend is already running on port 9006"
  echo "   Run ./stop-backend.sh first to stop it"
  exit 1
fi

# Navigate to backend directory
cd "$(dirname "$0")"

# Start backend in watch mode
echo "📦 Starting NestJS application in watch mode..."
npm run start:dev
