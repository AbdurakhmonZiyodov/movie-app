import { LoginResponse } from '@/shared/types';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

type User = LoginResponse['data']; // Assuming LoginResponse.data has user data structure

export default class LocalStore {
  user: User | null = null;

  getUserFromDB = async () => {
    try {
      const userString = await storage.getString('@user');
      if (userString) {
        // Parse the stored JSON string back to a User object
        this.setUser(JSON.parse(userString));
      }
    } catch (error) {
      console.error('Error retrieving user from storage:', error);
      // Handle potential errors gracefully (optional)
    }
  };

  setUser = (user: User) => {
    this.user = user;
    // Stringify the User object before storing
    storage.set('@user', JSON.stringify(user));
  };

  clear = async () => {
    this.user = null;
    await storage.delete('@user');
  };
}
