// Legacy endpoints file - now using services layer
// This file is kept for reference but services should be used instead

export const ENDPOINTS = {
  // Ticketmaster Discovery API endpoints
  events: '/events.json',
  eventDetails: (id: string) => `/events/${id}.json`,
  venues: '/venues.json',
  venueDetails: (id: string) => `/venues/${id}.json`,
  classifications: '/classifications.json',
  
  // Search endpoints with parameters
  searchEvents: (keyword: string, city: string) =>
    `/events.json?keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(city)}`,
  searchVenues: (keyword: string, city?: string) => {
    const params = new URLSearchParams({ keyword });
    if (city) params.append('city', city);
    return `/venues.json?${params.toString()}`;
  },
  
  // Location-based endpoints
  eventsByLocation: (lat: number, lng: number, radius?: string) => {
    const params = new URLSearchParams({ latlong: `${lat},${lng}` });
    if (radius) params.append('radius', radius);
    return `/events.json?${params.toString()}`;
  },
  
  // Note: Use services layer (EventsService, VenuesService) instead of these endpoints
};
