export interface OutdatedScore {
  score: number;                // 0-100, higher = more outdated
  breakdown: string;            // e.g. "wp=25;jq=15;psiPoor=15"
  signals: {
    wordpress: boolean;
    jquery: boolean;
    exposedDirListing: boolean;
    brokenBuilder: boolean;
    legacyPages: boolean;
    noViewport: boolean;
    psiMobileScore: number | null;
  };
  observations: {
    jqueryVersion: string | null;
    pageWeightMb: number | null;
    lcpSeconds: number | null;
    renderBlockingCount: number | null;
    unoptimizedImages: boolean;
  };
  loadTime: number | null;      // seconds (fetch duration)
  blocked: boolean;
  error?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  website: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  error?: string;
}
