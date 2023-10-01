import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
//未実装
// export const initConnection = () => {
//   try {
//     //Web ポップアップを解除するメソッドを追加
//     WebBrowser.maybeCompleteAuthSession();
//     //クライアント ID をプロバイダに設定
//     const [request, response, promptAsync] = Google.useAuthRequest({
//       androidClientId: "",
//     });
//     const [token, setToken] = useState("");
//     useEffect(() => {
//       if (response?.type === "success" && response.authentication) {
//         setToken(response.authentication.accessToken);
//         //getUserInfo();
//       }
//     }, [response, token]);
//     return token; //要検討
//   } catch {
//     //
//   }
// };

// export const importData = async (token: string) => {
//   //
//   try {
//     const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     return data;
//   } catch {
//     //
//   }
// };
