 
import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyAKOSXDq8Q9PkjCud1ZjHRcamw75J7n5d0",
  authDomain: "tour-booker-app-1532903306170.firebaseapp.com",
  databaseURL: "https://tour-booker-app-1532903306170.firebaseio.com",
  projectId: "tour-booker-app-1532903306170",
  storageBucket: "tour-booker-app-1532903306170.appspot.com",
  messagingSenderId: "92378474282"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();

  export {
    auth,
  };