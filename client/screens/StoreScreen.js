import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { StatsContext } from '../StatsContext';
import StatsDisplay from './StatsDisplay';

const items = require('../items.json');

export default function StoreScreen() {
    const { stats, setStats } = useContext(StatsContext);

    const buyItem = (item) => {
        if (stats.currency >= item.price) {
            setStats(currentStats => ({
                ...currentStats,
                currency: currentStats.currency - item.price,
                ...Object.keys(item.effect).reduce((res, key) => ({
                    ...res,
                    [key]: Math.min(1.0, currentStats[key] + item.effect[key])
                }), {}),
            }));
        } else {
            alert('Not enough currency!');
        }
    };

    return (
        <View style={styles.container}>
            <StatsDisplay />
            <View style={styles.itemsContainer}>
                {items.map(item => (
                    <View key={item.id} style={styles.item}>
                        <Text>{item.name} - {item.price} yips</Text>
                        <Button title="Buy" onPress={() => buyItem(item)} />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    itemsContainer: {
        marginTop: 150
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cccccc'
    }
});
