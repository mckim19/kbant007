import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({}) {
    const navigation = useNavigation();
    const { id } = route.params;
    console.log('login success : ', { id });
  
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
        <MyInputFloatingActionButton></MyInputFloatingActionButton>
      </View>
    );

}