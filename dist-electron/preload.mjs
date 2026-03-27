"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  close: () => electron.ipcRenderer.send("window-close"),
  maximize: () => electron.ipcRenderer.send("window-maximize"),
  minimize: () => electron.ipcRenderer.send("window-minimize")
});
