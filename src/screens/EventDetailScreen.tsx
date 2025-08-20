import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { Button, Card, Divider } from 'react-native-elements';
import { useEventDetails } from '../api/eventsApi';
import MapPreview from '../components/maps/MapPreview';
import { useFavouritesStore } from '../store/favouritesStore';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useEventDetails(id || '');
  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading event details</Text>;
  if (!data) return <Text>No event found</Text>;

  const venue = data._embedded?.venues?.[0];
  const hasLocation = venue?.location?.latitude && venue?.location?.longitude;

  const openInMaps = () => {
    if (hasLocation) {
      const lat = parseFloat(venue.location.latitude);
      const lng = parseFloat(venue.location.longitude);
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16, margin: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{data.name}</Text>
        
        {data.images && data.images.length > 0 && (
          <Card.Image 
            source={{ uri: data.images[0].url }} 
            style={{ marginBottom: 16, borderRadius: 8, width: '100%', height: 200 }}
          />
        )}

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Date & Time</Text>
          <Text>{data.dates?.start?.localDate}</Text>
          {data.dates?.start?.localTime && (
            <Text>{data.dates.start.localTime}</Text>
          )}
        </View>

        <Divider style={{ marginVertical: 16 }} />

        {venue && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Venue</Text>
            <Text>{venue.name}</Text>
            {venue.address?.line1 && <Text>{venue.address.line1}</Text>}
            {venue.city?.name && <Text>{venue.city.name}</Text>}
          </View>
        )}

        {hasLocation && (
          <MapPreview
            latitude={parseFloat(venue.location.latitude)}
            longitude={parseFloat(venue.location.longitude)}
            title={venue.name}
            description={venue.address?.line1}
          />
        )}

        {hasLocation && (
          <Button
            title="Open in Maps"
            onPress={openInMaps}
            type="outline"
            icon={{ type: 'material', name: 'map' }}
            containerStyle={{ marginVertical: 8 }}
          />
        )}

        <Divider style={{ marginVertical: 16 }} />

        {data.info && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Event Info</Text>
            <Text>{data.info}</Text>
          </View>
        )}

        {data.pleaseNote && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Please Note</Text>
            <Text>{data.pleaseNote}</Text>
          </View>
        )}

        {data.priceRanges && data.priceRanges.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Price Range</Text>
            <Text>
              ${data.priceRanges[0].min} - ${data.priceRanges[0].max} {data.priceRanges[0].currency}
            </Text>
          </View>
        )}

        <Button
          title={isFavourite(data.id) ? 'Remove from Favourites' : 'Add to Favourites'}
          onPress={() =>
            isFavourite(data.id) ? removeFavourite(data.id) : addFavourite(data.id)
          }
          icon={{
            type: 'material',
            name: isFavourite(data.id) ? 'favorite' : 'favorite-border',
          }}
          containerStyle={{ marginVertical: 16 }}
        />
      </View>
    </ScrollView>
  );
}
