import firebase from "firebase";
import "firebase/firestore";

let config = {
    apiKey: "AIzaSyBLj3vvl__LQ50m4hPg-7iDVBAhwTnwdPA",
    authDomain: "reactfirebasecrud-382f6.firebaseapp.com",
    databaseURL: "https://reactfirebasecrud-382f6.firebaseio.com",
    projectId: "reactfirebasecrud-382f6",
    storageBucket: "reactfirebasecrud-382f6.appspot.com",
    messagingSenderId: "883310125235",
    appId: "1:883310125235:web:a91001e75e7bda15f9d0c6"
};

firebase.initializeApp(config);

export default firebase.firestore();