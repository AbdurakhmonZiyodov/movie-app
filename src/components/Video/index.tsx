import { COLORS } from '@/shared/constants/colors';
// import { isAndroid } from '@/shared/constants/platform';
// import useVisibility from '@/shared/hooks/useVisibility';
// import { Video as RNVideo } from 'expo-av';
import { ImageSource } from 'expo-image';
// import * as ScreenOrientation from 'expo-screen-orientation';
import { FC } from 'react';
// import { Platform } from 'react-native';
import RN from '../RN';
// import PlayerIcon from './PlayerIcon.svg';
import { METRIC_HOST } from './constants';
import useManifest from './hooks';
// import { QualityTypes } from './types';
import { Vimeo } from 'react-native-vimeo-iframe';

interface VideoProps {
  videoID: string;
  usePoster?: boolean;
  posterSource?: ImageSource;
}
// const quality: QualityTypes = 'auto';
const Video: FC<VideoProps> = ({ videoID, usePoster, posterSource }) => {
  // const videoRef = useRef<RNVideo>(null);
  // const playVisiblity = useVisibility();

  const videoCallbacks = {
    play: (data: any) => console.warn('play: ', data),
    pause: (data: any) => console.warn('pause: ', data),
    fullscreenchange: (data: any) => console.warn('fullscreenchange: ', data),
    ended: (data: any) => console.warn('ended: ', data),
    controlschange: (data: any) => console.warn('controlschange: ', data),
  };

  const { loading, manifest } = useManifest({
    videoId: videoID,
    referer: `https://${METRIC_HOST}`,
    drmAuthToken: '',
  });

  if (loading || !manifest) {
    return (
      <RN.View style={styles.video} jc={'center'} bgColor={COLORS.black}>
        <RN.ActivityIndicator color={COLORS.white} size={'large'} />
      </RN.View>
    );
  }

  // const getHlsLink = () =>
  //   //    @ts-ignore
  //   manifest.qualityMap[quality]?.uri || manifest.hlsLink;

  // const getSource = () => {
  //   if (Platform.OS === 'android' && manifest.dashLink) {
  //     return {
  //       uri: manifest.dashLink,
  //     };
  //   }
  //   return {
  //     uri: getHlsLink(),
  //   };
  // };

  return (
    <RN.View style={styles.video}>
      <Vimeo
        videoId={'952041996'}
        style={{ backgroundColor: COLORS.black }}
        containerStyle={{ backgroundColor: COLORS.black }}
        handlers={videoCallbacks}
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  video: {
    width: '100%',
    height: 250,
    borderRadius: 16,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playerIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: 70,
  },
});
export default Video;
