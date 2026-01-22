#!/bin/bash
# Fix syntax error in app/index.tsx line 66

echo "Fixing syntax error in app/index.tsx..."

sed -i "s/color: #4b5563',/color: '#4b5563',/g" app/index.tsx

echo "✅ Syntax error fixed!"
echo ""
echo "To run the app:"
echo "  1. npm install"
echo "  2. npm start"
echo "  3. Press 'w' for web, 'i' for iOS, or 'a' for Android"
