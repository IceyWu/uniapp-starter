import http from '@/utils/http'

export interface PicsumItem {
  author: string
  download_url: string
  height: number
  id: string
  url: string
  width: number
}

const picsumConfig = {
  serverName: 'picsumServer',
  isNeedToken: false,
  isNeedEncrypt: false,
}

// 获取图片列表
export function getPicsumList(params: { limit?: number; page?: number }) {
  return http.get<PicsumItem[]>('/v2/list', { params }, picsumConfig)
}

// 获取图片详情
export function getPicsumDetail(id: string | number) {
  return http.get<PicsumItem>(`/id/${id}/info`, {}, picsumConfig)
}
