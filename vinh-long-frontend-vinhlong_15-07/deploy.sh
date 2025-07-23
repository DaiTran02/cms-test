#!/bin/bash
set -e

echo "🔄 Starting deployment..."

# Biến
SOURCE_DIR="/home/jenkins/agent/workspace/Test/vinh-long-frontend-vinhlong_15-07"

# Check thư mục tồn tại
if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ ERROR: SOURCE_DIR không tồn tại: $SOURCE_DIR"
  exit 1
fi

# Di chuyển đến thư mục
cd "$SOURCE_DIR"

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔧 Building project..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "🚀 Restarting PM2 process..."

# Stop và xóa process cũ (nếu có)
pm2 delete vinhlongfont || echo "⚠️ Process vinhlongfont not found, skipping delete"

# Start lại app bằng pm2 với name rõ ràng
pm2 start npm --name "vinhlongfont" -- start

# Lưu lại process list để khởi động lại khi reboot
pm2 save

echo "✅ Deployment completed"
