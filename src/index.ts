#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './server.js';

const domain = process.env.WIKI_DOMAIN;
const token = process.env.WIKI_TOKEN;

if (!domain || !token) {
  console.error('Missing required environment variables: WIKI_DOMAIN, WIKI_TOKEN');
  process.exit(1);
}

const server = createMcpServer(domain, token);
const transport = new StdioServerTransport();
await server.connect(transport);
