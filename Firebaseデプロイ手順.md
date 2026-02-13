# Firebase Hosting デプロイ手順（音声作成アプリ）

このアプリは **音声作成アプリ専用の URL** にデプロイされます。  
プロジェクトの「メイン」サイトとは別の **Hosting サイト** を使うため、他のアプリやコンテンツと混ざりません。

**音声作成アプリの URL（onsei = 音声）：**

- **https://onsei-app-999b5.hattyuu-kanri-app-test.web.app**
- **https://onsei-app-999b5.hattyuu-kanri-app-test.firebaseapp.com**

プロジェクトのデフォルト URL（**https://hattyuu-kanri-app-test.web.app**）には、このアプリはデプロイされません。

---

## 初回だけ：音声アプリ用の「サイト」を Firebase に追加する（必須）

**404 "Requested entity was not found" が出る場合**は、**hattyuu-kanri-app-test** プロジェクト内にサイト **onsei-app-999b5** がまだありません。必ず同じプロジェクトでサイトを追加してからデプロイしてください。

1. [Firebase コンソール](https://console.firebase.google.com/) を開く
2. **左上のプロジェクト名をクリック**し、一覧から **「hattyuu-kanri-app-test」** を選択（必ずこのプロジェクトにすること）
3. 左メニュー **「Hosting」** を開く
4. **「サイトを追加」**（または「Add another site」）をクリック
5. **サイト ID** に **`onsei-app-999b5`** と入力して作成  
   - Firebase で「このサイト ID は使用できません。使用できる ID: ○○○」と出た場合は、提案された ID をそのまま使い、作成後に `.firebaserc` の `"onsei-app-999b5"` をその ID に書き換えてください  
   - これが音声アプリ専用のサイトになり、URL は **https://onsei-app-999b5.hattyuu-kanri-app-test.web.app** になります

※ すでに **hattyuu-kanri-app-test** 内にサイト ID **onsei-app-999b5** を作成済みの場合は、この手順は不要です。別のプロジェクト（例: new-check-137f9）にだけ作っている場合は、**hattyuu-kanri-app-test** でも同じサイト ID で追加してください。

---

## 1. Firebase CLI のインストールとログイン

ターミナルで以下を実行してください。

```bash
# Firebase CLI をグローバルにインストール
npm install -g firebase-tools

# Firebase にログイン（ブラウザが開きます）
firebase login
```

ブラウザで Google アカウントを選び、Firebase へのアクセスを許可してください。

---

## 2. デプロイの実行

このフォルダ（`ai-ad-generator`）で以下を実行します。

**※ 音声アプリ用に設定しているプロジェクトは `hattyuu-kanri-app-test` です。**  
別のプロジェクト（例: new-check-137f9）が選択されていると「Deploy target onsei-app not configured」と出ます。その場合は先にプロジェクトを切り替えてください。

```bash
cd ~/ai-ad-generator
firebase use hattyuu-kanri-app-test
firebase deploy
```

初回は「Hosting の設定を確認しますか？」と出る場合があります。その場合は **Y** で進めてください。

成功すると、音声アプリ用の URL が表示されます。

```
Hosting URL: https://onsei-app-999b5.hattyuu-kanri-app-test.web.app
```

---

## 3. 今後の更新時

`index.html` などを編集したあと、再度デプロイするには同じコマンドを実行します。

```bash
cd ~/ai-ad-generator
firebase deploy
```

---

## まとめ：URL の役割

| URL | 内容 |
|-----|------|
| **https://onsei-app-999b5.hattyuu-kanri-app-test.web.app** | **この音声作成アプリのみ**（専用サイト） |
| https://hattyuu-kanri-app-test.web.app | プロジェクトのデフォルトサイト（このアプリはデプロイされない） |

---

## トラブルシューティング

### 「サイト onsei-app-999b5 が見つかりません」「HTTP 404 / Requested entity was not found」

- **hattyuu-kanri-app-test** プロジェクトで、Hosting の「サイトを追加」からサイト ID **`onsei-app-999b5`** を追加しているか確認してください（別のプロジェクトにだけ作っていると 404 になります）
- 上記「初回だけ：音声アプリ用のサイトを Firebase に追加する」の手順で、**必ずプロジェクト hattyuu-kanri-app-test を選択した状態で**サイトを追加してください
- サイト ID は Hosting の「サイト」一覧で確認・作成できます

### 「Permission denied」や「権限がありません」

- `firebase login` を再度実行し、プロジェクトのオーナー（または編集者）になっているアカウントでログインしているか確認してください

### デプロイされるファイルを確認したい

- `index.html` と、`.firebaseignore` に書いていないファイルだけが、**onsei-app サイト** にアップロードされます
- `.git` や README、スクリプト類はデプロイされません
