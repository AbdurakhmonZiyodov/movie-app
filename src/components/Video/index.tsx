import { COLORS, addAlpha } from '@/shared/constants/colors';
import { isAndroid } from '@/shared/constants/platform';
import useVisibility from '@/shared/hooks/useVisibility';
import { Video as RNVideo, ResizeMode, VideoFullscreenUpdate } from 'expo-av';
import { ImageSource } from 'expo-image';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FC, useRef } from 'react';
import { Platform } from 'react-native';
import RN from '../RN';
import PlayerIcon from './PlayerIcon.svg';
import { METRIC_HOST } from './constants';
import useManifest from './hooks';
import { QualityTypes } from './types';

interface VideoProps {
  videoID: string;
  usePoster?: boolean;
  posterSource?: ImageSource;
}
const quality: QualityTypes = 'auto';
const Video: FC<VideoProps> = ({ videoID, usePoster, posterSource }) => {
  const videoRef = useRef<RNVideo>(null);
  const playVisiblity = useVisibility();
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

  const getHlsLink = () =>
    //    @ts-ignore
    manifest.qualityMap[quality]?.uri || manifest.hlsLink;

  const getSource = () => {
    if (Platform.OS === 'android' && manifest.dashLink) {
      return {
        uri: manifest.dashLink,
      };
    }
    return {
      uri: getHlsLink(),
    };
  };

  return (
    <RN.View style={styles.video}>
      <RNVideo
        ref={videoRef}
        isLooping={true}
        usePoster={usePoster}
        posterSource={posterSource}
        shouldPlay={playVisiblity.visible}
        style={[styles.video]}
        rate={1.0}
        volume={1.0}
        useNativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        source={getSource()}
        shouldCorrectPitch={true}
        onError={(error) => {
          console.error(['Video/onError', error]);
        }}
        onFullscreenUpdate={async (event) => {
          if (!isAndroid) return;
          switch (event.fullscreenUpdate) {
            case VideoFullscreenUpdate.PLAYER_DID_PRESENT:
              await ScreenOrientation.unlockAsync(); // only on Android required
              break;
            case VideoFullscreenUpdate.PLAYER_WILL_DISMISS:
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT,
              ); // only on Android required
              break;
          }
        }}
        PosterComponent={() => (
          <RN.View w={'100%'} bgColor={COLORS.black} zI={2}>
            <RN.Image source={posterSource} style={styles.posterImage} />
            <RN.View
              style={[
                RN.StyleSheet.absoluteFill,
                { backgroundColor: addAlpha(COLORS.dark, 0.4) },
              ]}
            />
            <RN.TouchableOpacity
              onPress={() => {
                playVisiblity.show();
              }}
              style={styles.playerIcon}
            >
              <PlayerIcon />
            </RN.TouchableOpacity>
          </RN.View>
        )}
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
