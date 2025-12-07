#!/bin/bash

# DIGITIHA - Vercel Deployment Script
# Run this to deploy your app to Vercel

echo "🔥 DIGITIHA Deployment Script 🚀"
echo "================================"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
    echo ""
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "🔍 Checking project setup..."
echo ""

# Show current git status
echo "📊 Git Status:"
git status --short
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Deploy to production (vercel --prod)"
echo "2) Deploy to preview (vercel)"
echo "3) Build locally first (npm run build)"
echo "4) Run dev server (npm run dev)"
echo "5) Exit"
echo ""
read -p "Enter choice [1-5]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to PRODUCTION..."
        echo "================================"
        vercel --prod
        echo ""
        echo "✅ Deployment complete!"
        echo "🎉 Your app is now live!"
        ;;
    2)
        echo ""
        echo "🔍 Deploying to PREVIEW..."
        echo "================================"
        vercel
        echo ""
        echo "✅ Preview deployment complete!"
        ;;
    3)
        echo ""
        echo "🏗️  Building locally..."
        echo "================================"
        npm run build
        echo ""
        if [ $? -eq 0 ]; then
            echo "✅ Build successful!"
            echo "You can now run: vercel --prod"
        else
            echo "❌ Build failed. Please check errors above."
        fi
        ;;
    4)
        echo ""
        echo "💻 Starting development server..."
        echo "================================"
        echo "Open: http://localhost:3000"
        echo "Press Ctrl+C to stop"
        echo ""
        npm run dev
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Quick Links:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📖 README: cat README.md"
echo "📊 Data Info: cat DATA_STORAGE.md"
echo "🚀 Quick Start: cat QUICKSTART_GUIDE.md"
echo "📝 Changes: cat CHANGES_SUMMARY.md"
echo ""
echo "🔐 Admin access: Secured with private credentials"
echo ""
echo "✨ Done! 🔥"
