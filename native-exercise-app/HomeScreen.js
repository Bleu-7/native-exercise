import React from 'react';
import { View, FlatList, Button, Text } from 'react-native';

const exercises = [
  { id: '1', name: 'Push Ups', type: 'repetition', screen: 'RepetitionExercise', suggestedNext: '2' },
  { id: '2', name: 'Sit Ups', type: 'repetition', screen: 'RepetitionExercise', suggestedNext: '3' },
  { id: '3', name: 'Plank', type: 'duration', screen: 'DurationExercise', suggestedNext: '1' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Choose Exercise:</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate(item.screen, {
              exercise: item,
              exercises: exercises
            })}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}