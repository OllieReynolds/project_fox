// Application.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import StoreScreen from './screens/StoreScreen';
import { StatsContext } from './StatsContext';
import StatsDisplay from './screens/StatsDisplay';

const Stack = createStackNavigator();

export default function Application() {
    const [stats, setStats] = React.useState({
        hunger: 1.0,
        happiness: 1.0,
        health: 1.0,
        currency: 100
    });

    return (
        <StatsContext.Provider value={{ stats, setStats }}>
            <View style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen 
                            name="Main" 
                            component={MainScreen}
                            options={{ header: () => <StatsDisplay /> }}  // add this line
                        />
                        <Stack.Screen 
                            name="Store" 
                            component={StoreScreen}
                            options={{ header: () => <StatsDisplay /> }}  // add this line
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </StatsContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
