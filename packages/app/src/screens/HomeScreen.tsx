import { useNavigation } from '@react-navigation/native';
import * as React from "react";
import { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Button,
    useColorScheme,
    StatusBar,
    Alert,
} from "react-native";
import Badges from "../components/Badge/Badge";
import notifee from '@notifee/react-native';
import { useBadgeCountUsingReactQuery, usetBadgeCountUsingAxios } from '../reactQueryApi';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function HomeScreen({ }) {
    //const navigation = useNavigation();
    const [count, setCount] = useState(0);
    const badgeMutation = useMutation(['badgeMutation'], usetBadgeCountUsingAxios);

    const springUrl = 'http://172.28.213.59:8080/api/count';

    const { data } = useBadgeCountUsingReactQuery();
    const isDarkMode = useColorScheme() === 'dark';



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
        onCountUp();
        badgeMutation.mutate({ cnt: count });
        data.count=count;
        notifee.setBadgeCount(count).then(() => console.log('Badge count set'));
    }

    const onCountUp = () => {
        setCount(count + 1);

    };

    const onCountDown = () => {
        setCount(count - 1);
    };

    async function getSpringCount() {
        setCount(data.count);
    }

    return (
        <SafeAreaView style={styles.root}>
            <Badges></Badges>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={{ backgroundColor: isDarkMode ? '#121Bff' : '#FFFFFF', }}>
                <Text>Set badge count</Text>
                <Button title="Display Notification" onPress={() => onDisplayNotification()} />
            </View>
            <View>
                <Button title="Get badge count" onPress={() => getSpringCount()} />
            </View>
            <View>
                <Button title="Set badge count" onPress={() => setBadgeCount()} />
            </View>
            <View>
                <Text>{count}</Text>
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
        padding: 2,
        backgroundColor: 'green',
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
