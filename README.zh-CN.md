# wiki-mcp-server

[English](./README.md) | 中文

用于读取 Wiki 文档内容的 MCP (Model Context Protocol) Server，基于 TypeScript 构建，使用 stdio 传输协议。

## 功能

- 提供 `get_wiki_content` 工具 — 传入 Wiki 页面链接，返回文档内容
- stdio 传输协议，兼容所有主流 MCP 客户端

## 环境变量

| 变量 | 必填 | 说明 |
|---|---|---|
| `WIKI_DOMAIN` | 是 | Wiki 域名，如 `www.xxxx.com.wiki` |
| `WIKI_TOKEN` | 是 | Wiki API 鉴权 Token |

## IDE / 客户端配置

### Claude Code

添加到当前项目：

```bash
claude mcp add wiki-mcp -e WIKI_DOMAIN=www.xxxx.com.wiki -e WIKI_TOKEN=your_token -- npx wiki-mcp-server
```

添加为全局（所有项目可用）：

```bash
claude mcp add wiki-mcp -s user -e WIKI_DOMAIN=www.xxxx.com.wiki -e WIKI_TOKEN=your_token -- npx wiki-mcp-server
```

### Cursor

在项目根目录的 `.cursor/mcp.json`（或全局 `~/.cursor/mcp.json`）中添加：

```json
{
  "mcpServers": {
    "wiki-mcp": {
      "command": "npx",
      "args": ["wiki-mcp-server"],
      "env": {
        "WIKI_DOMAIN": "www.xxxx.com.wiki",
        "WIKI_TOKEN": "your_token"
      }
    }
  }
}
```

### VS Code (Copilot)

在项目根目录的 `.vscode/mcp.json` 中添加：

```json
{
  "servers": {
    "wiki-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["wiki-mcp-server"],
      "env": {
        "WIKI_DOMAIN": "www.xxxx.com.wiki",
        "WIKI_TOKEN": "your_token"
      }
    }
  }
}
```

### Windsurf

在 `~/.codeium/windsurf/mcp_config.json` 中添加：

```json
{
  "mcpServers": {
    "wiki-mcp": {
      "command": "npx",
      "args": ["wiki-mcp-server"],
      "env": {
        "WIKI_DOMAIN": "www.xxxx.com.wiki",
        "WIKI_TOKEN": "your_token"
      }
    }
  }
}
```

### Cline (VS Code 插件)

打开 **Cline Settings > MCP Servers**，点击 **Installed**，添加：

```json
{
  "mcpServers": {
    "wiki-mcp": {
      "command": "npx",
      "args": ["wiki-mcp-server"],
      "env": {
        "WIKI_DOMAIN": "www.xxxx.com.wiki",
        "WIKI_TOKEN": "your_token"
      }
    }
  }
}
```

### Claude Desktop

在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "wiki-mcp": {
      "command": "npx",
      "args": ["wiki-mcp-server"],
      "env": {
        "WIKI_DOMAIN": "www.xxxx.com.wiki",
        "WIKI_TOKEN": "your_token"
      }
    }
  }
}
```

## 工具说明

### `get_wiki_content`

通过 Wiki 页面链接获取文档内容。

**参数**：

| 参数 | 类型 | 说明 |
|---|---|---|
| `url` | `string` | Wiki 页面链接 |

**支持的链接格式**：

```
http://{domain}/wiki/#/team/{teamId}/space/{spaceId}/page/{pageId}
```

**示例**：

```
http://www.xxxx.com.wiki/wiki/#/team/LKFtX4kz/space/wxhon4QH/page/LFfnyZxV
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式运行
WIKI_DOMAIN=www.xxxx.com.wiki WIKI_TOKEN=your_token npm run dev

# 构建
npm run build
```

## 调试

### 使用 MCP Inspector

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是 MCP 官方调试工具：

```bash
# 通过 MCP Inspector 运行
npx @modelcontextprotocol/inspector -e WIKI_DOMAIN=www.xxxx.com.wiki -e WIKI_TOKEN=your_token -- npx tsx src/index.ts
```

打开终端输出的 URL，可以在 Inspector 界面中查看工具列表、调用 `get_wiki_content`、查看请求/响应详情。

### 使用 Claude Code 调试模式

```bash
# 启用 MCP 调试日志
claude --mcp-debug
```

会在终端打印所有 MCP 请求/响应消息，便于排查通信问题。

### 手动 stdin/stdout 测试

服务使用 stdio 传输协议，可以直接通过管道发送 JSON-RPC 消息测试：

```bash
# 发送 initialize 请求
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | WIKI_DOMAIN=www.xxxx.com.wiki WIKI_TOKEN=your_token npx tsx src/index.ts
```

## 许可证

MIT
