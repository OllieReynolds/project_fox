import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import StoreScreen from './screens/StoreScreen';
import { StatsContext } from './StatsContext';

const Stack = createStackNavigator();

export default function App() {
    const [stats, setStats] = React.useState({
        hunger: 1.0,
        happiness: 1.0,
        health: 1.0,
        currency: 100
    });

    return (
        <StatsContext.Provider value={{ stats, setStats }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={MainScreen} />
                    <Stack.Screen name="Store" component={StoreScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </StatsContext.Provider>
    );
}
