import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  storageBackend: AsyncStorage,
});

export const saveStorageData = async <T1>(keyword: string, saveData: T1) => {
  await storage.save({
    key: keyword,
    data: saveData,
  });
};

export const getStorageData = async (keyword: string) => {
  let returnData: any;
  await storage
    .load({ key: keyword })
    .then((res) => {
      returnData = res;
    })
    .catch((err) => console.warn(err));
  return returnData;
};
