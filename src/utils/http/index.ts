import { isEmpty } from '@iceywu/utils'
import apiServer from '@/config/domain'
import { useUserStore } from '@/store/user'
import { formatToken, getToken, removeToken } from '@/utils/http/auth'
import { clearNonceCache, encrypt } from '@/utils/http/sign'
import { hideLoading, showLoading } from '~/utils/tools/serviceLoading'

const CONTENT_TYPE_JSON = 'application/json'
// const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded'
const CONTENT_TYPE_JSON_UTF8 = 'application/json; charset=utf-8'

interface RequestConfig {
  url?: string
  data?: any
  method?: string
  header?: Record<string, any>
  isNeedToken?: boolean
  isShowLoading?: boolean | string
  tokenRoleName?: string
  serverName?: string
  isNeedEncrypt?: boolean
  allowDuplicateNonce?: boolean // 是否允许nonce复用，默认true（同一接口同一参数使用相同nonce）
  headers?: Record<string, any>
  params?: Record<string, any>
  [key: string]: any
}

class PureHttp {
  static requests: Array<(token: string) => void> = []
  static isRefreshing = false
  static isNeedToken = true
  static isNeedEncrypt = false
  static tokenRoleName = ''
  static serverName = 'baseServer'
  static isApiError = false
  static errorCodes = [401]
  static isShowLoading: boolean | string = false
  // 这些方法的参数应当放在 URL params 中
  static paramTypeList = ['get', 'delete', 'head', 'options']

  static httpInterceptorsRequest(
    config: RequestConfig,
  ): RequestConfig | Promise<RequestConfig> {
    const {
      isNeedToken = PureHttp.isNeedToken,
      isShowLoading = PureHttp.isShowLoading,
      isNeedEncrypt = PureHttp.isNeedEncrypt,
      allowDuplicateNonce = false,
      headers = {},
      tokenRoleName = PureHttp.tokenRoleName,
      serverName = PureHttp.serverName,
    } = config

    PureHttp.isNeedToken = isNeedToken
    PureHttp.isShowLoading = isShowLoading

    if (PureHttp.isShowLoading && !PureHttp.isApiError)
      showLoading(Boolean(PureHttp.isShowLoading))

    config.url = (apiServer as unknown as Record<string, string | number>)[serverName || PureHttp.serverName] + (config.url || '')

    config.header = config.header || {}
    if (!isEmpty(headers)) {
      for (const key in headers) {
        config.header[key] = headers[key]
      }
    }

    if (isNeedEncrypt) {
      const { data, method, params, url } = config
      const safeMethod = (method || '').toLowerCase()
      const { tempData, nonce, timestamp, sign, cacheKey } = encrypt(
        PureHttp.paramTypeList.includes(safeMethod) ? params : data,
        url || '',
        allowDuplicateNonce,
      )

      // 确保header存在
      config.header = config.header || {}
      config.header.timestamp = timestamp
      config.header.nonce = nonce
      config.header.sign = sign
      // 保存cacheKey用于响应后清理
      config._cacheKey = cacheKey

      if (PureHttp.paramTypeList.includes(safeMethod)) {
        config.params = tempData
      }
      else {
        config.data = tempData
      }
    }

    if (PureHttp.isNeedToken) {
      const token = tokenRoleName ? getToken(tokenRoleName) : getToken()
      const { accessToken, expires } = token || {}
      if (accessToken) {
        const now = Date.now()
        const expired = Number.parseInt(`${expires}`) - now <= 0

        if (expired) {
          uni.showToast({
            title: '登录过期，请重新登录',
            icon: 'none',
          })
          if (!PureHttp.isRefreshing)
            PureHttp.isRefreshing = true
          // token过期刷新
          // useUserStore()
          //   .handRefreshToken({ refreshToken: refresh_token })
          //   .then((res) => {
          //     const { accessToken } = res.result || {};
          //     const token = accessToken;
          //     config.header["Authorization"] = formatToken(token);
          //     PureHttp.requests.forEach((cb) => cb(token));
          //     PureHttp.requests = [];
          //   })
          //   .finally(() => {
          //     PureHttp.isRefreshing = false;
          //   });

          return new Promise((resolve) => {
            PureHttp.requests.push((token) => {
              // 确保header存在
              config.header = config.header || {}
              config.header.Authorization = formatToken(token, 'Bearer')
              resolve(config)
            })
          })
        }
        else {
          // 确保header存在
          config.header = config.header || {}
          config.header.Authorization = formatToken(accessToken, 'Bearer')
        }
      }
    }
    return config
  }

