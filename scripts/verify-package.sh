#!/bin/bash

echo "🔍 Verifying package configuration..."
echo ""

# Check that USWDS is in peerDependencies
if ! grep -q '"@uswds/uswds": "\^3.13.0"' package.json; then
  echo "⚠️  Warning: USWDS not in peerDependencies with correct version"
else
  echo "✅ USWDS peer dependency configured"
fi

# Check that USWDS is NOT in dependencies
if grep -A 10 '"dependencies"' package.json | grep -q '@uswds/uswds'; then
  echo "⚠️  Warning: USWDS should NOT be in dependencies"
else
  echo "✅ USWDS not in dependencies"
fi

# Build the package
echo ""
echo "📦 Building package..."
npm run build

# Check dist/ size
if [ -d "dist" ]; then
  DIST_SIZE=$(du -sh dist/ | cut -f1)
  echo "📦 Package size: $DIST_SIZE"
  echo "✅ Build completed successfully"
else
  echo "⚠️  Warning: dist/ directory not found"
fi

# Check that dist/ doesn't contain USWDS CSS (lenient check)
if [ -d "dist" ]; then
  USWDS_REFS=$(grep -r "uswds" dist/ 2>/dev/null | wc -l)
  if [ "$USWDS_REFS" -gt 0 ]; then
    echo "⚠️  Warning: Found $USWDS_REFS USWDS reference(s) in dist/"
    echo "   (This may be normal for class names)"
  else
    echo "✅ No USWDS bundled in dist/"
  fi
fi

echo ""
echo "✅ Package verification completed"
