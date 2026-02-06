# wiki-mcp-server

English | [中文](./README.zh-CN.md)

MCP (Model Context Protocol) Server for reading wiki document content. Built with TypeScript, using stdio transport.

## Features

- Provides `get_wiki_content` tool — pass a wiki page link, get the document content
- stdio transport, compatible with all mainstream MCP clients

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `WIKI_DOMAIN` | Yes | Wiki domain, e.g. `www.xxxx.com.wiki` |
| `WIKI_TOKEN` | Yes | Authorization token for the wiki API |

## IDE / Client Configuration

### Claude Code

Add to current project:

```bash
claude mcp add wiki-mcp -e WIKI_DOMAIN=www.xxxx.com.wiki -e WIKI_TOKEN=your_token -- npx wiki-mcp-server
```

Add globally (available in all projects):

```bash
claude mcp add wiki-mcp -s user -e WIKI_DOMAIN=www.xxxx.com.wiki -e WIKI_TOKEN=your_token -- npx wiki-mcp-server
```

### Cursor

Add to `.cursor/mcp.json` in your project root (or `~/.cursor/mcp.json` for global):

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

Add to `.vscode/mcp.json` in your project root:

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

Add to `~/.codeium/windsurf/mcp_config.json`:

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

### Cline (VS Code Extension)

Open **Cline Settings > MCP Servers**, click **Installed**, and add:

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

Add to `claude_desktop_config.json`:

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

## Tool Usage

### `get_wiki_content`

Fetch the content of a wiki page by its link.

**Input**:

| Parameter | Type | Description |
|---|---|---|
| `url` | `string` | Wiki page link |

**Supported link format**:

```
http://{domain}/wiki/#/team/{teamId}/space/{spaceId}/page/{pageId}
```

**Example**:

```
http://www.xxxx.com.wiki/wiki/#/team/LKFtX4kz/space/wxhon4QH/page/LFfnyZxV
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
WIKI_DOMAIN=www.xxxx.com.wiki WIKI_TOKEN=your_token npm run dev

# Build
npm run build
```

## Debugging

### Using MCP Inspector

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) is the official debugging tool for MCP servers:

```bash
# Run with MCP Inspector
npx @modelcontextprotocol/inspector -e WIKI_DOMAIN=www.xxxx.com.wiki -e WIKI_TOKEN=your_token -- npx tsx src/index.ts
```

Open the URL printed in the terminal. You can list tools, call `get_wiki_content`, and inspect request/response details in the Inspector UI.

### Using Claude Code in debug mode

```bash
# Enable MCP debug logging
claude --mcp-debug
```

This prints all MCP request/response messages to the terminal, useful for troubleshooting communication issues.

### Manual stdin/stdout testing

Since the server uses stdio transport, you can test it directly by piping JSON-RPC messages:

```bash
# Send an initialize request
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | WIKI_DOMAIN=www.xxxx.com.wiki WIKI_TOKEN=your_token npx tsx src/index.ts
```

## License

MIT
