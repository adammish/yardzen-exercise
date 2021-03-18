import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_MID,
  appId: process.env.REACT_APP_APPID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;