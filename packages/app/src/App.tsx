import * as React from "react";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  useColorScheme,
  StatusBar,
} from "react-native";
import { AsyncStorageExample } from "./AsyncStorageExample";
import { subplatform } from "./config";
import LogoSrc from "./logo.png";
import Badges from "./components/Badge/Badge";
import notifee from '@notifee/react-native';


export function App(): JSX.Element {
 const isDarkMode = useColorScheme() === 'dark';

 const backgroundStyle = {
   backgroundColor: isDarkMode ? '#121B24' : '#FFFFFF',
 };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    try {
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Display a notification using notifee',
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function setBadgeCount() {
    // Set badge count
    onCountUp()
    notifee.setBadgeCount(count).then(() => console.log('Badge count set'))
  }

  //////////////////////////////////////////
  const [count, setCount] = useState(0);

  const onCountUp = () => {
    setCount(count + 1);
  };
  
  const onCountDown = () => {
    setCount(count - 1);
  };
  ///////////////////////////////////////// 

  const platformValue = subplatform
    ? `${Platform.OS} (${subplatform})`
    : Platform.OS;
  return (

    <SafeAreaView style={styles.root}>
      {/* On React Native for Web builds coming from CRA, TypeScript 
          complains about the image type, so we cast it as a workaround  */}
      <Image style={styles.logo} source={LogoSrc as ImageSourcePropType} />
      <Text style={styles.text}>Hello from React Native!</Text>
      <View style={styles.platformRow}>
        <Text style={styles.text}>Platform: </Text>
        <View style={styles.platformBackground}>
          <Text style={styles.platformValue}>{platformValue}</Text>
        </View>
      </View>
      <AsyncStorageExample />
      <Badges></Badges>

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ backgroundColor: isDarkMode ? '#121Bff' : '#FFFFFF',}}>
        <Text style={styles.highlight}>Set badge count</Text>
        <Button title="Display Notification" onPress={() => onDisplayNotification()} />
      </View>
      <View>
        <Button title="Set badge count" onPress={() => setBadgeCount()} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  root: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
  },
  platformRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  platformValue: {
    fontSize: 28,
    fontWeight: "500",
  },
  platformBackground: {
    backgroundColor: "#ececec",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d4d4d4",
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  highlight: {
    padding:2,
    backgroundColor: 'green',
  },
});
