import React, { createContext, useState, useEffect } from 'react';
import {
  getDocs,
  getDoc,
  query,
  collection,
  where,
  doc,
  documentId,
} from 'firebase/firestore';
import { db } from '../config/Firebase/firebaseConfig';
import { useAuthentication } from '../utils/hooks/useAuthentication';

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
  const { user } = useAuthentication();
  const [categoriesList, setCategoriesList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [creators, setCreators] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function fetchUser() {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setUserDetails({ userId: docSnap.id, ...docSnap.data() });
      fetchSavedRecipes();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  async function fetchCategories() {
    const q = query(collection(db, 'categories'));
    const querySnapshot = await getDocs(q);
    const newCategories = [];
    querySnapshot.forEach((doc) => {
      const category = doc.data();
      newCategories.push(category);
      console.log(category.name);
    });
    setCategoriesList(newCategories);
  }

  async function fetchRecipes() {
    const q = query(collection(db, 'recipes'), where('userId', '==', user.uid));
    const docSnap = await getDocs(q);
    const newRecipes = [];
    docSnap.forEach((doc) => {
      const recipe = doc.data();
      newRecipes.push(recipe);
      console.log(doc.id, ' => ', doc.data());
    });
    setRecipes(newRecipes);
    console.log('user recipes', newRecipes);
  }

  async function fetchSavedRecipes() {
    console.log('user saved', userDetails.saved);
    const q = query(
      collection(db, 'recipes'),
      where('id', 'in', userDetails?.saved)
    );
    const docSnap = await getDocs(q);
    const newRecipes = [];
    docSnap.forEach((doc) => {
      const recipe = doc.data();
      newRecipes.push(recipe);
      console.log(doc.id, ' => ', doc.data());
    });
    setSavedRecipes(newRecipes);
    console.log('saved recipes', newRecipes);
  }

  async function fetchCreators() {
    const q = query(
      collection(db, 'users'),
      where(documentId(), '!=', user.uid)
    );
    const docSnap = await getDocs(q);
    const newUsers = [];
    docSnap.forEach((doc) => {
      const user = doc.data();
      newUsers.push(user);
      console.log(doc.id, ' => ', doc.data());
    });
    setCreators(newUsers);
  }

  async function fetchAllRecipes() {
    const q = query(collection(db, 'recipes'));
    const docSnap = await getDocs(q);
    const newRecipes = [];
    docSnap.forEach((doc) => {
      const recipe = doc.data();
      newRecipes.push(recipe);
      console.log(doc.id, ' => ', doc.data());
    });
    setAllRecipes(newRecipes);
    console.log('user recipes', newRecipes);
  }

  async function fetchAll() {
    setisLoading(true);
    await fetchUser();
    await fetchAllRecipes();
    await fetchRecipes();
    await fetchCategories();
    await fetchCreators();
    setisLoading(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        isLoading,
        recipes,
        categoriesList,
        allRecipes,
        creators,
        savedRecipes,
      }}
    >
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
