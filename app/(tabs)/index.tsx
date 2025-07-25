import { StyleSheet } from 'react-native';

import WelcomeVideo from '@/components/WelcomeVideo';

// using the WelcomeVideo file in the home screen
export default function HomeScreen() {
  return (
   <WelcomeVideo />
  );
}
// styling the home screen
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
