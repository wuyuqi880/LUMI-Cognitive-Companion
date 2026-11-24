import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

type LumiWindowMode = 'pet' | 'panel'
const WINDOW_SIZE: Record<LumiWindowMode, { width: number; height: number }> = {
  pet: { width: 320, height: 410 },
  panel: { width: 1000, height: 690 }
}

function setWindowMode(window: BrowserWindow, mode: LumiWindowMode): void {
  const oldBounds = window.getBounds()
  const workArea = screen.getDisplayMatching(oldBounds).workArea
  const desired = WINDOW_SIZE[mode]
  const width = Math.min(desired.width, workArea.width - 20)
  const height = Math.min(desired.height, workArea.height - 20)

  // Keep the right-bottom corner close to its previous location while resizing.
  const x = Math.max(
    workArea.x + 10,
    Math.min(oldBounds.x + oldBounds.width - width, workArea.x + workArea.width - width - 10)
  )
  const y = Math.max(
    workArea.y + 10,
    Math.min(oldBounds.y + oldBounds.height - height, workArea.y + workArea.height - height - 10)
  )

  window.setBounds({ x, y, width, height })
  window.setAlwaysOnTop(mode === 'pet', 'floating')
}

function createWindow(): void {
  const window = new BrowserWindow({
    ...WINDOW_SIZE.panel,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: true,
    backgroundColor: '#00000000',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  window.center()
  window.once('ready-to-show', () => window.show())

  window.webContents.setWindowOpenHandler((details) => {
    const destination = new URL(details.url)
    if (destination.protocol === 'https:') void shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    void window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.lumi.cognitive-companion')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('lumi:set-window-mode', (event, value: unknown) => {
    if (value !== 'pet' && value !== 'panel') return
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window && !window.isDestroyed()) setWindowMode(window, value)
  })

  ipcMain.on('lumi:minimize-window', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize()
  })

  ipcMain.on('lumi:close-window', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.close()
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
