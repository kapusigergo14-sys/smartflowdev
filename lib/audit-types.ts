import type { DetectionResult, SEOResult } from './detect';

export type PhaseStatus = 'success' | 'partial' | 'failed' | 'skipped';

export interface PhaseResult<T> {
  status: PhaseStatus;
  data: T | null;
  error: string | null;
  durationMs: number;
}

export interface FetchData {
  html: string;
  finalUrl: string;
  statusCode: number;
  contentLength: number;
}

export interface ScreenshotData {
  mobileUrl: string | null;
  desktopUrl: string | null;
}

export interface PsiData {
  score: number;
  lcpSeconds: number | null;
  clsScore: number | null;
  tbt: number | null;
  strategy: 'mobile' | 'desktop';
}

export interface Suggestion {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'conversion' | 'performance' | 'seo' | 'trust';
}

export interface AuditResult {
  url: string;
  fetchedAt: string;
  overallScore: number;
  phases: {
    fetch: PhaseResult<FetchData>;
    screenshot: PhaseResult<ScreenshotData>;
    psiMobile: PhaseResult<PsiData>;
    psiDesktop: PhaseResult<PsiData>;
    chatbot: PhaseResult<DetectionResult>;
    booking: PhaseResult<DetectionResult>;
    seo: PhaseResult<SEOResult>;
    suggestions: PhaseResult<Suggestion[]>;
  };
  errors: string[];
  totalDurationMs: number;
}
