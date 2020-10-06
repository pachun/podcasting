import React from "react"
import { StyleSheet, Text, View } from "react-native"
import TrackPlayer from "react-native-track-player"

const track = {
  id: "1",
  url:
    "https://traffic.libsyn.com/secure/allearsenglish/AEE_1436_What_Do_Lip_Balm_Toy_Hoops_and_Moving_Staircases_Have_in_Common.mp3?dest-id=161870",
  title: "What Do Lip Balm, Toy Hoops, and Moving Staircases Have in Common?",
  artist: "All Ears English",
}

const trackPlayerService = async function () {
  TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play())
  TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause())
  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy())
  TrackPlayer.addEventListener(
    "remote-jump-forward",
    async ({ interval }: { interval: number }) => {
      const position = await TrackPlayer.getPosition()
      await TrackPlayer.seekTo(position + interval)
    },
  )
  TrackPlayer.addEventListener(
    "remote-jump-backward",
    async ({ interval }: { interval: number }) => {
      const position = await TrackPlayer.getPosition()
      await TrackPlayer.seekTo(position - interval)
    },
  )
}

export default function App() {
  React.useEffect(() => {
    ;(async () => {
      await TrackPlayer.setupPlayer().then(() => {
        // The player is ready to be used
        console.log("player is setup")
        TrackPlayer.updateOptions({
          capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP,
            TrackPlayer.CAPABILITY_JUMP_FORWARD,
            TrackPlayer.CAPABILITY_JUMP_BACKWARD,
          ],
          jumpInterval: 30,
        })
      })
      TrackPlayer.registerPlaybackService(() => trackPlayerService)
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
