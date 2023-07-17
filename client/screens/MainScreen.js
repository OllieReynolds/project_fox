import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import foxImage from '../assets/f_normal.png';
import { StatsContext } from '../StatsContext';

export default function MainScreen({ navigation }) {
    const { hunger, setHunger, happiness, setHappiness, health, setHealth } = React.useContext(StatsContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setHunger(hunger => Math.max(hunger - 0.07, 0));
            setHappiness(happiness => Math.max(happiness - 0.1, 0));
            setHealth(health => Math.max(health - 0.025, 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={foxImage} style={styles.image} />
            <PaperButton
                mode='contained'
                style={styles.button}
                onPress={() => setHunger(1.0)}
            >
                Feed Fox
            </PaperButton>
            <PaperButton
                mode='contained'
                style={styles.button}
                onPress={() => setHappiness(1.0)}
            >
                Play With Fox
            </PaperButton>
            <PaperButton
                mode='contained'
                style={styles.button}
                onPress={() => setHealth(1.0)}
            >
                Boost Fox Health
            </PaperButton>
            <Button
                title='See Stats'
                onPress={() => navigation.navigate('Stats')}
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
