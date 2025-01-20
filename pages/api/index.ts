import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function handler(req: NextRequest) {
  const url = new URL(req.url);
  url.host = 'api.openai.com';

  const headers = new Headers();
  const auth = req.headers.get('Authorization');
  if (auth) headers.set('Authorization', auth);

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
