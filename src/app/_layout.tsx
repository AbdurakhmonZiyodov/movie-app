import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ROOT_STACK } from './(tabs)/routes';
import { getAllFonts } from '@/shared/assets/fonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { Provider } from 'react-redux';
import store from '@/store/store';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../shared/assets/fonts/SpaceMono-Regular.ttf'),
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
        <RootLayoutNav />
      </GestureHandlerRootView>
    </Provider>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      initialRouteName={ROOT_STACK.onboarding}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROOT_STACK.onboarding} />
      <Stack.Screen name={ROOT_STACK.tabs} />
      <Stack.Screen name={ROOT_STACK.signIn} />
      <Stack.Screen name={ROOT_STACK.signUp} />
    </Stack>
  );
}

export default RootLayout;
