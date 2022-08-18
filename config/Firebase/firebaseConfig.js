import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA7CnX8dvVXQn5_eMBB1Q7xe-ufRHfebsI',
  authDomain: 'recipe-app-dd983.firebaseapp.com',
  projectId: 'recipe-app-dd983',
  storageBucket: 'recipe-app-dd983.appspot.com',
  messagingSenderId: '363053296332',
  appId: '1:363053296332:web:6c4b568b48f2c929c37069',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
