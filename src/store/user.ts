import type { DataInfo } from '~/utils/http/auth'
import {
  AccessTokenKey,

  ExpiresKey,
  RefreshTokenKey,
  removeToken,
  setToken,
} from '~/utils/http/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<User.UserInfo>({} as User.UserInfo)
    const isLogin = computed(() => {
      const { id } = userInfo.value
      return !!id
      // return (token && id);
    })
    const token = computed(() => {
      return userInfo.value.token
    })
    const userId = computed(() => {
      return userInfo.value.id
    })
    const setUserInfo = (data: User.UserInfo) => {
      userInfo.value = data
    }
    const loginFunc = (dataT: any) => {
      return new Promise<any>((resolve, reject) => {
        login(dataT)
          .then((res: any) => {
            const { code, result } = res
            if (code === 200 && result?.status !== 400) {
              const { admin, token } = result

              setUserInfo(admin)
              const TokenInfo: DataInfo<number> = {
                username: admin.name,
                roles: [admin.name],
                accessToken: token[AccessTokenKey],
                refreshToken: token[RefreshTokenKey],
                expires: token[ExpiresKey] * 1000,
              }

              setToken(TokenInfo)
              resolve(res)
            }
            else {
              reject(res)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    const loginFuncByEmail = (dataT: any) => {
      return new Promise<any>((resolve, reject) => {
        loginByEmail(dataT)
          .then((res: any) => {
            const { code, result } = res
            if (code === 200 && result?.status !== 400) {
              const { admin, token } = result

              setUserInfo(admin)
              const TokenInfo: DataInfo<number> = {
                username: admin.name,
                roles: [admin.name],
                accessToken: token[AccessTokenKey],
                refreshToken: token[RefreshTokenKey],
                expires: token[ExpiresKey] * 1000,
              }

              setToken(TokenInfo)
              resolve(res)
            }
            else {
              reject(res)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    const logOut = () => {
      userInfo.value = {} as User.UserInfo
      removeToken()
    }

    return {
      userInfo,
      isLogin,
      token,
      userId,
      setUserInfo,
      loginFunc,
      loginFuncByEmail,
      logOut,
    }
  },
  {
    persist: {
      key: 'user-key',
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
      },
    },
  },
)

export default useUserStore
