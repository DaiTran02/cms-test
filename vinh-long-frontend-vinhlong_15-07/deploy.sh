#!/bin/bash
echo "🚀 Starting server via PM2..."

# Stop and restart app
pm2 stop vinhlongfont || true
pm2 delete vinhlongfont || true
pm2 start npm --name "vinhlongfont" -- start
pm2 save

echo "✅ PM2 started"
