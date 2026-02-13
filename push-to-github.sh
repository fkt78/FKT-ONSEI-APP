#!/bin/bash
# FKT-ONSEI-APP を GitHub にプッシュするスクリプト
# Macの「ターミナル」で実行: cd ~/ai-ad-generator && ./push-to-github.sh

cd "$(dirname "$0")"
echo "現在のフォルダ: $(pwd)"

# Git リポジトリでない場合は初期化する
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Git を初期化しています..."
  git init || { echo "エラー: git init に失敗しました。"; exit 1; }
  git remote add origin https://github.com/fkt78/FKT-ONSEI-APP.git
  echo "リポジトリを初期化しました。"
fi

# リモートが未設定なら追加
git remote get-url origin >/dev/null 2>&1 || git remote add origin https://github.com/fkt78/FKT-ONSEI-APP.git

echo "ファイルを追加しています..."
git add .

if git diff --cached --quiet 2>/dev/null; then
  echo "変更がありません。"
else
  echo "コミットしています..."
  git commit -m "AI動画広告ジェネレーター（音声ファイル作成アプリ）"
fi

echo "GitHub にプッシュしています..."
git branch -M main
git push -u origin main

echo "完了: https://github.com/fkt78/FKT-ONSEI-APP を確認してください。"
