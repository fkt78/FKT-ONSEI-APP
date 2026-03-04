#!/usr/bin/env node
/**
 * index.html の APP_VERSION をパッチアップ、APP_BUILD_DATE を今日の日付に更新する。
 * デプロイ前やコード変更時に自動実行される。
 */
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// APP_VERSION を取得してパッチをインクリメント
const versionMatch = content.match(/const APP_VERSION = '(\d+)\.(\d+)\.(\d+)'/);
if (!versionMatch) {
  console.error('APP_VERSION が見つかりません');
  process.exit(1);
}
const [, major, minor, patch] = versionMatch;
const newPatch = String(parseInt(patch, 10) + 1);
const newVersion = `${major}.${minor}.${newPatch}`;

// 今日の日付 (YYYY-MM-DD)
const today = new Date();
const dateStr = today.toISOString().slice(0, 10);

// 置換
content = content.replace(
  /const APP_VERSION = '[^']+';[\s\n]*const APP_BUILD_DATE = '[^']+';/,
  `const APP_VERSION = '${newVersion}';\n        const APP_BUILD_DATE = '${dateStr}';`
);

fs.writeFileSync(indexPath, content);
console.log(`バージョン更新: ${versionMatch[0].match(/'[^']+'/)[0]} → ${newVersion} (${dateStr})`);