  static httpInterceptorsResponse(response: any): any {
    if (PureHttp.isShowLoading && !PureHttp.isApiError)
      hideLoading()

    const { code } = response?.data || {}
    if (PureHttp.errorCodes.includes(code)) {
      PureHttp.isApiError = true
      uni.showToast({
        title: '请求异常，请稍后再试',
        icon: 'none',
      })
      return Promise.reject(response)
    }

    const statusCode = response?.statusCode
    if (statusCode === 401) {
      uni.showToast({
        title: '登录过期，请重新登录',
        icon: 'none',
      })
      const userStore = useUserStore()
      userStore.setUserInfo({})
      removeToken()
      return Promise.reject(response)
    }

    return response?.data
  }

  /** 通用请求工具函数 */
  request<T = any>(
    method: string,
    url: string,
    param: Record<string, any> = {},
    axiosConfig: Record<string, any> = {},
  ): Promise<T> {
    const config: RequestConfig = {
      method: method as any,
      url,
      ...param,
      ...axiosConfig,
      header: {
        ...axiosConfig.header,
        'content-type': CONTENT_TYPE_JSON,
      },
    }

    // 优先使用 param.data，其次 param.params
    const requestData = param.data ?? param.params ?? {}

    // 处理 content-type
    config.header = config.header || {}
    config.header['content-type']
    = method.toUpperCase() === 'GET' ? CONTENT_TYPE_JSON_UTF8 : CONTENT_TYPE_JSON

    // 处理拦截器（支持异步）
    const interceptorResult = PureHttp.httpInterceptorsRequest(config)
    const interceptorPromise
      = interceptorResult instanceof Promise
        ? interceptorResult
        : Promise.resolve(interceptorResult)

    return interceptorPromise.then((finalConfig) => {
      return new Promise((resolve, reject) => {
        const uniRequestConfig: UniApp.RequestOptions = {
          url: finalConfig.url || '',
          method: finalConfig.method as any,
          data: requestData,
          header: finalConfig.header,
          success: (res) => {
            // 清理nonce缓存
            if (finalConfig._cacheKey && finalConfig.allowDuplicateNonce !== false) {
              clearNonceCache(finalConfig._cacheKey)
            }

            const response = PureHttp.httpInterceptorsResponse(res)
            if (response instanceof Promise) {
              response.then(resolve).catch(reject)
            }
            else if (response) {
              resolve(response)
            }
            else {
              reject(res)
            }
          },
          fail: (err) => {
            // 清理nonce缓存
            if (finalConfig._cacheKey && finalConfig.allowDuplicateNonce !== false) {
              clearNonceCache(finalConfig._cacheKey)
            }
            reject(err)
          },
        }

        uni.request(uniRequestConfig)
      })
    })
  }

  /** GET 请求 */
  get<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: Partial<RequestConfig>,
  ): Promise<T> {
    return this.request('GET', url, params, config)
  }

  /** POST 请求 */
  post<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: Partial<RequestConfig>,
  ): Promise<T> {
    return this.request('POST', url, data, config)
  }

  /** PUT 请求 */
  put<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: Partial<RequestConfig>,
  ): Promise<T> {
    return this.request('PUT', url, data, config)
  }

  /** DELETE 请求 */
  delete<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: Partial<RequestConfig>,
  ): Promise<T> {
    return this.request('DELETE', url, params, config)
  }
}

export const http = new PureHttp()
export default http
