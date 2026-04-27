#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const generatedDirectories = [
  '.adal',
  '.agent',
  '.augment',
  '.codebuddy',
  '.commandcode',
  '.continue',
  '.cortex',
  '.crush',
  '.factory',
  '.goose',
  '.iflow',
  '.junie',
  '.kilocode',
  '.kode',
  '.mcpjam',
  '.mux',
  '.neovate',
  '.openhands',
  '.pi',
  '.pochi',
  '.qoder',
  '.qwen',
  '.roo',
  '.vibe',
  '.windsurf',
  '.zencoder',
  'skills',
]

const generatedFiles = ['skills-lock.json']

function getNpxCommand() {
  return process.platform === 'win32' ? 'npx.cmd' : 'npx'
}

function cleanupGeneratedArtifacts() {
  for (const entry of [...generatedDirectories, ...generatedFiles]) {
    const targetPath = resolve(process.cwd(), entry)

    if (!existsSync(targetPath)) {
      continue
    }

    rmSync(targetPath, { recursive: true, force: true })
    console.log(`[skills:add] removed ${entry}`)
  }
}

function run() {
  const isWindows = process.platform === 'win32'
  const result = spawnSync(
    getNpxCommand(),
    ['-y', 'skills', 'add', 'IceyWu/skills', '--all', '--copy', '-y'],
    {
      stdio: 'inherit',
      cwd: process.cwd(),
      shell: isWindows,
    }
  )

  const result2 = spawnSync(
    getNpxCommand(),
    ['-y', 'skills', 'add', 'wot-ui/open-wot', '--all', '--copy', '-y'],
    {
      stdio: 'inherit',
      cwd: process.cwd(),
      shell: isWindows,
    }
  )

  cleanupGeneratedArtifacts()

  if (result.error) {
    throw result.error
  }
  if (result2.error) {
    throw result2.error
  }

  process.exit(result.status || result2.status || 0)
}

run()
