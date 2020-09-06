import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


/*
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

*/



const firebaseConfig = {
  apiKey: "AIzaSyB-pAGGoFQoc-O1Pi4fchL8TIvhNS-hEZ0",
  authDomain: "travelblogmap-15db6.firebaseapp.com",
  databaseURL: "https://travelblogmap-15db6.firebaseio.com",
  projectId: "travelblogmap-15db6",
  storageBucket: "travelblogmap-15db6.appspot.com",
  messagingSenderId: "247606255325",
  appId: "1:247606255325:web:55b6f30921ac8e5abb4534",
  measurementId: "G-0NXE5SSNQQ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Se llama despues del login o logout o si lo llamo
export const onAuthStateChanged = (setter) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const normalizedUser = mapUserFromFirebaseAuth(user);
      setter(normalizedUser);
    }
    
  });
}


export const loginWithGMAIL = () => {
  const gmailProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(gmailProvider).catch( error => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

export const loginWithEMAIL = () => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

export const createUserWithEmail = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

export const signOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('Sign-out successful.');
  }).catch(function(error) {
    // An error happened.
    console.log(error)
  });
}

const mapUserFromFirebaseAuth = user => {
  const { additionalUserInfo, photoURL, email, displayName} = user;

  return {
    //additionalUserInfo,
    photoURL,
    email,
    displayName
  }
}

export const addPost = (post, user) => {

  const {description, image, title, url, tags, country, location} = post;

  return db.collection("posts").add({
    description,
    image,
    title,
    url, 
    tags, 
    country, 
    location: {...location},
    user,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date())
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}