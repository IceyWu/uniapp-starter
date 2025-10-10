import { deepClone, sortObj } from '@iceywu/utils'
import * as md5Module from 'js-md5'
import qs from 'qs'
import { secretKey } from '@/config/sign'

// js-md5 的导出在不同环境下可能是 default 或直接函数，为了避免 "类型没有调用签名" 的 TS 错误，做一层兼容适配
const md5: (msg: string) => string = (md5Module as any).default ?? (md5Module as any)

function wxuuid() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  // s[19] 当前是 hex 字符，需要先解析为数字再做位运算，然后取回 hex 字符
  const s19Num = Number.parseInt(s[19], 16)
  const newS19Num = (s19Num & 0x3) | 0x8
  s[19] = hexDigits.substr(newS19Num, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return uuid
}

/**
 * 生成签名
 * @param {object} data - 需要签名的数据
 * @returns {object} - 包含 nonce、timestamp 和 sign 的对象
 */
export function encrypt(data = {}) {
  const tempData = deepClone(data)
  const timestamp = new Date().getTime()
  const nonce = wxuuid()

  // 合并数据并排序
  const signData = sortObj({
    ...data,
    nonce,
    timestamp,
  })
  const newParams = deepClone(signData)
  for (const key in newParams) {
    if (Array.isArray(newParams[key])) {
      // newParams[key] = `[${newParams[key].join(',')}]`
      newParams[key] = JSON.stringify(newParams[key])
    }
  }
  // 生成签名
  const str = qs.stringify({ ...newParams, key: secretKey }, { encode: false })
  const sign = md5(str)

  return {
    nonce,
    timestamp,
    sign,
    tempData,
  }
}
