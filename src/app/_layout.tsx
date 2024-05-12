import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ROOT_STACK } from './(private)/(tabs)/routes';
import { getAllFonts } from '@/shared/assets/fonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/shared/constants/colors';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
    ...getAllFonts(),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={CoreStyle.flex1}>
        <StatusBar animated={true} backgroundColor={COLORS.dark} />
        <RootLayoutNav />
      </GestureHandlerRootView>
    </Provider>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROOT_STACK.onboarding} redirect={true} />
      <Stack.Screen name={ROOT_STACK.public} redirect={true} />
      <Stack.Screen name={ROOT_STACK.private} />
    </Stack>
  );
}

export default RootLayout;
