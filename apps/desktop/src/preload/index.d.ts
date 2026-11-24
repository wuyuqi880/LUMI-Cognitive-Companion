import { ElectronAPI } from '@electron-toolkit/preload'

interface LumiDesktopAPI {
  setWindowMode: (mode: 'pet' | 'panel') => Promise<void>
  minimizeWindow: () => void
  closeWindow: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: LumiDesktopAPI
  }
}
