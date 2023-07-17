import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import StatsScreen from './screens/StatsScreen';
import { StatsContext } from './StatsContext';

const Stack = createStackNavigator();

export default function App() {
    const [hunger, setHunger] = React.useState(1.0);
    const [happiness, setHappiness] = React.useState(1.0);
    const [health, setHealth] = React.useState(1.0);

    return (
        <StatsContext.Provider value={{ hunger, setHunger, happiness, setHappiness, health, setHealth }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={MainScreen} />
                    <Stack.Screen name="Stats" component={StatsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </StatsContext.Provider>
    );
}
