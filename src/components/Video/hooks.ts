import { useCallback, useEffect, useMemo, useState } from 'react';
import { Drm, DRMType, TextTrackType } from 'react-native-video';
import {
  ManifestEventsTypes,
  ManifestEventLoadTypes,
  ManifestQualityMapTypes,
  ManifestTypes,
  ChapterTypes,
  SubtitleTypes,
  QualityMapTypes,
} from './types';
import { METRIC_HOST } from './constants';

export type { ManifestEventsTypes };

type UseManifestTypes = ManifestEventsTypes & {
  videoId: string;
  referer: string;
  drmAuthToken: string;
};

function transformSubtitles(subtitles: any[]): SubtitleTypes[] {
  if (!subtitles) {
    return [];
  }
  return subtitles.map((subtitle) => ({
    title: subtitle.description,
    language: subtitle.language,
    type: TextTrackType.VTT,
    uri: subtitle.url,
  }));
}

function transformChapters(chapters: any[]): ChapterTypes[] {
  if (!chapters) {
    return [];
  }
  return chapters.map((chapter) => ({
    time: chapter.time,
    title: chapter.title,
  }));
}

function transformQualityMap(
  quality: ManifestQualityMapTypes,
  hlsLink: string,
) {
  const char = hlsLink.indexOf('?') === -1 ? '?' : '&';
  let result: QualityMapTypes = {};
  quality.forEach((item) => {
    result[item.name] = {
      label: item.label,
      name: item.name,
      height: item.height,
      uri: [hlsLink, 'quality=' + item.name].join(char),
    };
  });
  return result;
}

function transformManifest(json: any): ManifestTypes {
  const subtitles: SubtitleTypes[] = transformSubtitles(json?.subtitles);
  const chapters: ChapterTypes[] = transformChapters(json?.chapters?.items);
  const qualityMap = transformQualityMap(json?.quality_map, json?.hls_link);

  const fairplay = json?.drm?.fairplay;
  const widevine = json?.drm?.widevine;

  const hlsDrm: Drm | undefined = fairplay
    ? {
        type: DRMType.FAIRPLAY,
        licenseServer: fairplay?.licenseUrl,
        certificateUrl: fairplay?.certificateUrl,
      }
    : undefined;

  const dashDrm: Drm | undefined = widevine
    ? {
        type: DRMType.WIDEVINE,
        licenseServer: widevine?.licenseUrl,
      }
    : undefined;

  return {
    id: json.id,
    type: json.type,
    workspaceId: json.workspace_id,
    projectId: json.project_id,
    folderId: json.folder_id,
    title: json.title,
    posterUrl: json.poster?.url,
    subtitles: subtitles,
    chapters: chapters,
    hlsLink: json?.hls_link,
    dashLink: json?.dash_link,
    hlsDrm: hlsDrm,
    dashDrm: dashDrm,
    qualityMap: qualityMap,
  };
}

function qualitySort(a: any, b: any) {
  return b.height - a.height;
}

function publicManifest(manifest: ManifestTypes): ManifestEventLoadTypes {
  const quality = Object.values(manifest.qualityMap);
  quality.sort(qualitySort);
  return {
    title: manifest.title,
    subtitles: manifest.subtitles.map((subtitle) => ({
      title: subtitle.title,
      language: subtitle.language,
    })),
    chapters: manifest.chapters,
    quality: quality.map((item) => ({
      label: item.label,
      name: item.name,
    })),
  };
}

export default function useManifest({
  videoId,
  referer,
  drmAuthToken,
  onManifestLoadStart,
  onManifestLoad,
  onManifestError,
}: UseManifestTypes) {
  const [loading, setLoading] = useState(true);
  const [manifest, setManifest] = useState<ManifestTypes | null>(null);

  const headers = useMemo(
    () => ({
      Referer: referer,
      'x-drm-type': 'widevine',
    }),
    [referer],
  );

  const getManifest = useCallback(async () => {
    try {
      setLoading(true);
      setManifest(null);

      const response = await fetch(
        `https://${METRIC_HOST}/${videoId}.json?drmauthtoken=${drmAuthToken}`,
        {
          headers: headers,
        },
      );
      const json = await response.json();
      const manifest: ManifestTypes = transformManifest(json);

      setManifest(manifest);
      onManifestLoad && onManifestLoad(publicManifest(manifest));
    } catch (error) {
      onManifestError && onManifestError(error);
    } finally {
      setLoading(false);
    }
  }, [drmAuthToken, headers, onManifestError, onManifestLoad, videoId]);

  useEffect(() => {
    setManifest(null);
    onManifestLoadStart && onManifestLoadStart();
    getManifest();
  }, [videoId, headers, onManifestLoadStart, getManifest]);

  return {
    loading: loading,
    manifest: manifest,
  };
}
