import type { ServerName } from '@/config/domain'

declare namespace Http {
  type Response<T> = Promise<{
    data?: T
  }>
  interface config {
    isNeedToken?: boolean
    isShowLoading?: boolean
    tokenRoleName?: string
    serverName?: ServerName
  }
}

declare namespace GetTest {
  interface params {
    a: number
  }
  interface data {
    name: string
    age: number
  }
}

declare namespace PostTest {
  interface params {
    a: number
  }
  interface data {
    val: string
  }
}

declare namespace GetParams {
  type params = {}
}
