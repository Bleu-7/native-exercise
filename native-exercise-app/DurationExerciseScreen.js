import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DurationExerciseScreen({ navigation, route }) {
  const { exercise, exercises } = route.params;
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const suggestedExercise = exercises.find(ex => ex.id === exercise.suggestedNext);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <Button
        title={isRunning ? 'Pause' : 'Start'}
        onPress={() => setIsRunning(!isRunning)}
      />
      <Button title="Reset" onPress={() => { setTime(0); setIsRunning(false); }} />

      {suggestedExercise && (
        <Button
          title={`Suggested: ${suggestedExercise.name}`}
          onPress={() => navigation.navigate(suggestedExercise.screen, {
            exercise: suggestedExercise,
            exercises
          })}
        />
      )}

      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  timer: { fontSize: 30, marginBottom: 20, fontFamily: 'monospace' }
});