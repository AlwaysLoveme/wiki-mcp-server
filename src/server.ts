import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { parseWikiLink, fetchWikiContent } from './wiki.js';

export function createMcpServer(domain: string, token: string): McpServer {
  const server = new McpServer({
    name: 'wiki-mcp-server',
    version: '1.0.0',
  });

  server.registerTool(
    'get_wiki_content',
    {
      title: 'Get Wiki Content',
      description: 'Fetch the content of a wiki page by its link',
      inputSchema: {
        url: z
          .string()
          .describe(
            'Wiki page link, e.g. http://{domain}/wiki/#/team/{teamId}/space/{spaceId}/page/{pageId}',
          ),
      },
    },
    async ({ url }) => {
      const { teamId, pageId } = parseWikiLink(url);
      const content = await fetchWikiContent(domain, token, teamId, pageId);
      return { content: [{ type: 'text' as const, text: content }] };
    },
  );

  return server;
}
