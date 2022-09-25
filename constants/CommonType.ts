/**
 * リンクデータ保持形式
 */
export type LinkDataType = {
  dataId: string; //作成者は見れない一意なID(使用者ID+初回起動時日付時間+Count)
  outerDataId: string; //作成者が設定できる任意のID
  title: string; //タイトル
  url: string[]; //URL（複数）
  imgIcon: string; //アイコンイメージ
  imgContent: string[]; //コンテンツイメージ（複数）
  tagName: string[]; //タグ名称（複数）
  favoFlag: boolean; //お気に入り有無
  lockCode: string; //ロックパスコード
  folderName: string[]; //フォルダ階層（名称で保持）（上層→下層へ）
  displayCount: number; //表示回数
  registerDate: string; //登録日
  registerName: string; //登録者名（使用者ＩＤ）
  updateDate: string; //更新日
  updateName: string; //更新者名（使用者ＩＤ）
  delFlag: number; //削除フラグ（論理削除：0=登録、1=削除）
};
/**
 * 設定情報
 */
export type SettingDataType = {
  userId: string; //使用者ＩＤ→初回起動時、入力するように求める。
  firstStartDate: string; //初回起動日時
  maxDataCount: number; //データ数Maxカウント
  tagData: { tagId: string; tagName: string }[]; //タグ情報（｛tagId:タグID,tagName:名称｝のリスト形式）
  applicationData: {
    version: string;
    buildNo: string;
    appUpdate: string;
    presentedBy: string;
  }; //各種アプリ情報（バージョン情報、ビルド番号、更新日、製造者情報）
  language: string; //言語設定
  recommend: {
    productLink: string;
    productIcon: string;
    productTitle: string;
  }[]; //おすすめアプリ情報（製品リンク、アイコン画像、タイトル）
  treeData: {
    treeAge: number;
    treeStage: string;
    colors: { leaves: string; trunk: string; root: string };
    water: number;
  }; //ツリー情報（年齢、成長段階、カラー、水やり回数）
  startCount: number; //起動回数
  lastStartDate: string; //最終起動日
  lastDisplay: string; //最終起動画面ID
};

//ダミーデータ
import {
  getNumberDate,
  getDisplayDateTime,
} from "../components/getDateFormated";
export const dummyLinkData = () => {
  const data: LinkDataType[] = [];
  const dummyDate = new Date();
  for (let idx = 0; idx < 10; idx++) {
    data.push({
      dataId:
        "dummyUserId" + getNumberDate(dummyDate) + ("0000" + idx).slice(-5),
      outerDataId: "dummy" + idx,
      title: "dummyData" + idx,
      url: [
        "http://dummy-url1.example.com",
        "http://dummy-url2.example.com",
        "http://dummy-url3.example.com",
      ],
      imgIcon: "dummyImgIcon",
      imgContent: ["dummyImgIcon"],
      tagName: ["dummyTag_1_" + idx, "dummyTag_2_" + idx, "dummyTag_3_" + idx],
      favoFlag: idx % 2 == 1 ? true : false,
      lockCode: idx % 2 == 1 ? "dummyLock_" + idx : "",
      folderName: [
        "dummyFolder1_" + idx,
        "dummyFolder2_" + idx,
        "dummyFolder3_" + idx,
      ],
      displayCount: idx,
      registerDate: getDisplayDateTime(dummyDate),
      registerName: "dummyUserId",
      updateDate: getDisplayDateTime(dummyDate),
      updateName: "dummyUserId",
      delFlag: 0,
    });
  }
  return data;
};
