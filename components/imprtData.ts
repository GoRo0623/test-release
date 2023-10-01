//import useColorScheme from "./hooks/useColorScheme";
import "react-native-gesture-handler";
// Intent
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { getStorageData, saveStorageData } from "../components/saveStorage";
import { initialLinkData } from "../constants/CommonInitialData";
import { LinkDataType } from "../constants/CommonType";

export const importData = async () => {
  //変数初期化
  let success = true;
  let error = 0;
  let merge = 0;
  let total = 0;
  try {
    //フォルダを開く
    const result: DocumentPicker.DocumentResult =
      await DocumentPicker.getDocumentAsync({});
    //選択したデータをテキストで取得する
    if (result == null || result.type != "success") {
      return [false, 1, 0, 0];
    }
    //内容を取得する
    const content = await FileSystem.readAsStringAsync(result.uri);
    if (content == null || content == undefined || content == "") {
      return [false, 1, 0, 0];
    }
    //テキストデータをJSONに直す
    const [importLinkData, errorI, totalI] = setImportData(content);
    if (typeof importLinkData != "object") {
      success = false;
      error = parseInt(errorI.toString()) || 0;
      total = parseInt(totalI.toString()) || 0;
      return [success, error, merge, total];
    }
    //既存データとマージし、保存処理を行う
    const [mergeLinkData, errorM, mergeM, totalM] = await mergeImportData(
      importLinkData
    );
    error = parseInt(errorI.toString()) || 0 + parseInt(errorM.toString()) || 0;
    merge = parseInt(mergeM.toString()) || 0;
    total = parseInt(totalI.toString()) || 0;
  } catch (e) {
    console.log(e);
    success = false;
    error++;
  } finally {
    return [success, error, merge, total];
  }
};
//データをJSONに設定しなおす
const setImportData = (content: string) => {
  let error = 0;
  let total = 0;
  let importLinkData: LinkDataType[] = [];
  try {
    //
    const jsonData = JSON.parse(content);
    if (
      jsonData == null ||
      jsonData == undefined ||
      typeof jsonData != "object" ||
      jsonData?.length > 0
    ) {
      error++;
    } else {
      jsonData?.forEach((data: any, index: number) => {
        try {
          let linkData = initialLinkData;
          linkData.title = data?.title;
          linkData.dataId = data?.dataId;
          if (data?.url?.length > 0) {
            linkData.url = data?.url;
          }
          importLinkData.push(linkData);
        } catch (e) {
          error++;
          console.log(e);
        } finally {
          total++;
        }
      });
    }
  } catch (e) {
    error++;
    console.log(e);
  } finally {
    return [importLinkData, error, total];
  }
};

//既存データとマージして保存処理を行う
const mergeImportData = async (importLinkData: LinkDataType[]) => {
  let error = 0;
  let merge = 0;
  let total = 0;
  let mergeLinkData: LinkDataType[] = [];
  let addLinkData: LinkDataType[] = [];
  try {
    //内部ストレージのデータを取得
    let getData: LinkDataType[] = await getStorageData("LINKDATA");
    mergeLinkData = getData || [];

    importLinkData.forEach((data) => {
      try {
        //内部ストレージデータがない場合はすべての情報を登録する
        if (getData == null || getData == undefined || getData.length == 0) {
          if (addLinkData.length == 0) {
            addLinkData = importLinkData;
          }
          return;
        }
        let mergedFlag = false;
        //url一致を調べる
        let mergeUrlIndex: number[] = [];
        let noMergeUrl: string[] = [];
        data.url.forEach((url) => {
          const index = mergeLinkData.findIndex(
            (saveData) =>
              saveData.delFlag == 0 &&
              saveData.url.find((saveUrl) => url == saveUrl)
          );
          if (index < 0) {
            //マージ対象が存在しない
            noMergeUrl.push(url);
            return;
          }
          //マージ済みか確認する
          const mergedIndex = mergeUrlIndex.findIndex((idx) => idx == index);
          if (mergedIndex < 0) {
            //タイトルのマージ
            if (!mergeLinkData[index].title.includes(data.title)) {
              mergeLinkData[index].title =
                mergeLinkData[index].title + data.title;
              mergeUrlIndex.push(index);
            }
            mergedFlag = true;
          }
        });
        //タイトル一致を調べる
        mergeLinkData.forEach((saveData, index) => {
          if (saveData.title.includes(data.title)) {
            const mergedIndex = mergeUrlIndex.findIndex((idx) => idx == index);
            //既にURLでマージしているものとタイトルが一致する場合は
            if (mergedIndex >= 0) {
              //マージ済みに追加する
              mergeLinkData[mergedIndex].url.concat(noMergeUrl);
              mergedFlag = true;
            } else {
              //追加データとする
              addLinkData.push({ ...data, url: noMergeUrl });
            }
            //マージされていないurlリストをクリアする
            noMergeUrl = [];
          }
        });
        if (mergedFlag) {
          merge++;
        }
      } catch (e) {
        error++;
        console.log(e);
      }
    });
    mergeLinkData.concat(addLinkData);
    //内部ストレージ保存処理を行う
    await saveStorageData("LINKDATA", [...mergeLinkData]);
  } catch (e) {
    error++;
    console.log(e);
  } finally {
    return [mergeLinkData, error, merge, total];
  }
};
