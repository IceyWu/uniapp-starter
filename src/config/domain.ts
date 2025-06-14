interface ServerConfig {
  baseServer: string
  otherServer: string
  uploadServer: string
}

interface EnvMap {
  [key: string]: ServerConfig
}

const envMap: EnvMap = {
  dev: {
    baseServer: 'https://xxx',
    otherServer: 'http://x.x.x.x/section',
    uploadServer: 'https://xxx/alioss/uploadBase',
  },
  prod: {
    baseServer: 'https://xxx',
    otherServer: 'http://x.x.x.x/section',
    uploadServer: 'https://xxx/alioss/uploadBase',
  },
}
type ApiEnv = keyof typeof envMap
type ServerName = keyof ServerConfig

type EnvConfig<T extends ApiEnv> = {
  env: T
} & (typeof envMap)[T]

function createEnv<T extends ApiEnv>(env: T): EnvConfig<T> {
  return Object.assign({ env }, envMap[env])
}

// 读取环境变量，默认 'dev'
const serverChoose = (import.meta.env.VITE_APP_API_SERVER as ApiEnv) || 'dev'

const env = createEnv(serverChoose)

export default env

export type { ApiEnv, EnvConfig, ServerConfig, ServerName }
