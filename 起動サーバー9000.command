#!/bin/bash
cd "$(dirname "$0")"
echo "=========================================="
echo "AI動画広告ジェネレーター - ポート9000で起動"
echo "=========================================="
echo ""
echo "ブラウザで http://localhost:9000/ を開いてください。"
echo "終了するにはこのウィンドウで Control+C を押してください。"
echo ""
open "http://localhost:9000/" 2>/dev/null || true
python3 -m http.server 9000
