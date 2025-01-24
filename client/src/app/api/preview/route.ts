import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

function getPreviewPath(contentType: string | undefined, slug: string | null, locale: string | null, status: string | null): string {
  const basePath = (() => {
    if (!contentType) return '/';

    if (contentType === 'article' || contentType.includes('articles')) {
      return slug ? '/articles/' + slug : '/articles';
    }
    return '/' + contentType;
  })();

  const localePath = locale && locale !== 'en' ? '/' + locale + basePath : basePath;
  const statusParam = status ? '?status=' + status : '';
  return localePath + statusParam;
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');
  const uid = searchParams.get('uid');
  const status = searchParams.get('status');

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const contentType = uid?.split(".").pop();
  const finalPath = getPreviewPath(contentType, slug, locale, status);

  const draft = await draftMode();
  status === 'draft' ? draft.enable() : draft.disable();
  redirect(finalPath);
};