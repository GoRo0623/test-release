/**
 * 設定情報初期値
 */
import { SettingDataType, LinkDataType } from "./CommonType";
export const initialSettingData: SettingDataType = {
  userId: "",
  firstStartDate: "",
  maxDataCount: 0,
  tagData: [],
  applicationData: {
    version: "0.0.1",
    buildNo: "0.0.0",
    appUpdate: "",
    presentedBy: "",
  },
  language: "",
  recommend: [],
  treeData: {
    treeAge: 0,
    treeStage: "",
    colors: { leaves: "", root: "", trunk: "" },
    water: 0,
  },
  startCount: 0,
  lastStartDate: "",
  lastDisplay: "",
};

export const initialLinkData: LinkDataType = {
  dataId: "",
  outerDataId: "",
  title: "",
  url: [],
  imgIcon: "",
  imgContent: [],
  tagName: [],
  favoFlag: false,
  lockCode: "",
  folderName: [],
  displayCount: 0,
  registerDate: "",
  registerName: "",
  updateDate: "",
  updateName: "",
  delFlag: 0,
};
