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

    // const getBalance = async () => {
    //     if (!ethereum.selectedAddress) {
    //         return;
    //     }
    //     const bal = await provider.getBalance(ethereum.selectedAddress);
    //     setBalance(ethers.utils.formatEther(bal));
    // };

    // useEffect(() => {
    //     ethereum.on('chainChanged', chain => {
    //         console.log(chain);
    //         setChain(chain);
    //     });
    //     ethereum.on('accountsChanged', accounts => {
    //         console.log(accounts);
    //         setAccount(accounts?.[0]);
    //
    //         getBalance();
    //     });
    // }, []);

    const connect = async () => {
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

    // const exampleRequest = async () => {
    //     try {
    //         const result = await ethereum.request({
    //             method: 'wallet_addEthereumChain',
    //             params: [
    //                 {
    //                     chainId: '0x89',
    //                     chainName: 'Polygon',
    //                     blockExplorerUrls: ['https://polygonscan.com'],
    //                     nativeCurrency: {symbol: 'MATIC', decimals: 18},
    //                     rpcUrls: ['https://polygon-rpc.com/'],
    //                 },
    //             ],
    //         });
    //         console.log('RESULT', result);
    //         setResponse(result);
    //     } catch (e) {
    //         console.log('ERROR', e);
    //     }
    // };

    // const sign = async () => {
    //     const msgParams = JSON.stringify({
    //         domain: {
    //             // Defining the chain aka Rinkeby testnet or Ethereum Main Net
    //             chainId: parseInt(ethereum.chainId, 16),
    //             // Give a user friendly name to the specific contract you are signing for.
    //             name: 'Ether Mail',
    //             // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
    //             verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    //             // Just let's you know the latest version. Definitely make sure the field name is correct.
    //             version: '1',
    //         },
    //
    //         // Defining the message signing data content.
    //         message: {
    //             /*
    //              - Anything you want. Just a JSON Blob that encodes the data you want to send
    //              - No required fields
    //              - This is DApp Specific
    //              - Be as explicit as possible when building out the message schema.
    //             */
    //             contents: 'Hello, Bob!',
    //             attachedMoneyInEth: 4.2,
    //             from: {
    //                 name: 'Cow',
    //                 wallets: [
    //                     '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    //                     '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
    //                 ],
    //             },
    //             to: [
    //                 {
    //                     name: 'Bob',
    //                     wallets: [
    //                         '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    //                         '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
    //                         '0xB0B0b0b0b0b0B000000000000000000000000000',
    //                     ],
    //                 },
    //             ],
    //         },
    //         // Refers to the keys of the *types* object below.
    //         primaryType: 'Mail',
    //         types: {
    //             // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
    //             EIP712Domain: [
    //                 {name: 'name', type: 'string'},
    //                 {name: 'version', type: 'string'},
    //                 {name: 'chainId', type: 'uint256'},
    //                 {name: 'verifyingContract', type: 'address'},
    //             ],
    //             // Not an EIP712Domain definition
    //             Group: [
    //                 {name: 'name', type: 'string'},
    //                 {name: 'members', type: 'Person[]'},
    //             ],
    //             // Refer to PrimaryType
    //             Mail: [
    //                 {name: 'from', type: 'Person'},
    //                 {name: 'to', type: 'Person[]'},
    //                 {name: 'contents', type: 'string'},
    //             ],
    //             // Not an EIP712Domain definition
    //             Person: [
    //                 {name: 'name', type: 'string'},
    //                 {name: 'wallets', type: 'address[]'},
    //             ],
    //         },
    //     });
    //
    //     var from = ethereum.selectedAddress;
    //
    //     var params = [from, msgParams];
    //     var method = 'eth_signTypedData_v4';
    //
    //     const resp = await ethereum.request({method, params});
    //     setResponse(resp);
    // };

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
                    <Button title={account ? 'Connected' : 'Connect'} onPress={connect} />
                    {/*<Button title="Sign" onPress={sign} />*/}
                    <Button title="Send transaction" onPress={sendTransaction} />
                    {/*<Button title="Add chain" onPress={exampleRequest} />*/}

                    {/*<Text>{chain && `Connected chain: ${chain}`}</Text>*/}
                    <Text>
                        {' '}
                        {account && `Connected account: ${account}\n\n`}
                        {/*{account && balance && `Balance: ${balance} ETH`}*/}
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
