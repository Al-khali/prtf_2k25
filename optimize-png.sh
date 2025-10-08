#!/bin/bash

echo "🖼️  PNG Optimization Script"
echo "============================"
echo ""

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install imagemagick
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install imagemagick
    fi
fi

# Check if pngquant is installed
if ! command -v pngquant &> /dev/null; then
    echo "❌ pngquant not found. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install pngquant
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install pngquant
    fi
fi

echo "📁 Finding PNG files..."
cd public/images/projects

count=0
total_before=0
total_after=0

for img in *.png; do
    if [ -f "$img" ]; then
        # Get original size
        size_before=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        total_before=$((total_before + size_before))
        
        echo ""
        echo "🔄 Processing: $img"
        echo "   Original: $(numfmt --to=iec-i --suffix=B $size_before 2>/dev/null || echo "$size_before bytes")"
        
        # Optimize with pngquant (lossy compression, 80% quality)
        pngquant --quality=80-90 --force --ext .png "$img"
        
        # Get new size
        size_after=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        total_after=$((total_after + size_after))
        
        # Calculate savings
        savings=$((size_before - size_after))
        percent=$((savings * 100 / size_before))
        
        echo "   Optimized: $(numfmt --to=iec-i --suffix=B $size_after 2>/dev/null || echo "$size_after bytes")"
        echo "   Saved: $(numfmt --to=iec-i --suffix=B $savings 2>/dev/null || echo "$savings bytes") ($percent%)"
        
        count=$((count + 1))
    fi
done

echo ""
echo "✅ Optimization complete!"
echo "   Files processed: $count"
echo "   Total before: $(numfmt --to=iec-i --suffix=B $total_before 2>/dev/null || echo "$total_before bytes")"
echo "   Total after: $(numfmt --to=iec-i --suffix=B $total_after 2>/dev/null || echo "$total_after bytes")"

if [ $total_before -gt 0 ]; then
    total_savings=$((total_before - total_after))
    total_percent=$((total_savings * 100 / total_before))
    echo "   Total saved: $(numfmt --to=iec-i --suffix=B $total_savings 2>/dev/null || echo "$total_savings bytes") ($total_percent%)"
fi

echo ""
echo "💡 Next steps:"
echo "   1. Test the images in the browser"
echo "   2. If quality is good, you're done!"
echo "   3. If quality is too low, adjust --quality parameter"
echo ""
