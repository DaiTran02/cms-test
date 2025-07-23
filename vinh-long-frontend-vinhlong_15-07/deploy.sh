#!/bin/bash
set -e

echo "🔄 Starting deployment..."

SOURCE_DIR="/home/jenkins/agent/workspace/Test/vinh-long-frontend-vinhlong_15-07"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ ERROR: SOURCE_DIR không tồn tại: $SOURCE_DIR"
  exit 1
fi

cd "$SOURCE_DIR"

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "📦 Installing TypeScript & types..."
npm install --save-dev typescript @types/react @types/node

echo "🔧 Building project..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "🚀 Restarting PM2 process..."

pm2 delete vinhlongfont || echo "⚠️ Process vinhlongfont not found, skipping delete"
pm2 start npm --name "vinhlongfont" -- start
pm2 save

echo "✅ Deployment completed"
