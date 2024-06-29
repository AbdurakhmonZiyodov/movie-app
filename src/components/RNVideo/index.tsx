import { FC } from 'react';
import Video from './Video';
import { useRNVideo } from './useRNVideo';

interface RNVideoProps {
  id: string;
}

const RNVideo: FC<RNVideoProps> = ({ id }) => {
  const { movieUrl } = useRNVideo({ id });

  console.log({ movieUrl, id });
  return <Video uri={movieUrl!} />;
};

export default RNVideo;
