#!/bin/bash
echo "🔄 Starting deployment..."

# Biến
SOURCE_DIR="/home/jenkins/agent/workspace/Test/vinh-long-frontend-vinhlong_15-07"

# Build dự án
cd "$SOURCE_DIR"
npm install
npm run build

# Chạy ứng dụng
cd "$SOURCE_DIR"

pm2 stop vinhlongfont || true
pm2 delete vinhlongfont || true
pm2 start npm --name "vinhlongfont" -- start
pm2 save

echo "✅ Deployment completed"
