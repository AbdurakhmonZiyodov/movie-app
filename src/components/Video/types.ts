import { Drm, TextTrackType } from 'react-native-video';

type QualityResolutionTypes =
  | 144
  | 240
  | 360
  | 480
  | 576
  | 720
  | 1080
  | 1440
  | 2160
  | 4320;
export type QualityNameTypes = `${QualityResolutionTypes}p${any}`;
export type QualityTypes = 'auto' | QualityNameTypes;

export type QualityMapTypes = {
  [quality: QualityNameTypes]: {
    name: QualityNameTypes;
    label: string;
    height: number;
    uri: string;
  };
};

export type SubtitleTypes = {
  title: string;
  language: string;
  type: TextTrackType;
  uri: string;
};

export type ChapterTypes = {
  time: number;
  title: string;
};

export type ManifestQualityMapTypes = {
  label: string;
  name: QualityNameTypes;
  height: number;
}[];

export type MediaTypeTypes = 'vod' | 'live';

export type ManifestTypes = {
  id: string;
  type: MediaTypeTypes;
  workspaceId: string;
  projectId: string;
  folderId: string;
  title: string;
  posterUrl: string;
  chapters: ChapterTypes[];
  subtitles: SubtitleTypes[];
  hlsLink: string;
  dashLink: string;
  dashDrm: Drm | undefined;
  hlsDrm: Drm | undefined;
  qualityMap: QualityMapTypes;
};

export type ManifestEventLoadTypes = {
  title: string;
  chapters: ChapterTypes[];
  subtitles: {
    title: string;
    language: string;
  }[];
  quality: { label: string; name: QualityNameTypes }[];
};

export type ManifestEventsTypes = {
  onManifestLoadStart?: () => void;
  onManifestLoad?: (manifest: ManifestEventLoadTypes) => void;
  onManifestError?: (error: unknown) => void;
};

export type CommitType = {
  id: string;
  message: string;
  created_at: string;
  movie_id: string;
  user_id: string;
  count_like: number;
  count_dislike: number;
  is_like: boolean;
  is_dislike: boolean;
  user: {
    id: string;
    name: string;
    image: null | string;
  };
};

export type PremiumDiscountType = {
  id: string;
  name: string;
  price: number;
  premium_date: number;
  is_active: boolean;
  price_discount: number;
  discount: number;
};

export interface OrderType {
  success: boolean;
  message: string;
  data: {
    id: string;
    tid: any;
    success: boolean;
    price: any;
    discount: number;
    user_id: string;
    plan_id: any;
    promo_id: any;
    promo: any;
  };
}

export interface SettingsType {
  success: boolean;
  data: {
    isGoogle: boolean;
    isPremium: boolean;
    isPayme: boolean;
    isService: boolean;
  };
}
