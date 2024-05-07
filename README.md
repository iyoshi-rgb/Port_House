## サービスの URL

https://port-house.vercel.app/

GitHub 認証で投稿・マイページを見ることが出来ますので、<br/>
ぜひ自分の作品がある方は投稿してください。
<br />

## サービスへの想い(作成の背景)

先日にハッカソンの出場したとき（ちなみにその時の作品のレポジトリはこちらですhttps://github.com/iyoshi-rgb/MachiWatashi/）、
チームメンバーや交流会で交流した人が「頑張ってアプリ作っても、だれにも使ってもらえない」という声をよく聞きました。<br/>
そこで、成果物（ポートフォリオ）を投稿できるようなアプリケーションを作成することで、一人よりも多くの人に見てもらうことが出来るのではないかと思い作成しました。<br/>
また、自身の勉強として、NextAuth,prisma,React Hook Form を使用してみたかったこともあり作成いたしました。

<br/>

## 機能一覧

| Top 画面（!認証、投稿ナシ）                                                                                                             | Top 画面(認証済み、投稿アリ)                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ![スクリーンショット 2024-05-07 150406](https://github.com/iyoshi-rgb/Port_House/assets/153269464/af4293c7-6842-46fe-80d7-8a7bc99d1b27) | ![スクリーンショット 2024-05-07 150851](https://github.com/iyoshi-rgb/Port_House/assets/153269464/e5e2e817-a344-4041-a301-a40287ac307a) |
| NextAuth で github 認証を使用しています。                                                                                               | 認証すると、Avater が出てきて、クリックすると、マイページ、投稿作成画面に行くことが出来ます。                                           |

| 投稿作成画面                                                                                                                                 | Mypage 画面                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ![スクリーンショット 2024-05-07 151249](https://github.com/iyoshi-rgb/Port_House/assets/153269464/357caac9-2829-4cd2-9cec-034dc1c0b65d)      |
| ![スクリーンショット 2024-05-07 152236](https://github.com/iyoshi-rgb/Port_House/assets/153269464/bd7abb41-2d75-4bb9-bb67-d8bdc84cc09c)      |
| useForm を使用し、watch を使用することでプレビュー表示ができるようにしています。下にボタンがあり、下書き保存か公開するか選ぶことが出来ます。 | 下書き保存と公開中でわけて表示しています。左のアイコンから編集・公開状態の変更（下書き → 公開、公開中 → 下書き）・削除ができます。 |

| 投稿詳細画面                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------ |
| <video src='https://github.com/iyoshi-rgb/Port_House/assets/153269464/3e1fbcd9-2b57-41fa-b0a9-71474ac6ac7a'></video>                 |
| 各記事の詳細を見ることが出来ます。動画を見る・GitHub と VisitApp ボタンで登録した URL に飛ぶことが出来ます。ない場合は表示されない。 |

<br />

## 使用技術

| Category       | Technology Stack                         |
| -------------- | ---------------------------------------- |
| Frontend       | TypeScript, Next.js, Chakra-ui, tailwind |
| Backend        | Supabase                                 |
| Infrastructure | Vercel                                   |
| Database       | Supabase                                 |
| etc..          | Prisma,NextAuth                          |

<br/>

## 挑戦&苦労&GoodPoint

- 挑戦：Prisma と NextAuth の使用に挑戦しました。また、今まで Next を使っていましたが、api を使用していなかったので api を作って使用したことと、サーバーアクションも使用してみました。

- 苦労：NextAuth に認証チェックを middleware で行いたかったのですが、認証しているのにチェックに引っかかったりした。（解決できず、該当ページで session を取得してきている）

- よかったこと：前回までは、型エラーが出たら any で終わらしていましたが、今回はおそらく any を使わず、ちゃんと定義したこと。
- サーバコンポネント、クライアントコンポネントの設計を前回よりもうまくでき、効率的に開発を進められたこと。
- サーバーアクションや api,middleware など、自分が触ったことない部分も触れたこと。
- Supabase のストレージを使って、画像や動画の取り扱いが出来たこと。
  <br/>

## 今後の展望(サービス＆個人)

- 画面遷移が遅く感じるので、preload パターンなどで、遷移を早める方法を検討すること。
- zod を使用したバリデーションチェックをする。（バリデーションチェックを忘れていた）
- 投稿主はわかるが、その人の情報を見れないので、その人のページに飛べるようにする。
- 細かい詳細もかけるような Form を考える
- middleware で認証チェックできるようにし、楽に認証チェックを行う
- layout.tsx の活用　（前回同様）
