import { app, BrowserWindow, ipcMain, session } from 'electron'
import os from 'node:os'
import path from 'node:path'

import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const iconPath = path.join(process.env.VITE_PUBLIC!, os.platform() === 'win32' ? 'icone.ico' : 'icone.png')

let win: BrowserWindow | null

function createWindow() {
  if (win) {
    win.focus()
    return
  }

  win = new BrowserWindow({
    width: 670,
    height: 500,
    minWidth: 670,
    minHeight: 500,
    resizable: true,
    frame: false,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      sandbox: true,
      devTools: false
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  const handleMaximizeChange = (isMaximized: boolean) => {
    win?.webContents.send('maximize-change', isMaximized)
  }

  win.on('maximize', () => handleMaximizeChange(true))
  win.on('unmaximize', () => handleMaximizeChange(false))

  win.on('closed', () => {
    win = null
  })
}

ipcMain.on('window-close', () => {
  win?.close()
})

ipcMain.on('window-minimize', () => {
  win?.minimize()
})

ipcMain.on('window-maximize', () => {
  if (win?.isMaximized()) {
    win.unmaximize()
  } else {
    win?.maximize()
  }
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:; media-src 'self' file:"
        ]
      }
    })
  })
  createWindow()
})
