# FKT-ONSEI-APP（AI動画広告ジェネレーター）

画像やURLから、AI（Gemini）が広告用の掛け合い台本を自動作成する**音声作成アプリ**です。  
台本の音声読み上げ・CSVインポート/エクスポート・翻訳にも対応しています。

## 公開URL（Firebase Hosting）

このアプリは **音声作成アプリ専用のサイト** にデプロイされます（プロジェクトのメイン URL とは別です）。

- **https://onsei-app-999b5.hattyuu-kanri-app-test.web.app**
- **https://onsei-app-999b5.hattyuu-kanri-app-test.firebaseapp.com**

（`onsei` = 音声 なので、音声作成アプリだと分かる URL です）

デプロイ手順は **Firebaseデプロイ手順.md** を参照してください。

## 含まれるファイル

- **index.html** … アプリ本体（単一HTMLで動作）
- **起動サーバー9000.command** … ポート9000でローカルサーバーを起動（Mac用・ダブルクリックで実行）
- **README.txt** … 起動方法の説明
- **.gitignore** … Git用

## 起動方法（ポート9000）

### Mac

1. **起動スクリプトを使う（推奨）**  
   「起動サーバー9000.command」をダブルクリック → ブラウザで http://localhost:9000/ が開きます。

2. **ターミナルから起動**  
   ```bash
   cd このフォルダのパス
   python3 -m http.server 9000
   ```  
   ブラウザで http://localhost:9000/ を開いてください。

## 使い方

1. ステップ1で「ファイルから作成」または「URLから作成」を選択し、画像/PDF/Word/Excel または URL を指定
2. ステップ2で台本の雰囲気・形式・話者数を選択
3. ステップ3で訴求ポイントなどを選択（任意）
4. 「広告素材を生成」をクリック
5. 生成された台本を編集・音声再生・CSVエクスポート・翻訳できます

## APIキーについて

Gemini API を使用します。  
`index.html` 内の `GEMINI_API_KEY` に、[Google AI Studio](https://aistudio.google.com/apikey) で取得したAPIキーを設定してください。

## ライセンス

このリポジトリの利用条件はオーナーに従います。
