#!/bin/bash

echo "🎨 Image Optimization Script"
echo "=============================="
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found. Please install it first:"
    echo "   macOS: brew install webp"
    echo "   Linux: sudo apt install webp"
    exit 1
fi

# Create backup directory
mkdir -p public/images/projects/backup

echo "📦 Creating backups..."
cp public/images/projects/*.jpg public/images/projects/backup/ 2>/dev/null || true

echo "🔄 Converting JPG to WebP..."
cd public/images/projects

count=0
for img in *.jpg; do
    if [ -f "$img" ]; then
        # Convert to WebP with 85% quality
        cwebp -q 85 "$img" -o "${img%.jpg}.webp"
        count=$((count + 1))
        echo "  ✓ Converted: $img → ${img%.jpg}.webp"
    fi
done

echo ""
echo "✅ Conversion complete!"
echo "   $count images converted to WebP"
echo ""
echo "📊 Size comparison:"
du -sh backup/ 2>/dev/null || echo "  Original: N/A"
du -sh *.webp 2>/dev/null | head -1 || echo "  WebP: N/A"
echo ""
echo "💡 Next steps:"
echo "   1. Update projects-data.ts to use .webp extensions"
echo "   2. Test the images in the browser"
echo "   3. If everything works, delete the backup folder"
echo ""
