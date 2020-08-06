# React ✕ FireBase(FireStore)

React ✕ FireBase(FireStore) [https://react-test-93253.firebaseapp.com/](https://react-test-93253.firebaseapp.com/)

## About
ReactとFirebase(FireStore)で作ったチャットツールです。
ReactではTypescriptベースでのFunctionalComponentやHooksなどを使用したモダンなフロントエンドのコードで開発。
また、FireBase(FireStore)の基本的な使い方や、実際のセキュリティルール、CloudFunctionを使用しました。

FireBaseを浸かって何かをしようとすると、意外とFireStoreやFunctionやセキュリティルールなど気にしないといけないことが多くありますが、
巷ではまとまったコードとして存在するものが多くなく、取っ掛かりとしては少しハードルが高い状況にあると感じました。

またReactのコードもTypescriptが使用されていない、hooksが使用されていない、FunctionalComponentでない、などといった古いコードが多く、
まとまった参考になるコードが少ないという理由もあり今回誰かの参考になればと思いここにコードとして見れるカタチにしました。

ReactとFirebaseでこういう機能を実装したいけど取っ掛かりとして理解したい、という人向けに基本的な機能を作りましたので、参考になれば幸いです。

※ご自身の環境で動くかどうかなどの検証は一切行なっておりませんのでご注意ください。
※アカウントの削除機能を設けていますが、バグやFireBase側のエラーなどの何らかの理由により削除できない場合は[コチラDM](https://twitter.com/ryoppei_)から削除依頼の連絡をお願い致します。

## Functional

### Firebase / FireStore / CloudFnction
* Google認証によるログイン/ログアウト機能
* テキストメッセージの投稿と投稿の削除機能
* フォロー/フォロワー機能
* アカウントの削除機能
* アカウントの削除機能

### React / Typescript
* CustomHooksなどを用いた最新のReactコード
* Typescriptを用いた型安全なコード
* 責務の分離を意識したレイヤー毎の設計
* コンポーネント間の依存注入レイヤーを考慮したContainer / Presentational設計
* StyledComponentによるJSベースのスタイル設計