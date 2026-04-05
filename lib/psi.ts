export interface PsiDetails {
  score: number | null;
  lcpSeconds: number | null;
  renderBlockingCount: number | null;
  unoptimizedImages: boolean;
}

export async function getPsiDetails(url: string): Promise<PsiDetails> {
  const empty: PsiDetails = { score: null, lcpSeconds: null, renderBlockingCount: null, unoptimizedImages: false };
  const key = process.env.PSI_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.set('strategy', 'mobile');
  apiUrl.searchParams.set('category', 'performance');
  if (key) apiUrl.searchParams.set('key', key);
  try {
    const res = await fetch(apiUrl.toString(), { signal: AbortSignal.timeout(45000) });
    if (!res.ok) return empty;
    const data: any = await res.json();
    const perf = data?.lighthouseResult?.categories?.performance?.score;
    const score = typeof perf === 'number' ? Math.round(perf * 100) : null;
    const audits = data?.lighthouseResult?.audits || {};
    const lcpMs = audits['largest-contentful-paint']?.numericValue;
    const lcpSeconds = typeof lcpMs === 'number' ? Math.round(lcpMs / 100) / 10 : null;
    const renderBlockingCount = audits['render-blocking-resources']?.details?.items?.length ?? null;
    const uopt = audits['uses-optimized-images']?.score;
    const uwebp = audits['modern-image-formats']?.score ?? audits['uses-webp-images']?.score;
    const unoptimizedImages = (typeof uopt === 'number' && uopt < 1) || (typeof uwebp === 'number' && uwebp < 1);
    return { score, lcpSeconds, renderBlockingCount, unoptimizedImages };
  } catch {
    return empty;
  }
}
