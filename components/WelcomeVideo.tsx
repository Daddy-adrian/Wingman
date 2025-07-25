
//imports
import { useEvent } from 'expo';
import { useRouter,useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/theme';



// link to video's url
const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

// function to display video
export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  // adding event to play or pause
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  
  // initalizing router to handle skip button
  const router = useRouter();

  // stoping the video playback once routing to a new screen
    useFocusEffect(
    useCallback(() => {
      return () => {
        player.pause();
      };
    }, [player])
  );

  // video, controls and skip buttons views
  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
      <View style={styles.skipButtonContainer}>
          <Button
           title="Skip"
           color={colors.primary}
           
           onPress={() => router.navigate('../authServices')}
          />    
      </View>
       
    <View style={styles.controlsContainer}>
        <Button 
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

// setting dimension and style of video and buttons on screen
const { width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: width,
    height: height,
  },
    skipButtonContainer: {
    position: 'absolute',      // layer it above the video
    bottom: 100,               // place 100px up from bottom of screen   
    alignSelf: 'center',       // center horizontally
    zIndex: 1,                 // ensure it sits above the play/pause View
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    zIndex: 0,
  },
});
