import * as React from "react";
import {useEffect, useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Button,
    Alert, TextInput, Linking,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useMutation} from "@tanstack/react-query";
import {checkMemberAxios, checkMemberInfo} from "../reactQueryApi";
import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';
import {ethers} from 'ethers';

import {Colors} from "react-native/Libraries/NewAppScreen";
const MMSDK = new MetaMaskSDK({
    openDeeplink: (link) => {
        Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
    },
    timer: BackgroundTimer, // To keep the app alive once it goes to background
    dappMetadata: {
        name: 'My App', // The name of your application
        url: 'https://myapp.com', // The url of your website
    },
});

const ethereum = MMSDK.getProvider();
//const provider = new ethers.providers.Web3Provider(ethereum);

export default function Index() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    //const { mutate, isLoading, isError, error, isSuccess }
    const loginMutation = useMutation(["loginMutation"], checkMemberAxios);

    const [account, setAccount] = useState();
    //const [balance, setBalance] = useState();
    const [chain, setChain] = useState();
    const [response, setResponse] = useState();

    const signIn = () => {
        const result = checkMemberInfo(id, password);

        console.log('signInId in signIn : ', signInId);

        if (result._j === true) {
            console.log('Not empty id & password');
        }

        loginMutation.mutate(
            {id, password },
            {
                onSuccess: (data, variables, context) => {
                    console.log('variables ', variables);
                    Alert.alert('Login Success', 'OK', [
                        {
                            onPress: () => navigation.navigate('CountNoti'),
                        },
                    ]);
                },
                onError: (data, variables, context) => {
                    Alert.alert('Login Failed');
                },
            },
        );
    };

    const mmConnect = async () => {
        try {
            const result = await ethereum.request({method: 'eth_requestAccounts'});
            console.log('try');
            console.log('RESULT', result?.[0]);
            setAccount(result?.[0]);
            //getBalance();
        } catch (e) {
            console.log('catch ERROR', e);
        }
    };

    const sendTransaction = async () => {
        const to = '0x0000000000000000000000000000000000000000';
        const transactionParameters = {
            to, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: '0x000000000001', // Only required to send ether to the recipient from the initiating external account.
        };

        try {
            // txHash is a hex string
            // As with any RPC call, it may throw an error
            const txHash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log(txHash)
            setResponse(txHash);
        } catch (e) {
            console.log(e);
        }
    };

    return (
         <SafeAreaView style={styles.root}>
                <View>
                    <TextInput
                        placeholder={'id'}
                        keyboardType="email-address"
                        secureTextEntry={false}
                        onChangeText={ (text) => setId(text)}></TextInput>
                    <TextInput
                        placeholder={'password'}
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={ (text) => setPassword(text)}></TextInput>
                </View>
                <View>
                    <Button title='SignIn' onPress={signIn}></Button>
                    <Button title={account ? 'MetaMask Connected' : 'MetaMask Connect'} onPress={mmConnect} />
                    <Button title="Send transaction" onPress={sendTransaction} />
                    <Text>
                        {' '}
                        {account && `Connected account: ${account}\n\n`}
                    </Text>
                    <Text>
                        {' '}
                        {response && `Last request response: ${response}`}
                    </Text>
                </View>
            </SafeAreaView>

    );
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
