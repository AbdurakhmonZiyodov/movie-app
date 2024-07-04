import { VIDEO_BASE_URL } from '@/config';
import { useMovieInfoQuery } from '@/store/services/features/MovieApi';
import { useMemo, useState } from 'react';

const addFormat = (format: number | null) => {
  if (!format) return '';
  return `?resolution=${format}`;
};

export const useRNVideo = ({ id }: { id: string }) => {
  const { data: movieInfo } = useMovieInfoQuery({ id });
  const [format, setFormat] = useState<number | null>(null);

  const movieUrl = useMemo(
    () => VIDEO_BASE_URL + '/' + movieInfo?.video + addFormat(format),
    [format, movieInfo?.video],
  );

  const values = useMemo(
    () => ({
      movieUrl,
      formatList: movieInfo?.format || [],
      format,
      setFormat,
    }),
    [format, movieInfo, movieUrl],
  );

  return values;
};
