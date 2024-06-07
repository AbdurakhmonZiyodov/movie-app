import { Stack } from 'expo-router';
import { PUBLIC_STACK } from '../../shared/routes';

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PUBLIC_STACK.login} />
      <Stack.Screen name={PUBLIC_STACK.otp} />
      <Stack.Screen name={PUBLIC_STACK.profile} />
    </Stack>
  );
}
