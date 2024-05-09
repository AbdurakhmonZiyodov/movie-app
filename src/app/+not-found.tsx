import RN from '@/components/RN';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <RN.View style={styles.container}>
        <RN.Text style={styles.title}>{"This screen doesn't exist."}</RN.Text>

        <Link href={'/'} style={styles.link}>
          <RN.Text style={styles.linkText}>{'Go to home screen!'}</RN.Text>
        </Link>
      </RN.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
