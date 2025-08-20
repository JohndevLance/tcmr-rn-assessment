import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EventsService, VenuesService } from '../services';

// React Query hooks for events
export function useSearchEvents(keyword: string, city: string, enabled = true) {
  return useQuery({
    queryKey: ['events', 'search', keyword, city],
    queryFn: () => EventsService.searchEvents(keyword, city),
    enabled: enabled && !!keyword && !!city,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useEventDetails(id: string) {
  return useQuery({
    queryKey: ['events', 'detail', id],
    queryFn: () => EventsService.getEventById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useEventsByLocation(
  latitude: number,
  longitude: number,
  radius?: string,
  unit?: 'miles' | 'km',
  enabled = true
) {
  return useQuery({
    queryKey: ['events', 'location', latitude, longitude, radius, unit],
    queryFn: () => EventsService.searchEventsByLocation(latitude, longitude, radius, unit),
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useEventsByCategory(classificationName: string, city?: string) {
  return useQuery({
    queryKey: ['events', 'category', classificationName, city],
    queryFn: () => EventsService.getEventsByCategory(classificationName, city),
    enabled: !!classificationName,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}

// React Query hooks for venues
export function useSearchVenues(keyword: string, city?: string) {
  return useQuery({
    queryKey: ['venues', 'search', keyword, city],
    queryFn: () => VenuesService.searchVenues(keyword, city),
    enabled: !!keyword,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useVenueDetails(id: string) {
  return useQuery({
    queryKey: ['venues', 'detail', id],
    queryFn: () => VenuesService.getVenueById(id),
    enabled: !!id,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useVenuesByLocation(
  latitude: number,
  longitude: number,
  radius?: string,
  unit?: 'miles' | 'km'
) {
  return useQuery({
    queryKey: ['venues', 'location', latitude, longitude, radius, unit],
    queryFn: () => VenuesService.getVenuesByLocation(latitude, longitude, radius, unit),
    enabled: !!latitude && !!longitude,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

// Mutation hooks for cache invalidation
export function useRefreshEvents() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Invalidate all event queries
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
