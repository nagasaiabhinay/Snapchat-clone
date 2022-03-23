import firebase from 'firebase';
const firebaseConfig = {
	apiKey: 'AIzaSyAXPQ7MocsxMsDKBZntMe4W80qCWZ_TJhs',
	authDomain: 'snapchat-clone-3c268.firebaseapp.com',
	projectId: 'snapchat-clone-3c268',
	storageBucket: 'snapchat-clone-3c268.appspot.com',
	messagingSenderId: '620068551979',
	appId: '1:620068551979:web:9afde8ff797425c191d96e',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
