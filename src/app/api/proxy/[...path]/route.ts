import { serverFetch } from '@/lib/server-fetch';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { path: string[] } },
) {
  console.log('Proxying POST to:', params.path);
  return new Response(JSON.stringify({ success: true, path: params.path }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
export async function GET(
  req: Request,
  { params }: { params: { path: string[] } },
) {
  try {
    const urlPath = '/' + params.path.join('/');
    const query = req.url.split('?')[1] || '';

    const data = await serverFetch(urlPath + (query ? `?${query}` : ''), {
      method: 'GET',
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500 },
    );
  }
}
