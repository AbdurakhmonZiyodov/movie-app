import { COLORS, addAlpha } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { isAndroid } from '@/shared/constants/platform';
import useVisibility from '@/shared/hooks/useVisibility';
import { HIT_SLOP } from '@/shared/styles/globalStyles';
import { FontAwesome6 as FontAwesomeIcon } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {
  ResizeMode,
  Video as ExpoVideo,
  VideoFullscreenUpdate,
  AVPlaybackStatus,
} from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';
import RN from '../RN';

interface VideoProps {
  uri: string;
  loading?: boolean;
}

const CLOSING_TIME_OF_CONTROLLER = 5_000;

export const Video: FC<VideoProps> = memo(({ uri, loading }) => {
  const videoRef = useRef<ExpoVideo>(null);
  const [status, setStatus] = useState<any>({});
  const playVisiblity = useVisibility();
  const controllerVisiblity = useVisibility(true);
  const loadingVisiblity = useVisibility(true);
  const interval = useRef<NodeJS.Timeout>();

  const onForwardPress = useCallback(() => {
    videoRef.current?.setPositionAsync(status.positionMillis + 10000);
  }, [status?.positionMillis]);

  const onBackwardPress = useCallback(() => {
    videoRef.current?.setPositionAsync(status.positionMillis - 10000);
  }, [status?.positionMillis]);

  const onSliderChange = useCallback(
    (value: number) => {
      videoRef.current?.setPositionAsync(value * status.durationMillis);
    },
    [status?.durationMillis],
  );

  const formatTime = useCallback((time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const showControls = useCallback(() => {
    if (controllerVisiblity.visible) return 0;
    clearTimeout(interval.current);
    playVisiblity.show();
    controllerVisiblity.show();
  }, [controllerVisiblity, playVisiblity]);

  const onUpdateStatus = useCallback((val: AVPlaybackStatus) => {
    setStatus(val);
  }, []);

  const toggleFullScreen = useCallback(async () => {
    if (status.isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
      await videoRef.current?.dismissFullscreenPlayer();
    } else {
      await videoRef.current?.presentFullscreenPlayer();
      if (isAndroid) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
        );
      }
    }
  }, [status.isFullscreen]);

  useEffect(() => {
    if (playVisiblity.visible) {
      interval.current = setTimeout(
        controllerVisiblity.hide,
        CLOSING_TIME_OF_CONTROLLER,
      );
    } else {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    }
  }, [
    controllerVisiblity.hide,
    playVisiblity.visible,
    controllerVisiblity.visible,
  ]);

  return (
    <RN.TouchableWithoutFeedback
      style={styles.container}
      onPress={showControls}
    >
      <RN.View style={styles.container}>
        {/* loading... */}
        {(loadingVisiblity.visible || loading) && (
          <RN.View style={[RN.StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size={'small'} color={COLORS.white} />
            {/* <RN.Text style={styles.loadingText}>{`${loadedPercent}%`}</RN.Text> */}
          </RN.View>
        )}
        {/* Video */}
        <ExpoVideo
          ref={videoRef}
          source={{ uri }}
          style={styles.video}
          onLoad={() => {
            loadingVisiblity.hide();
          }}
          resizeMode={ResizeMode.CONTAIN}
          onFullscreenUpdate={async (event) => {
            if (isAndroid) {
              switch (event.fullscreenUpdate) {
                case VideoFullscreenUpdate.PLAYER_DID_PRESENT:
                  await ScreenOrientation.unlockAsync();
                  break;
                case VideoFullscreenUpdate.PLAYER_WILL_DISMISS:
                  await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.PORTRAIT,
                  );
                  break;
              }
            } else {
              if (
                event.fullscreenUpdate ===
                VideoFullscreenUpdate.PLAYER_WILL_DISMISS
              ) {
                await ScreenOrientation.lockAsync(
                  ScreenOrientation.OrientationLock.PORTRAIT_UP,
                );
              }
            }
          }}
          shouldPlay={playVisiblity.visible}
          onPlaybackStatusUpdate={onUpdateStatus}
          useNativeControls={false}
        />
        {controllerVisiblity.visible && (
          <>
            {/* controller */}
            <RN.View style={[RN.StyleSheet.absoluteFill, styles.controls]}>
              {/* left button */}
              <RN.TouchableOpacity
                onPress={onBackwardPress}
                style={styles.controlButton}
              >
                <RN.Text style={styles.controlText}>{'-10s'}</RN.Text>
              </RN.TouchableOpacity>

              {/* play button */}
              <RN.TouchableOpacity
                onPress={playVisiblity.toggle}
                style={styles.playButton}
              >
                {playVisiblity.visible ? (
                  <FontAwesomeIcon
                    name={'pause'}
                    color={COLORS.white}
                    size={50}
                  />
                ) : (
                  <FontAwesomeIcon
                    name={'play'}
                    color={COLORS.white}
                    size={50}
                  />
                )}
              </RN.TouchableOpacity>

              {/* right button */}
              <RN.TouchableOpacity
                onPress={onForwardPress}
                style={styles.controlButton}
              >
                <RN.Text style={styles.controlText}>{'+10s'}</RN.Text>
              </RN.TouchableOpacity>
            </RN.View>
            <RN.View style={styles.sliderContainer}>
              {/* Slider */}
              <RN.View pb={4}>
                <RN.Text style={styles.timeText}>
                  {formatTime(status.positionMillis)}
                </RN.Text>
              </RN.View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                hitSlop={HIT_SLOP}
                minimumTrackTintColor={COLORS.white}
                maximumTrackTintColor={addAlpha(COLORS.white, 0.5)}
                // thumbTintColor={'transparent'}
                thumbTintColor={COLORS.white}
                value={status.positionMillis / status.durationMillis || 0}
                onValueChange={onSliderChange}
              />
              <RN.View fd={'row'} g={4} pb={4} pr={4}>
                <RN.Text style={styles.timeText}>
                  {formatTime(status.durationMillis)}
                </RN.Text>
                <RN.TouchableOpacity
                  onPress={toggleFullScreen}
                  hitSlop={HIT_SLOP}
                >
                  <FontAwesomeIcon
                    name={'expand'}
                    color={COLORS.white}
                    size={20}
                  />
                </RN.TouchableOpacity>
              </RN.View>
            </RN.View>
          </>
        )}
      </RN.View>
    </RN.TouchableWithoutFeedback>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    height: normalizeHeight(300),
    width: '100%',
  },
  slider: {
    height: 40,
    flex: 1,
  },
  loading: {
    zIndex: 2,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.white,
    marginTop: 10,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  controlButton: {
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: addAlpha(COLORS.white, 0.3),
  },
  controlText: {
    color: addAlpha(COLORS.white, 0.7),
  },
  timeText: {
    color: COLORS.white,
    width: 55,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

Video.displayName = 'Video';
export default Video;
