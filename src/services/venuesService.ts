import apiClient from './apiClient';

export interface Venue {
  id: string;
  name: string;
  type: string;
  url?: string;
  address: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  city: {
    name: string;
  };
  state?: {
    name: string;
    stateCode: string;
  };
  country: {
    name: string;
    countryCode: string;
  };
  postalCode?: string;
  location?: {
    longitude: string;
    latitude: string;
  };
  images?: {
    url: string;
    width: number;
    height: number;
  }[];
}

export interface VenuesResponse {
  _embedded?: {
    venues: Venue[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export class VenuesService {
  static async searchVenues(keyword: string, city?: string): Promise<VenuesResponse> {
    const params: any = {
      keyword: keyword.trim(),
      sort: 'name,asc',
    };
    
    if (city) {
      params.city = city.trim();
    }

    const response = await apiClient.get('/venues.json', { params });
    return response.data;
  }

  static async getVenueById(id: string): Promise<Venue> {
    const response = await apiClient.get(`/venues/${id}.json`);
    return response.data;
  }

  static async getVenuesByLocation(
    latitude: number,
    longitude: number,
    radius = '50',
    unit: 'miles' | 'km' = 'miles'
  ): Promise<VenuesResponse> {
    const response = await apiClient.get('/venues.json', {
      params: {
        latlong: `${latitude},${longitude}`,
        radius,
        unit,
        sort: 'name,asc',
      },
    });
    return response.data;
  }
}
