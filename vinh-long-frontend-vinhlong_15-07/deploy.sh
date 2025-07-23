#!/bin/bash
echo "🔄 Starting deployment..."

# Biến
SOURCE_DIR="vinh-long-frontend-vinhlong_15-07"
DEPLOY_DIR="/home/jenkins/deploy"

# Build dự án
cd "$SOURCE_DIR"
npm install
npm run build

# Chuẩn bị thư mục deploy
mkdir -p "$DEPLOY_DIR"
rm -rf "$DEPLOY_DIR"/*

# Copy build artifact và các file cần thiết
cp -R .next "$DEPLOY_DIR/"
cp -R public "$DEPLOY_DIR/"
cp -R node_modules "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"
cp next.config.js "$DEPLOY_DIR/" # nếu có

# Chạy ứng dụng
cd "$DEPLOY_DIR"

pm2 stop vinh-long-frontend-vinhlong_15-07 || true
pm2 delete vinh-long-frontend || true
pm2 start "npx next start -p 3000" --name vinh-long-frontend-vinhlong_15-07
pm2 save

echo "✅ Deployment completed"
