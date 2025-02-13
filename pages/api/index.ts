import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function handler(req: NextRequest) {
  const url = new URL(req.url);
  url.host = 'api.openai.com';
  url.pathname = url.pathname.replace(/^\/api/, '');

  const headers = new Headers(req.headers);
  headers.delete('x-forwarded-for');
  headers.delete('x-real-ip');

  const response = await fetch(url, {
    method: req.method,
    headers: headers,
    body: req.method !== 'GET' ? req.body : null,
  });

  return new Response(
    response.body,
    {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}
