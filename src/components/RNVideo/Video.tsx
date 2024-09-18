import { COLORS } from '@/shared/constants/colors';
import useVisibility from '@/shared/hooks/useVisibility';
import Orientation, {
  useOrientationChange,
} from 'react-native-orientation-locker';
import SystemSetting from 'react-native-system-setting';
import RNVideo, { OnProgressData, VideoRef } from 'react-native-video';

import { CoreStyle } from '@/shared/styles/globalStyles';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BackButton from '../BackButton';
import RN from '../RN';
import { styles } from './styles';
import { RNVideoBottomControlls, RNVideoCentrialControlls } from './ui';
import { useRNVideo } from './useRNVideo';

interface VideoProps {
  id: string;
  onBack?: () => void;
}

export const Video: FC<VideoProps> = memo(({ id, onBack }) => {
  const { movieUrl } = useRNVideo({ id });
  const playVisiblity = useVisibility(true);
  const muteVisiblity = useVisibility();
  const controllerVisiblity = useVisibility(true);
  const loadingVisiblity = useVisibility(true);
  const expandVisiblity = useVisibility();
  const lockVisiblity = useVisibility();
  const soundVisiblity = useVisibility();
  const brightVisiblity = useVisibility();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const [bright, setBright] = useState(0);

  // refs
  const videoRef = useRef<VideoRef>(null);
  const isFull = useRef(false);
  const seekRef = useRef(false);
  const screenTouch = useRef<null | NodeJS.Timeout>(null);
  const volumeCounter = useRef(0);
  const brightCounter = useRef(0);

  const resetTimeout = useCallback(() => {
    if (screenTouch.current) {
      clearTimeout(screenTouch.current);
    }
    screenTouch.current = setTimeout(() => {
      controllerVisiblity.hide();
    }, 3000);
  }, [controllerVisiblity]);

  const startTimeout = useCallback(() => {
    if (screenTouch.current) {
      clearTimeout(screenTouch.current);
    }
    screenTouch.current = setTimeout(() => {
      controllerVisiblity.hide();
    }, 3000);
  }, [controllerVisiblity]);

  const onFullScreen = useCallback(() => {
    expandVisiblity.toggle();
    if (!isFull.current) {
      isFull.current = true;
      Orientation.lockToLandscapeLeft();
    } else {
      isFull.current = false;
      Orientation.lockToPortrait();
    }
    resetTimeout();
  }, [expandVisiblity, resetTimeout]);

  const onChangeVideoDuration = useCallback(([value]: any) => {
    setCurrentTime(value);
    seekRef.current = true;
    videoRef.current?.seek(value);
  }, []);

  const onChangeVolumeOfSystem = useCallback(async (val: number) => {
    SystemSetting.setVolume(val);
  }, []);

  const onChangeBrightOfSystem = useCallback(async (val: number) => {
    await SystemSetting.setAppBrightness(val);
  }, []);

  const onChangeVolume = useCallback(
    (value: number) => {
      if (lockVisiblity.visible) return;
      setVolume((pr) => {
        if (Math.floor(pr) !== Math.floor(value)) {
          volumeCounter.current++;
          if (volumeCounter.current > 3) {
            soundVisiblity.show();
            onChangeVolumeOfSystem(value / 100);
          }
        }
        return value;
      });
    },
    [lockVisiblity.visible, onChangeVolumeOfSystem, soundVisiblity],
  );

  const onForward = useCallback(() => {
    setCurrentTime((prevTime) => {
      const newTime = Math.min(prevTime + 10, duration);
      videoRef.current?.seek(newTime);
      return newTime;
    });
  }, [duration]);

  const onBackward = useCallback(() => {
    setCurrentTime((prevTime) => {
      const newTime = Math.max(prevTime - 10, 0);
      videoRef.current?.seek(newTime);
      return newTime;
    });
  }, []);

  const onCompleteVolume = useCallback(
    (value) => {
      if (volumeCounter.current < 3) {
        onForward();
      } else {
        soundVisiblity.hide();
      }
      volumeCounter.current = 0;
    },
    [onForward, soundVisiblity],
  );

  const onChangeBright = useCallback(
    (value: number) => {
      if (lockVisiblity.visible) return;
      setBright((pr) => {
        if (Math.floor(pr) !== Math.floor(value)) {
          brightCounter.current++;
          if (brightCounter.current > 3) {
            brightVisiblity.show();
            onChangeBrightOfSystem(value / 100);
          }
        }
        return value;
      });
    },
    [brightVisiblity, lockVisiblity.visible, onChangeBrightOfSystem],
  );

  const onCompleteBright = useCallback(
    (value) => {
      if (brightCounter.current < 3) {
        onBackward();
      } else {
        brightVisiblity.hide();
      }
      brightCounter.current = 0;
    },
    [brightVisiblity, onBackward],
  );

  const onProgress = useCallback((data: OnProgressData) => {
    if (!seekRef.current) {
      setCurrentTime(() => data.currentTime);
    }
  }, []);

  const onLoadStart = useCallback(() => {
    loadingVisiblity.show();
  }, [loadingVisiblity]);

  const onLoad = useCallback(
    (data: any) => {
      loadingVisiblity.hide();
      setDuration(data.duration);
      videoRef.current?.seek(currentTime);
    },
    [currentTime, loadingVisiblity],
  );

  const onSeek = useCallback(() => {
    seekRef.current = false;
  }, []);

  const onEnd = useCallback(() => {
    setCurrentTime(0);
    playVisiblity.show();
  }, [playVisiblity]);

  useEffect(() => {
    startTimeout();
    SystemSetting.getVolume().then((volume) => {
      setVolume(volume * 100);
    });
    SystemSetting.getAppBrightness().then((bright) => {
      setBright(bright * 100);
    });

    return () => {
      if (screenTouch.current) {
        clearTimeout(screenTouch.current);
      }
    };
  }, [startTimeout]);

  useOrientationChange((orientation) => {
    if (orientation === 'PORTRAIT') {
      isFull.current = false;
      expandVisiblity.hide();
    }
  });

  useEffect(
    () => () => {
      Orientation.lockToPortrait();
    },
    [],
  );

  return (
    <GestureHandlerRootView style={CoreStyle.flex1}>
      <RN.View
        style={styles.container}
        onTouchStart={() => {
          controllerVisiblity.show();
          resetTimeout();
        }}
        onTouchEnd={startTimeout}
      >
        {!lockVisiblity.visible && (
          <RN.View style={styles.backButton}>
            <BackButton color={COLORS.white} onGoBack={onBack} />
          </RN.View>
        )}
        {loadingVisiblity.visible && (
          <RN.View style={[RN.StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size={'small'} color={COLORS.white} />
          </RN.View>
        )}

        <RN.View style={styles.mainContainer}>
          {/* Video section*/}
          <RN.View
            style={[
              styles.videoContainer,
              expandVisiblity.visible && { height: '90%' },
            ]}
          >
            <RNVideo
              ref={videoRef}
              source={{ uri: movieUrl! }}
              paused={playVisiblity.visible}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              onSeek={onSeek}
              onProgress={onProgress}
              onEnd={onEnd}
              style={styles.video}
              resizeMode={'contain'}
              repeat={true}
              useTextureView={true}
              muted={muteVisiblity.visible}
              ignoreSilentSwitch={'ignore'}
              onPictureInPictureStatusChanged={(props) =>
                console.log('PIP STATE CHANGE', props)
              }
            />

            {/* centrial button */}
            {controllerVisiblity.visible && (
              <RNVideoCentrialControlls
                volume={volume}
                bright={bright}
                onChangeVolume={onChangeVolume}
                onCompleteBright={onCompleteBright}
                onCompleteVolume={onCompleteVolume}
                onChangeBright={onChangeBright}
                playVisiblity={playVisiblity}
                onForward={onForward}
                onBackward={onBackward}
                isShowVolume={soundVisiblity.visible}
                isShowBright={brightVisiblity.visible}
                isLock={lockVisiblity.visible}
              />
            )}
          </RN.View>

          {/* bottom controlls */}
          {controllerVisiblity.visible && (
            <RNVideoBottomControlls
              lockVisiblity={lockVisiblity}
              currentTime={currentTime}
              duration={duration}
              onChangeVideoDuration={onChangeVideoDuration}
              onExpandHandler={onFullScreen}
              expandVisiblity={expandVisiblity}
            />
          )}
        </RN.View>
      </RN.View>
    </GestureHandlerRootView>
  );
});

Video.displayName = 'Video';
export default Video;
