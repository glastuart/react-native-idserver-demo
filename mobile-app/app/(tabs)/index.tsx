import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Button, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri();

export default function HomeScreen() {
  const discovery = AuthSession.useAutoDiscovery('https://localhost:7039');
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'cwm.client',
      redirectUri,
      scopes: ['profile', 'openid', 'myApi.read'],
    },
    discovery
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/wp-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Identity Server - Login</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Login to WealthPro" disabled={!request} onPress={() => promptAsync()} />
      </ThemedView>
      {result && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="title">Auth Result:</ThemedText>
          <ThemedText>{JSON.stringify(result, null, 2)}</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
