import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { StatsContext } from '../StatsContext';

export default function StatsDisplay() {
    const { stats } = useContext(StatsContext);

    return (
        <View style={styles.container}>
            {Object.keys(stats).map(stat => {
                if (stat !== 'currency') {
                    return (
                        <View key={stat} >
                            <Text style={styles.statText}>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</Text>
                            <ProgressBar progress={stats[stat]} color='#FF9999' width={'50%'} />
                        </View>
                    );
                } else {
                    return (
                        <Text key={stat} style={styles.statText}>{stat.charAt(0).toUpperCase() + stat.slice(1)}: {Math.round(stats[stat])} yips</Text>
                    );
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    statText: {
        fontSize: 18,
        marginRight: 10
    }
});
