'use client';

import { MoniteSDK } from '@monite/sdk-api';
import { MONITE_CONFIG } from './config/monite';
import { getAccessToken } from './api/auth';
import { validateConfig } from './api/validation';

// Validate configuration before creating SDK instance
validateConfig();

class MoniteService {
  private static instance: MoniteService;
  private accessToken: string | null = null;
  private entityId: string | null = null;

  private constructor() {
    // Log environment variables on initialization
    console.log('Monite Environment Variables:');
    console.log('API URL:', process.env.NEXT_PUBLIC_MONITE_API_URL);
    console.log('Client ID exists:', !!process.env.NEXT_PUBLIC_MONITE_CLIENT_ID);
    console.log('Client Secret exists:', !!process.env.NEXT_PUBLIC_MONITE_CLIENT_SECRET);
    console.log('Audience exists:', !!process.env.NEXT_PUBLIC_MONITE_AUDIENCE);
  }

  static getInstance(): MoniteService {
    if (!MoniteService.instance) {
      MoniteService.instance = new MoniteService();
    }
    return MoniteService.instance;
  }

  async initialize() {
    try {
      console.log('Initializing Monite service...');
      
      // Step 1: Get access token
      const token = await this.getAccessToken();
      if (!token) throw new Error('Failed to get access token');
      console.log('Got access token');

      // Step 2: Get or create entity
      const entityId = await this.getOrCreateEntity(token);
      if (!entityId) throw new Error('Failed to get or create entity');
      console.log('Got entity ID:', entityId);

      this.accessToken = token;
      this.entityId = entityId;

      return {
        token,
        entityId,
      };
    } catch (error) {
      console.error('Failed to initialize Monite:', error);
      throw error;
    }
  }

  private async getAccessToken(): Promise<string | null> {
    try {
      console.log('Getting access token...');
      const tokenData = {
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_MONITE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_MONITE_CLIENT_SECRET,
        audience: process.env.NEXT_PUBLIC_MONITE_AUDIENCE,
      };

      console.log('Token request data:', JSON.stringify(tokenData, null, 2));

      const response = await fetch('https://api.sandbox.monite.com/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenData),
      });

      const responseData = await response.json();
      console.log('Token response:', JSON.stringify(responseData, null, 2));

      if (!response.ok) {
        console.error('Token response error:', JSON.stringify(responseData, null, 2));
        throw new Error(responseData.message || responseData.detail || JSON.stringify(responseData));
      }

      console.log('Got access token response');
      return responseData.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  private async getOrCreateEntity(token: string): Promise<string | null> {
    try {
      console.log('Getting or creating entity...');
      // First, try to get existing entity
      const existingEntity = await this.getEntity(token);
      if (existingEntity) {
        console.log('Found existing entity:', existingEntity);
        return existingEntity;
      }

      // If no entity exists, create one
      console.log('No entity found, creating new one...');
      return await this.createEntity(token);
    } catch (error) {
      console.error('Error getting/creating entity:', error);
      return null;
    }
  }

  private async getEntity(token: string): Promise<string | null> {
    try {
      console.log('Getting entity...');
      const response = await fetch('https://api.sandbox.monite.com/v1/entities', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log('Entities response:', JSON.stringify(responseData, null, 2));

      if (!response.ok) {
        console.error('Entity response error:', JSON.stringify(responseData, null, 2));
        throw new Error(responseData.message || responseData.detail || JSON.stringify(responseData));
      }
      
      if (responseData.data && responseData.data.length > 0) {
        return responseData.data[0].id;
      }

      return null;
    } catch (error) {
      console.error('Error getting entity:', error);
      return null;
    }
  }

  private async createEntity(token: string): Promise<string | null> {
    try {
      console.log('Creating entity...');
      const entityData = {
        address: {
          country: 'US',
          city: 'San Francisco',
          line1: '123 Main St',
          postal_code: '94105',
          state: 'CA'
        },
        created_at: new Date().toISOString(),
        entity_type: 'organization',
        organization: {
          legal_name: 'WonderPay LLC',
          tax_id: '123456789',
          type: 'corporation'
        },
        currency: 'USD',
        locale: 'en',
        phone: '+14155550123',
        timezone: 'America/Los_Angeles',
        email: 'mitch@thewonderlandstudio.co'
      };

      console.log('Creating entity with data:', JSON.stringify(entityData, null, 2));

      const response = await fetch('https://api.sandbox.monite.com/v1/entities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entityData),
      });

      const responseData = await response.json();
      console.log('Entity creation response:', JSON.stringify(responseData, null, 2));

      if (!response.ok) {
        console.error('Entity creation error:', JSON.stringify(responseData, null, 2));
        throw new Error(responseData.message || responseData.detail || JSON.stringify(responseData));
      }

      return responseData.id;
    } catch (error) {
      console.error('Error creating entity:', error);
      return null;
    }
  }

  getSDK(): MoniteSDK | null {
    if (!this.accessToken || !this.entityId) {
      console.error('Cannot create SDK: missing token or entity ID');
      return null;
    }

    console.log('Creating Monite SDK with entity ID:', this.entityId);
    return new MoniteSDK({
      apiUrl: 'https://api.sandbox.monite.com/v1',
      entityId: this.entityId,
      fetchToken: async () => {
        console.log('Refreshing token...');
        const token = await this.getAccessToken();
        if (!token) throw new Error('Failed to refresh token');
        this.accessToken = token;
        return token;
      },
    });
  }
}

export const moniteService = MoniteService.getInstance();