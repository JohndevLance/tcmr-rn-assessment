import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button, Icon, Input, ListItem } from 'react-native-elements';
import { useSearchEvents } from '../api/eventsApi';
import { useFavouritesStore } from '../store/favouritesStore';

export default function HomeScreen() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);
  const { data, isLoading, error } = useSearchEvents(shouldSearch ? keyword : '', shouldSearch ? city : '');
  const { addFavourite, removeFavourite, isFavourite } = useFavouritesStore();

  const handleSearch = () => {
    if (keyword && city) {
      setShouldSearch(true);
    }
  };

  console.log('data', data)

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Input
        label="Keyword"
        placeholder="Search events"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Input
        label="City"
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={handleSearch} containerStyle={{ marginVertical: 12 }} />
      {isLoading && <ActivityIndicator />}
      {error && <Text>Error loading events</Text>}
      <FlatList
        data={data?._embedded?.events || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem 
            bottomDivider
            onPress={() => router.push(`/event-detail?id=${item.id}`)}
          >
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.dates?.start?.localDate}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon
              name={isFavourite(item.id) ? 'star' : 'star-outline'}
              type="material-community"
              onPress={() =>
                isFavourite(item.id) ? removeFavourite(item.id) : addFavourite(item.id)
              }
            />
            <ListItem.Chevron />
          </ListItem>
        )}
      />
    </View>
  );
}
