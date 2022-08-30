import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import { UserProvider } from '../context/user';
export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? (
    <UserProvider>
      <UserStack />
    </UserProvider>
  ) : (
    <AuthStack />
  );
}
