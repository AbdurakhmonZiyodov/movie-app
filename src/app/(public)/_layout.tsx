import { Stack } from 'expo-router';
import { PUBLIC_STACK } from '../(private)/(tabs)/routes';

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PUBLIC_STACK.sign_in} />
      <Stack.Screen name={PUBLIC_STACK.sign_up} />
    </Stack>
  );
}
