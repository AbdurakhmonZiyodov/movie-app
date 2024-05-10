import { Stack } from 'expo-router';
import { PRIVATE_STACK } from '../(private)/(tabs)/routes';

export default function PrivateLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={PRIVATE_STACK.tab}
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
