const ETSY_API_BASE_URL = 'https://openapi.etsy.com/v3/application';

export class EtsyApiService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_ETSY_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Etsy API key not found in environment variables');
    }
  }

  /**
   * Make a simple ping request to test the API connection
   */
  async ping(): Promise<any> {
    try {
      const response = await fetch(`${ETSY_API_BASE_URL}/openapi-ping`, {
        method: 'GET',
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Etsy API ping failed:', error);
      throw error;
    }
  }

  /**
   * Get public shop information (doesn't require OAuth)
   */
  async getShopById(shopId: string): Promise<any> {
    try {
      const response = await fetch(`${ETSY_API_BASE_URL}/shops/${shopId}`, {
        method: 'GET',
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch shop:', error);
      throw error;
    }
  }

  /**
   * Search for shops by name (public endpoint)
   */
  async findShops(shopName: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        shop_name: shopName,
        limit: '10',
      });

      const response = await fetch(`${ETSY_API_BASE_URL}/shops?${params}`, {
        method: 'GET',
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to search shops:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const etsyApi = new EtsyApiService();