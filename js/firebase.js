var didNotInitialize = true;
var userId = null;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAj5T5TbX8aDnuJqHnabD8aUsI12q_CAKA",
    authDomain: "acainataca-89605.firebaseapp.com",
    projectId: "acainataca-89605",
    storageBucket: "acainataca-89605.appspot.com",
    messagingSenderId: "433830529348",
    appId: "1:433830529348:web:2e0bf3d6385458441d2f11",
    measurementId: "G-G29SWL641K"
};

if (didNotInitialize) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    didNotInitialize = false;
}


firebase.analytics();