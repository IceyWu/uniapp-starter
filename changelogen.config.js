export default {
  types: {
    feat: { title: '✨ Features | 新功能' },
    fix: { title: '🐛 Bug Fixes | 问题修复' },
    docs: { title: '📚 Documentation | 文档' },
    style: { title: '💄 Styles | 样式' },
    refactor: { title: '♻️ Code Refactoring | 代码重构' },
    perf: { title: '⚡ Performance Improvements | 性能优化' },
    test: { title: '✅ Tests | 测试' },
    build: { title: '📦 Build System | 构建' },
    ci: { title: '👷 Continuous Integration | CI' },
    chore: { title: '🔧 Chores | 其他更改' },
    revert: { title: '⏪ Reverts | 回滚' },
  },
  titles: {
    breakingChanges: '💥 Breaking Changes | 破坏性更改',
  },
  contributors: true,
  newVersion: false, // 禁用自动版本更新，由发布脚本控制
}
