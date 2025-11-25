// 测试环境设置
import { vi } from 'vitest'

// Mock uni 全局对象
const uni = {
  getSystemInfoSync: () => ({
    platform: 'h5',
    system: 'Windows 10',
    screenWidth: 1920,
    screenHeight: 1080,
  }),
  showToast: vi.fn(),
  request: vi.fn(),
  getStorageSync: vi.fn(() => ''),
  setStorageSync: vi.fn(),
  removeStorageSync: vi.fn(),
}

// 设置全局 uni 对象
;(globalThis as any).uni = uni

// Mock console methods
if (typeof globalThis !== 'undefined') {
  globalThis.console = {
    ...console,
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }
}

export { uni }
