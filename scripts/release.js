#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { createInterface } from 'node:readline'

// ANSI 颜色代码
const colors = {
  reset: '\x1B[0m',
  bright: '\x1B[1m',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  magenta: '\x1B[35m',
  cyan: '\x1B[36m',
}

// 日志函数
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`${colors.bright}${colors.cyan}${msg}${colors.reset}`),
}

// 执行命令函数
function exec(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    })
    return result?.trim()
  } catch (error) {
    log.error(`执行命令失败: ${command}`)
    log.error(error.message)
    process.exit(1)
  }
}

// 检查是否是 git 仓库
function checkGitRepo() {
  try {
    exec('git rev-parse --git-dir', { silent: true })
    return true
  } catch {
    return false
  }
}

// 检查是否有未提交的更改
function checkWorkingDirectory() {
  const status = exec('git status --porcelain', { silent: true })
  if (status) {
    log.error('工作目录不干净，请先提交或暂存更改')
    log.info('未提交的文件:')
    console.log(status)
    process.exit(1)
  }
}

// 获取当前版本
function getCurrentVersion() {
  const packagePath = resolve(process.cwd(), 'package.json')
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
  return packageJson.version
}

// 更新版本号
function updateVersion(releaseType) {
  const validTypes = [
    'major',
    'minor',
    'patch',
    'premajor',
    'preminor',
    'prepatch',
    'prerelease',
  ]

  if (!validTypes.includes(releaseType)) {
    log.error(`无效的版本类型: ${releaseType}`)
    log.info(`有效的版本类型: ${validTypes.join(', ')}`)
    process.exit(1)
  }

  log.info(`更新版本类型: ${releaseType}`)

  // 使用 npm version 更新版本
  const versionOutput = exec(
    `npm version ${releaseType} --no-git-tag-version`,
    { silent: true }
  )
  const newVersion = versionOutput.replace('v', '').trim()

  // 验证版本更新是否成功
  const updatedVersion = getCurrentVersion()
  if (updatedVersion !== newVersion) {
    log.warn(
      `版本更新验证：npm version 返回 ${newVersion}，package.json 中为 ${updatedVersion}`
    )
    return updatedVersion
  }

  return newVersion
}

// 生成 changelog
function generateChangelog(version) {
  log.info('生成 changelog...')
  try {
    // 只生成 changelog，不进行版本 bump 和 git 操作
    // 使用 --output 确保输出到 CHANGELOG.md，不使用 --release 避免自动版本管理
    exec('npx changelogen --output CHANGELOG.md')
    log.success('Changelog 生成完成')
  } catch (error) {
    log.warn('Changelog 生成失败，继续执行...')
  }
}

// Git 操作
function gitOperations(version) {
  log.info('执行 Git 操作...')

  // 添加所有更改
  exec('git add .')

  // 提交更改
  exec(`git commit -m "chore(release): v${version}"`)

  // 创建标签
  exec(`git tag -a v${version} -m "v${version}"`)

  // 推送到远程仓库
  exec('git push')
  exec('git push --follow-tags')

  log.success(`版本 v${version} 发布完成！`)
}

// 主函数
async function main() {
  log.title('🚀 版本发布工具')

  // 获取命令行参数
  const args = process.argv.slice(2)
  let releaseType = args[0]

  // 如果没有提供版本类型，提示用户选择
  if (!releaseType) {
    console.log('\n请选择版本更新类型:')
    console.log('1. patch   - 修复版本 (0.0.x)')
    console.log('2. minor   - 功能版本 (0.x.0)')
    console.log('3. major   - 重大版本 (x.0.0)')
    console.log('4. premajor - 预发布重大版本')
    console.log('5. preminor - 预发布功能版本')
    console.log('6. prepatch - 预发布修复版本')
    console.log('7. prerelease - 预发布版本')

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const answer = await new Promise((resolve) => {
      rl.question('\n请输入选项 (1-7) 或直接输入版本类型: ', resolve)
    })

    rl.close()

    const typeMap = {
      1: 'patch',
      2: 'minor',
      3: 'major',
      4: 'premajor',
      5: 'preminor',
      6: 'prepatch',
      7: 'prerelease',
    }

    releaseType = typeMap[answer] || answer.trim()
  }

  // 检查环境
  if (!checkGitRepo()) {
    log.error('当前目录不是 Git 仓库')
    process.exit(1)
  }

  checkWorkingDirectory()

  const currentVersion = getCurrentVersion()
  log.info(`当前版本: v${currentVersion}`)

  // 更新版本
  const newVersion = updateVersion(releaseType)
  log.success(`版本已更新: v${currentVersion} → v${newVersion}`)

  // 生成 changelog
  generateChangelog(newVersion)

  // 确认发布
  console.log(`\n${colors.yellow}即将发布版本 v${newVersion}${colors.reset}`)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const confirm = await new Promise((resolve) => {
    rl.question('是否继续发布？(y/N): ', resolve)
  })

  rl.close()

  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    log.warn('发布已取消')
    // 回滚版本更改
    exec('git checkout -- package.json')
    process.exit(0)
  }

  // 执行 Git 操作
  gitOperations(newVersion)

  log.title(`🎉 版本 v${newVersion} 发布成功！`)
}

// 错误处理
process.on('uncaughtException', (error) => {
  log.error('发生未捕获的错误:')
  console.error(error)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  log.error('发生未处理的 Promise 拒绝:')
  console.error(reason)
  process.exit(1)
})

// 运行主函数
main().catch((error) => {
  log.error('发布过程中发生错误:')
  console.error(error)
  process.exit(1)
})
