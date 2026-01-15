import * as Notifications from "expo-notifications";

import { RootSiblingParent } from "react-native-root-siblings";
import { Stack } from "expo-router";
import "../global.css";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RootSiblingParent>
  );
}
