import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import foxImage from '../assets/f_normal.png';
import { StatsContext } from '../StatsContext';
import StatsDisplay from './StatsDisplay';

export default function MainScreen({ navigation }) {
    const { stats, setStats } = React.useContext(StatsContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(currentStats => {
                let newStats = { ...currentStats };
                for (let key in newStats) {
                    if (newStats[key] > 0 && key !== 'currency') {
                        newStats[key] = Math.max(newStats[key] - 0.01, 0);
                    }
                }
                return newStats;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const incrementStat = (key) => {
        setStats(currentStats => ({
            ...currentStats,
            [key]: Math.min(1.0, currentStats[key] + 0.1)
        }));
    };

    return (
        <View style={styles.container}>
            <StatsDisplay />
            <Image source={foxImage} style={styles.image} />
            {['hunger', 'happiness', 'health'].map(stat => (
                <PaperButton
                    key={stat}
                    mode='contained'
                    style={styles.button}
                    onPress={() => incrementStat(stat)}
                >
                    Boost {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </PaperButton>
            ))}
            <Button
                title='Visit Store'
                onPress={() => navigation.navigate('Store')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    button: {
        width: 200,
        marginBottom: 10
    }
});
