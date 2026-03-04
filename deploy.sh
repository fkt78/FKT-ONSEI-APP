#!/bin/bash
# デプロイ前にバージョンを自動アップし、Firebase にデプロイする
cd "$(dirname "$0")"

echo "=== バージョンを更新しています ==="
node scripts/update-version.cjs

echo ""
echo "=== Firebase にデプロイしています ==="
firebase use hattyuu-kanri-app-test
firebase deploy
