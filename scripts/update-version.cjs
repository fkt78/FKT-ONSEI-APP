#!/usr/bin/env node
/**
 * index.html の APP_VERSION をパッチアップ、APP_BUILD_DATETIME / APP_BUILD_ISO を
 * デプロイ実行時点の日本標準時（JST）に更新する。
 */
const fs = require('fs');
const path = require('path');

/** @param {Date} d */
function formatJstStrings(d) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const partMap = Object.fromEntries(
    fmt
      .formatToParts(d)
      .filter((p) => p.type !== 'literal')
      .map((p) => [p.type, p.value])
  );
  const { year, month, day, hour, minute, second } = partMap;
  const display = `${year}-${month}-${day} ${hour}:${minute}:${second} (JST)`;
  const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}+09:00`;
  return { display, iso };
}

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const versionMatch = content.match(/const APP_VERSION = '(\d+)\.(\d+)\.(\d+)'/);
if (!versionMatch) {
  console.error('APP_VERSION が見つかりません');
  process.exit(1);
}
const [, major, minor, patch] = versionMatch;
const newPatch = String(parseInt(patch, 10) + 1);
const newVersion = `${major}.${minor}.${newPatch}`;

const { display, iso } = formatJstStrings(new Date());

const pattern =
  /const APP_VERSION = '[^']+';[\s\n]*const APP_BUILD_DATETIME = '[^']+';[\s\n]*const APP_BUILD_ISO = '[^']+';/;
if (!pattern.test(content)) {
  console.error('APP_VERSION / APP_BUILD_DATETIME / APP_BUILD_ISO のブロックが見つかりません');
  process.exit(1);
}
content = content.replace(
  pattern,
  `const APP_VERSION = '${newVersion}';\n        const APP_BUILD_DATETIME = '${display}';\n        const APP_BUILD_ISO = '${iso}';`
);

fs.writeFileSync(indexPath, content);
console.log(`バージョン更新: → ${newVersion}  デプロイ日時(JST): ${display}`);
