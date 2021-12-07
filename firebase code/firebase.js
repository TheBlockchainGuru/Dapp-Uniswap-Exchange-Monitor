import firebase from 'firebase';

const config = {
 apiKey: "AIzaSyCpV7WoPAtY3TQ-8IqV8l-SIwI72IWWPeA",
    authDomain: "christopherburton-abc7f.firebaseapp.com",
    projectId: "christopherburton-abc7f",
    storageBucket: "christopherburton-abc7f.appspot.com",
    messagingSenderId: "239448675027",
    appId: "1:239448675027:web:65fe1acf9d92cc65d53a26"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();