import type {
  ApiResponse,
  PaginationParams,
  PaginationResponse,
} from '@/@types/api-types'
import http from '@/utils/http'

const apiTest = {
  getTest: (params: GetTest.params) => http.get<GetTest.data>('/test', params),
  postTest: (params: PostTest.params) =>
    http.post<PostTest.data>('/test', params),
}
// export const getTest = (params) => {
//   return http.request(
//     'get',
//     '/app/activity/findAll',
//     { params },
//     {
//       isNeedFullRes: false, // 是否需要返回完整的响应对象
//       isShowLoading: true, // 是否显示loading
//       isNeedToken: false, // 是否需要token
//     }
//   )
// }

export function getDataList(
  params: PaginationParams
): Promise<ApiResponse<PaginationResponse<any>>> {
  return http.get('/postclass', params)
}

export default apiTest
