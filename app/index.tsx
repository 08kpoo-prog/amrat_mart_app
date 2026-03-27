import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function init() {
      await SplashScreen.preventAutoHideAsync(); // optional
      router.replace("/auth/signup");
      await SplashScreen.hideAsync(); // hide splash
    }
    init();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}