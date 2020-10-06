import React from "react"
import { StyleSheet, Text, View } from "react-native"
import TrackPlayer from "react-native-track-player"

TrackPlayer.registerPlaybackService(() => require("./TrackPlayerService"))

const track = {
  id: "1",
  url:
    "https://traffic.libsyn.com/secure/allearsenglish/AEE_1436_What_Do_Lip_Balm_Toy_Hoops_and_Moving_Staircases_Have_in_Common.mp3?dest-id=161870",
  title: "What Do Lip Balm, Toy Hoops, and Moving Staircases Have in Common?",
  artist: "All Ears English",
}

export default function App() {
  React.useEffect(() => {
    ;(async () => {
      await TrackPlayer.destroy()
      await TrackPlayer.setupPlayer()
      await TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
        jumpInterval: 30,
      })
      await TrackPlayer.add([track])
      await TrackPlayer.play()
    })()
  }, [])
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
