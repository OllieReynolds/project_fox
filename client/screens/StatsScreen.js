import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { StatsContext } from '../StatsContext';

export default function StatsScreen() {
    const { hunger, happiness, health } = useContext(StatsContext);

    return (
        <View style={styles.container}>
            <Text>Hunger</Text>
            <ProgressBar progress={hunger} color='#FF9999' />
            <Text>Happiness</Text>
            <ProgressBar progress={happiness} color='#99FF99' />
            <Text>Health</Text>
            <ProgressBar progress={health} color='#9999FF' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    }
});
