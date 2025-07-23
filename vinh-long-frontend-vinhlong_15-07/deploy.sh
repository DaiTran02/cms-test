#!/bin/bash
echo "🔄 Starting deployment..."

# Load NVM (nếu có dùng NVM)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# In ra để debug môi trường
echo "🛠 Node version: $(node -v)"
echo "🛠 NPM version: $(npm -v)"
echo "🛠 Whoami: $(whoami)"

# Biến
SOURCE_DIR="/home/jenkins/agent/workspace/Test/vinh-long-frontend-vinhlong_15-07"

cd "$SOURCE_DIR"

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building project..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "🚀 Starting PM2 process..."
pm2 stop vinhlongfont || true
pm2 delete vinhlongfont || true
pm2 start npm --name "vinhlongfont" -- start
pm2 save

echo "✅ Deployment completed"
