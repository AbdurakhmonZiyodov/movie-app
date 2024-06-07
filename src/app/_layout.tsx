import { getAllFonts } from '@/shared/assets/fonts';
import { COLORS } from '@/shared/constants/colors';
import { CoreStyle } from '@/shared/styles/globalStyles';
import store, { persistor } from '@/store/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PortalProvider } from '@gorhom/portal';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ROOT_STACK } from '../shared/routes';
import { useLocalStore } from '@/store/hooks/useLocalStore';

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
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={CoreStyle.flex1}>
          <StatusBar animated={true} backgroundColor={COLORS.dark} />
          <RootLayoutNav />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const { isAuthenticated, isOnboardingViewed } = useLocalStore();

  console.log({ isAuthenticated });
  return (
    <PortalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={ROOT_STACK.onboarding}
          redirect={isOnboardingViewed}
        />

        {isAuthenticated ? (
          <Stack.Screen name={ROOT_STACK.private} />
        ) : (
          <Stack.Screen name={ROOT_STACK.public} />
        )}
      </Stack>
    </PortalProvider>
  );
}

export default RootLayout;
