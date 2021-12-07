import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDP2N1EL1pFOswYWeNaUZzBozz0cF_Rdn4",
  authDomain: "swap-monitor.firebaseapp.com",
  projectId: "swap-monitor",
  storageBucket: "swap-monitor.appspot.com",
  messagingSenderId: "66081591437",
  appId: "1:66081591437:web:3b99f0307154bcb86412c4",
  measurementId: "G-0XT1CSM8K5"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
