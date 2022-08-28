import React, { useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../../config/Firebase/firebaseConfig';

export function useAuthentication() {
  const auth = getAuth();
  const User = auth.currentUser;
  const [user, setUser] = useState(User);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
      setIsLoading(false);
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
    isLoading,
  };
}
