import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  setWindowMode: (mode: 'pet' | 'panel'): Promise<void> =>
    ipcRenderer.invoke('lumi:set-window-mode', mode),
  minimizeWindow: (): void => ipcRenderer.send('lumi:minimize-window'),
  closeWindow: (): void => ipcRenderer.send('lumi:close-window')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  Object.assign(window, { electron: electronAPI, api })
}
