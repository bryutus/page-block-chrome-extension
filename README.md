Page Block Chrome Extension - README.md
# Page Block - Chrome extension
===
ブラックリストを作成してWebページをブロックします。
## Description
自分で閲覧を制限したいページを表示しないようにできます。
登録方法はURLとDomainの二種類あります。
- URL
	- 完全一致でページをブロック
- Domain
	- ドメインが一致した場合、下層ページもブロック

登録を解除するにはページブロックされたページから解除を行ってください。
## Installation
```
$ git clone https://github.com/bryutus/page-block-chrome-extension
```
### 必要なパッケージのインストール、Riotのカスタムタグをビルド
```
$ cd page-block-chrome-extension

$ npm install

$ npm start
```

### Chromeに読み込ませる
[拡張機能ページ](chrome://extensions/) にアクセスし、 `パッケージ化されていない拡張機能を読み込む` からリポジトリの `public` ディレクトリを選択

## License
[MIT](http://b4b4r07.mit-license.org)
