//firebase config key setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
//Your web app's Firebase configuration



const firebaseConfig = {
    apiKey: "AIzaSyDsYIW1iYr0wQ5NwyaLY6n49PEF6wKBW7c",
    authDomain: "fir-task-51a69.firebaseapp.com",
    projectId: "fir-task-51a69",
    storageBucket: "fir-task-51a69.appspot.com",
    messagingSenderId: "470709539232",
    appId: "1:470709539232:web:a0854f3650f28c6cf514c5",
    measurementId: "G-3J0YKT254N"
  };

if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);

}



export { firebase };