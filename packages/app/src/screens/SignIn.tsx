import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignIn({ route }) {
    const navigation = useNavigation();
    const { id } = route.params;
    console.log('login success : ', { id });
  
    return (
      <View>
        <Text>{id}</Text>
        <Button title={"back"}></Button>
      </View>
    );

}
