import apiClient from './apiClient';

export interface Event {
  id: string;
  name: string;
  url: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues?: {
      name: string;
      city: {
        name: string;
      };
      address: {
        line1: string;
      };
    }[];
  };
  info?: string;
  pleaseNote?: string;
  priceRanges?: {
    min: number;
    max: number;
    currency: string;
  }[];
}

export interface EventsResponse {
  _embedded?: {
    events: Event[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export class EventsService {
  static async searchEvents(keyword: string, city: string, page = 0, size = 20): Promise<EventsResponse> {
    const response = await apiClient.get('/events.json', {
      params: {
        keyword: keyword.trim(),
        city: city.trim(),
        page,
        size,
        sort: 'date,asc',
      },
    });
    console.log('API Response:', response.status, response.config.url);
    return response.data;
  }

  static async getEventById(id: string): Promise<Event> {
    const response = await apiClient.get(`/events/${id}.json`);
    return response.data;
  }

  static async searchEventsByLocation(
    latitude: number,
    longitude: number,
    radius = '50',
    unit: 'miles' | 'km' = 'miles'
  ): Promise<EventsResponse> {
    const response = await apiClient.get('/events.json', {
      params: {
        latlong: `${latitude},${longitude}`,
        radius,
        unit,
        sort: 'date,asc',
      },
    });
    return response.data;
  }

  static async getEventsByCategory(
    classificationName: string,
    city?: string
  ): Promise<EventsResponse> {
    const params: any = {
      classificationName,
      sort: 'date,asc',
    };
    
    if (city) {
      params.city = city.trim();
    }

    const response = await apiClient.get('/events.json', { params });
    return response.data;
  }
}
