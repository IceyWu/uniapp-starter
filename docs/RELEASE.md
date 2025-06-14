# 版本发布工具使用说明

本项目提供了自动化的版本发布工具，支持版本号更新、changelog 生成、Git 提交和推送等功能。

## 功能特性

- ✅ 自动更新版本号（支持 major、minor、patch 等）
- ✅ 自动生成 changelog（使用 changelogen）
- ✅ 自动创建 Git 标签
- ✅ 自动推送到远程仓库（包括 tags）
- ✅ 交互式版本类型选择
- ✅ 工作目录状态检查
- ✅ 发布前确认

## 使用方法

### Node.js 版本

```bash
# 交互式选择版本类型
npm run release

# 直接指定版本类型
npm run release:patch   # 修复版本 (0.0.x)
npm run release:minor   # 功能版本 (0.x.0)
npm run release:major   # 重大版本 (x.0.0)
npm run release:pre     # 预发布版本
```

### 手动运行脚本

```bash
# Node.js 版本
node scripts/release.js
node scripts/release.js patch
powershell -ExecutionPolicy Bypass -File scripts/release.ps1 patch
```

## 版本类型说明

| 类型 | 说明 | 示例 |
|------|------|------|
| `patch` | 修复版本，向后兼容的错误修复 | 1.0.0 → 1.0.1 |
| `minor` | 功能版本，向后兼容的新功能 | 1.0.0 → 1.1.0 |
| `major` | 重大版本，不向后兼容的更改 | 1.0.0 → 2.0.0 |
| `premajor` | 预发布重大版本 | 1.0.0 → 2.0.0-0 |
| `preminor` | 预发布功能版本 | 1.0.0 → 1.1.0-0 |
| `prepatch` | 预发布修复版本 | 1.0.0 → 1.0.1-0 |
| `prerelease` | 预发布版本递增 | 1.0.0-0 → 1.0.0-1 |

## 发布流程

1. **环境检查**：确认是 Git 仓库且工作目录干净
2. **版本选择**：交互式选择或直接指定版本类型
3. **版本更新**：自动更新 package.json 中的版本号
4. **生成 Changelog**：使用 changelogen 生成变更日志
5. **确认发布**：显示即将发布的版本，等待用户确认
6. **Git 操作**：
   - 添加所有更改到暂存区
   - 提交更改（提交消息：`chore(release): vX.X.X`）
   - 创建版本标签
   - 推送代码和标签到远程仓库

## 注意事项

1. **工作目录必须干净**：发布前确保所有更改都已提交
2. **Git 远程仓库**：确保已配置远程仓库且有推送权限
3. **依赖要求**：
   - 已安装 `changelogen`（用于生成 changelog）
   - Node.js 环境
4. **取消发布**：在确认步骤选择 "N" 可以取消发布并回滚版本更改

## 单独生成 Changelog

如果只想生成 changelog 而不发布版本：

```bash
npm run changelog
```

## 错误处理

- 如果发布过程中出现错误，脚本会自动退出
- 版本号回滚：如果在确认前取消，会自动回滚 package.json 的版本更改
- 详细错误信息：脚本会输出详细的错误信息帮助调试

## 自定义配置

如需自定义 changelogen 配置，可以在项目根目录创建 `changelogen.config.js` 文件：

```javascript
export default {
  // changelogen 配置选项
  types: {
    feat: { title: '🚀 Features' },
    fix: { title: '🐛 Bug Fixes' },
    // ... 更多配置
  }
}
```

更多配置选项请参考 [changelogen 文档](https://github.com/unjs/changelogen)。
