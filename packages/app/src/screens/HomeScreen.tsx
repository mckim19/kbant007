import * as React from "react";
import {useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Button,
    useColorScheme,
    StatusBar
} from "react-native";
import Badges from "../components/Badge/Badge";
import notifee from '@notifee/react-native';
import {useBadgeCountUsingReactQuery, usetBadgeCountUsingAxios} from '../reactQueryApi';
import {useMutation} from '@tanstack/react-query';

export default function HomeScreen({}) {
    //const navigation = useNavigation();
    const [count, setCount] = useState(0);
    const badgeMutation = useMutation(['badgeMutation'], usetBadgeCountUsingAxios);

    const {data} = useBadgeCountUsingReactQuery();
    const isDarkMode = useColorScheme() === 'dark';

    async function onDisplayNotification() {

        // Request permissions (required for iOS)
        await notifee.requestPermission();

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel(
            {id: 'default', name: 'Default Channel'}
        );

        // Display a notification
        try {
            await notifee.displayNotification({
                title: 'Notification Title',
                body: 'Display a notification using notifee',
                android: {
                    channelId,
                    // smallIcon: 'name-of-a-small-icon',  optional, defaults to 'ic_launcher'.
                    // pressAction is needed if you want the notification to open the app when
                    // pressed
                    pressAction: {
                        id: 'default'
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async function setBadgeCount() {
        // Set badge count
        onCountUp();
        badgeMutation.mutate({cnt: count});
        data.count = count;
        notifee
            .setBadgeCount(count)
            .then(() => console.log('Badge count set'));
    }

    const onCountUp = () => {
        setCount(count + 1);

    };

    async function getSpringCount() {
        setCount(data);
    }

    if (data){
        console.log("data logic")
        return (
            <SafeAreaView style={styles.root}>
                <Badges></Badges>
                <StatusBar
                    barStyle={isDarkMode
                        ? 'light-content'
                        : 'dark-content'}/>
                <View
                    style={{
                        backgroundColor: isDarkMode
                            ? '#121Bff'
                            : '#FFFFFF'
                    }}>
                    <Text style={styles.text}>Set badge count</Text>
                    <Button title={'SignIn'} onpress={signIn}></Button>
                    <Button title="Display Notification" onPress={() => onDisplayNotification()}/>
                    <Button title="Get badge count" onPress={() => getSpringCount()}/>
                    <Button title="Set badge count" onPress={() => setBadgeCount()}/>
                </View>
                <View>
                    <Text style={styles.text}>{data}</Text>
                </View>
            </SafeAreaView>
    
        );
    } else {
        console.log("else---")
        return (
            <SafeAreaView style={styles.root}>
                <Badges></Badges>
                <StatusBar
                    barStyle={isDarkMode
                        ? 'light-content'
                        : 'dark-content'}/>
                <View
                    style={{
                        backgroundColor: isDarkMode
                            ? '#121Bff'
                            : '#FFFFFF'
                    }}>
                    <Text style={styles.text}>Set badge count</Text>
                    <Button title="Display Notification" onPress={() => onDisplayNotification()}/>
                </View>
                <View>
                    <Button title="Get badge count" onPress={() => getSpringCount()}/>
                </View>
                <View>
                    <Button title="Set badge count" onPress={() => setBadgeCount()}/>
                </View>
                <View>
                    <Text style={styles.text}>{count}</Text>
                </View>
            </SafeAreaView>
    
        );
    }
    

}

const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: "white"
    },
    badge: {
        alignItems: "center"
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20
    },
    text: {
        fontSize: 28,
        alignItems: "center",
        textAlign: "center",
        fontWeight: "600"
    },
    platformRow: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    platformValue: {
        fontSize: 28,
        fontWeight: "500"
    },
    platformBackground: {
        backgroundColor: "#ececec",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#d4d4d4",
        paddingHorizontal: 6,
        borderRadius: 6,
        alignItems: "center"
    },
    highlight: {
        padding: 2,
        backgroundColor: 'green'
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
