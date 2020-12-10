// Your web app's Firebase configuration
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBKawD4Q611GDlnxEOFuKiQJAqQ_8fdSgY",
    authDomain: "pikadu-47442.firebaseapp.com",
    databaseURL: "https://pikadu-47442.firebaseio.com",
    projectId: "pikadu-47442",
    storageBucket: "pikadu-47442.appspot.com",
    messagingSenderId: "737650211116",
    appId: "1:737650211116:web:27bc7f6ca9309e24395489"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const authUser = {
    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => response.user)
    },

    registration(email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    },

    out(){
        return firebase.auth().signOut()
    },

    forgetPassword(email){
        return firebase.auth().sendPasswordResetEmail(email)
    }
}
