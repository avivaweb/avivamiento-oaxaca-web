export interface ProcessRequest {
  audioUrl: string;
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
  };
}

export interface TranscriptionResult {
  text: string;
  confidence: number;
  duration: number;
  language: string;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
  socialMediaCopy: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  hashtags: string[];
}

export interface VisualMetadata {
  suggestedImages: string[];
  colorPalette: string[];
  thumbnailUrl?: string;
}

export interface ProcessResult {
  success: boolean;
  data?: {
    transcription: TranscriptionResult;
    seoContent: SeoContent;
    visualMetadata: VisualMetadata;
  };
  error?: string;
}