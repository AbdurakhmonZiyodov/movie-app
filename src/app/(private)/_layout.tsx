import { Stack } from 'expo-router';
import { PRIVATE_STACK } from '../../shared/routes';

export default function PrivateLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PRIVATE_STACK.tab} />
      <Stack.Screen name={PRIVATE_STACK.movieOfCategory} />
    </Stack>
  );
}
