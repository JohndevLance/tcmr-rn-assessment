import React from 'react';
import { Dimensions, Linking, Platform, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}

export default function MapPreview({ latitude, longitude, title, description }: MapPreviewProps) {
  const { width } = Dimensions.get('window');

  const openInMaps = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = title || 'Event Location';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  // Use fallback UI since maps module has issues in current setup
  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Event Location
      </Text>
      <View style={{
        width: width - 32,
        height: 200,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dee2e6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: 4 }}>📍</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
            {title || 'Event Location'}
          </Text>
          {description && (
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 16, textAlign: 'center' }}>
              {description}
            </Text>
          )}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              title="Open in Maps"
              onPress={openInMaps}
              buttonStyle={{ 
                backgroundColor: '#007AFF', 
                borderRadius: 6,
                paddingHorizontal: 16,
                paddingVertical: 8
              }}
              titleStyle={{ fontSize: 14 }}
            />
            <Button
              title="Google Maps"
              onPress={openInGoogleMaps}
              buttonStyle={{ 
                backgroundColor: '#34a853', 
                borderRadius: 6,
                paddingHorizontal: 16,
                paddingVertical: 8
              }}
              titleStyle={{ fontSize: 14 }}
            />
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 12, color: '#666', marginTop: 4, textAlign: 'center' }}>
        Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </Text>
    </View>
  );
}
