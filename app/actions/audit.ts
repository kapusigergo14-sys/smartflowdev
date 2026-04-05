'use server';

import { scoreOutdated } from '@/lib/scoreOutdated';
import type { OutdatedScore } from '@/lib/types';

export async function runAudit(url: string): Promise<OutdatedScore> {
  if (!url || typeof url !== 'string' || url.length > 500) {
    return {
      score: 0,
      breakdown: 'invalid_url',
      signals: {
        wordpress: false, jquery: false, exposedDirListing: false, brokenBuilder: false,
        legacyPages: false, noViewport: false, psiMobileScore: null,
      },
      observations: {
        jqueryVersion: null, pageWeightMb: null, lcpSeconds: null,
        renderBlockingCount: null, unoptimizedImages: false,
      },
      loadTime: null,
      blocked: true,
      error: 'invalid_url',
    };
  }
  return scoreOutdated(url);
}
