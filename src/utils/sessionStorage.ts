interface ProxyStorage {
  setItem: <T>(k: string, v: T) => void

  getItem: <T>(k: string) => T

  removeItem: (k: string) => void
  clear: () => void
}

export const storageSession: () => ProxyStorage = () => {
  return {
    setItem<T>(k: string, v: T): void {
      uni.setStorageSync(k, v)
    },
    getItem<T>(k: string): T {
      return uni.getStorageSync(k)
    },
    removeItem(k: string): void {
      uni.removeStorageSync(k)
    },
    clear(): void {
      uni.clearStorageSync()
    },
  }
}
