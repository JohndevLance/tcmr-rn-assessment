import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useEventDetails } from '../api/eventsApi';
import { useFavouritesStore } from '../store/favouritesStore';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useEventDetails(id || '');
  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading event details</Text>;
  if (!data) return <Text>No event found</Text>;

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.name}</Text>
      <Text>{data.dates?.start?.localDate}</Text>
      <Text>{data._embedded?.venues?.[0]?.name}</Text>
      <Text>{data.info}</Text>
      <Button
        title={isFavourite(data.id) ? 'Remove from Favourites' : 'Add to Favourites'}
        onPress={() =>
          isFavourite(data.id) ? removeFavourite(data.id) : addFavourite(data.id)
        }
        containerStyle={{ marginVertical: 16 }}
      />
    </ScrollView>
  );
}
