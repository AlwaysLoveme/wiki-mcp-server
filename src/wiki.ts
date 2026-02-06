const WIKI_LINK_PATTERN = /\/team\/([^/]+)\/.*\/page\/([^/?#]+)/;

export function parseWikiLink(url: string): { teamId: string; pageId: string } {
  const match = url.match(WIKI_LINK_PATTERN);
  if (!match) {
    throw new Error(
      `Invalid wiki link: ${url}. Expected format: http://{domain}/wiki/#/team/{teamId}/space/{spaceId}/page/{pageId}`,
    );
  }
  return { teamId: match[1], pageId: match[2] };
}

export async function fetchWikiContent(
  domain: string,
  token: string,
  teamId: string,
  pageId: string,
): Promise<string> {
  const apiUrl = `http://${domain}/wiki/api/wiki/team/${teamId}/online_page/${pageId}/content`;

  const response = await fetch(apiUrl, {
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(`Wiki API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.content;
}
