import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RepetitionExerciseScreen({ navigation, route }) {
  const { exercise, exercises } = route.params;
  const [count, setCount] = useState(0);
  const suggestedExercise = exercises.find(ex => ex.id === exercise.suggestedNext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.counter}>Count: {count}</Text>

      <Button title="Add Rep" onPress={() => setCount(count + 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />

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
  counter: { fontSize: 20, marginBottom: 20 }
});