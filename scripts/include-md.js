'use strict';

const fs = require('fs');
const path = require('path');

function stripFrontMatter(text) {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseArgs(args) {
  const file = args[0];

  const opts = {};
  args.slice(1).forEach(arg => {
    const index = arg.indexOf('=');
    if (index > 0) {
      const key = arg.slice(0, index);
      const value = arg.slice(index + 1).replace(/^['"]|['"]$/g, '');
      opts[key] = value;
    }
  });

  return { file, opts };
}

hexo.extend.tag.register('include_md', function(args) {
  const { file, opts } = parseArgs(args);

  if (!file) {
    throw new Error('[include_md] Missing file path.');
  }

  const snippetsRoot = hexo.source_dir;
  const fullPath = path.resolve(hexo.source_dir, file);

  // 防止通过 ../ 读取项目外部文件
  // if (!fullPath.startsWith(snippetsRoot + path.sep)) {
  //   throw new Error(`[include_md] Invalid path: ${file}`);
  // }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`[include_md] File not found: ${fullPath}`);
  }

  let text = fs.readFileSync(fullPath, 'utf8');
  text = stripFrontMatter(text);

  // 支持按 block 提取局部内容
  // 用法：{% include_md datasets/grace-notes.md block=citation %}
  if (opts.block) {
    const block = escapeRegExp(opts.block);
    const re = new RegExp(
      `<!--\\s*ncsg:start\\s+${block}\\s*-->[\\r\\n]*([\\s\\S]*?)[\\r\\n]*<!--\\s*ncsg:end\\s+${block}\\s*-->`
    );

    const matched = text.match(re);

    if (!matched) {
      throw new Error(`[include_md] Block "${opts.block}" not found in ${file}`);
    }

    text = matched[1];
  }

  // 支持按行号提取
  // 用法：{% include_md datasets/grace-notes.md lines=3:10 %}
  if (opts.lines) {
    const [startStr, endStr] = opts.lines.split(':');
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);

    const lines = text.split(/\r?\n/);

    if (!start || !end || start > end) {
      throw new Error(`[include_md] Invalid lines option: ${opts.lines}`);
    }

    text = lines.slice(start - 1, end).join('\n');
  }

  // 使用 Hexo 当前 Markdown 渲染器渲染
  return hexo.render.renderSync({
    text,
    engine: 'md'
  });
}, { ends: false });