/** @type {import('tailwindcss').Config} */
module.exports = {
  // v4: content 可留空，v4 自动扫描，但在某些集成下声明更稳妥
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx,js,jsx,css,scss}',
  ],
  corePlugins: {
    // 为了跨多端（尤其小程序）避免样式冲突，通常关闭 preflight
    preflight: false,
  },
  theme: {
    // 这里可以扩展自定义 token，但 v4 推荐直接使用 @theme 变量
  },
  plugins: [
    // 需要额外插件可在此添加，比如 typography/icons 等
  ],
}
