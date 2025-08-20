import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { useSearchEvents } from '../api/eventsApi';
import { useFavouritesStore } from '../store/favouritesStore';
import { SearchInput, TextInput } from '../components/inputs';

interface SearchForm {
  keyword: string;
  city: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchParams, setSearchParams] = useState({ keyword: '', city: '' });
  const { data, isLoading, error } = useSearchEvents(shouldSearch ? searchParams.keyword : '', shouldSearch ? searchParams.city : '');
  const { addFavourite, removeFavourite, isFavourite } = useFavouritesStore();

  const { control, handleSubmit } = useForm<SearchForm>({
    defaultValues: { keyword: '', city: '' },
  });

  const onSubmit = (data: SearchForm) => {
    if (data.keyword && data.city) {
      setSearchParams(data);
      setShouldSearch(true);
    }
  };

  console.log('data', data)

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SearchInput
        control={control}
        name="keyword"
        label="Keyword"
        placeholder="Search events"
        rules={{ required: 'Keyword is required' }}
      />
      <TextInput
        control={control}
        name="city"
        label="City"
        placeholder="Enter city"
        leftIcon={{ type: 'material', name: 'location-city' }}
        rules={{ required: 'City is required' }}
      />
      <Button title="Search" onPress={handleSubmit(onSubmit)} containerStyle={{ marginVertical: 12 }} />
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
