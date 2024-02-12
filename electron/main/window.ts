import {
  BrowserWindow,
  session,
  ipcMain,
  type CookiesGetFilter,
} from "electron";

export const handleWindow = (mainWindow: BrowserWindow) => {
  ipcMain.on("handleWindow", (e, type) => {
    if (type === "minWindow") {
      mainWindow.minimize();
    } else if (type === "maxWindow") {
      mainWindow.isMaximized()
        ? mainWindow.unmaximize()
        : mainWindow.maximize();
    } else {
      mainWindow.destroy();
    }
  });
};

// 查询cookie

export const setReferer = () => {
  const filter = {
    urls: ["*://*/*"],
  };
  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders["origin"] = "https://www.bilibili.com";
      details.requestHeaders["referer"] = "https://www.bilibili.com";
      callback({ requestHeaders: details.requestHeaders });
    }
  );
};

