import { StorageAdapter } from '@zestic/oauth-core';

/**
 * Web storage adapter using localStorage
 * Implements the StorageAdapter interface for browser environments
 */
export class WebStorageAdapter implements StorageAdapter {
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to store item in localStorage:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Failed to retrieve item from localStorage:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item from localStorage:', error);
      throw error;
    }
  }

  async removeItems(keys: string[]): Promise<void> {
    try {
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to remove items from localStorage:', error);
      throw error;
    }
  }
}
