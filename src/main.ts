import { createSSRApp } from 'vue'
import store from '@/store'
import App from './App.vue'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App).use(store)

  return {
    app,
  }
}
