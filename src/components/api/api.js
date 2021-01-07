// Your web app's Firebase configuration
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBBih8rIY_m6mMwzCl92AEmPLRh0HE40qs",
    authDomain: "supertodo-f5b62.firebaseapp.com",
    databaseURL: "https://supertodo-f5b62-default-rtdb.firebaseio.com",
    projectId: "supertodo-f5b62",
    storageBucket: "supertodo-f5b62.appspot.com",
    messagingSenderId: "436787061799",
    appId: "1:436787061799:web:b031c534ef7b7bd6c11a02"
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
    },

    findUser(uid){
        return firebase.database().ref(uid).orderByKey().once('value')
    }
}

export const userData = {
    firstSetUserData(id, obj){
        return firebase.database().ref(id).set(obj)
    },

    updateUserData(id, type, obj){
        return firebase.database().ref(`${id}/${type}`).set(obj);
    }
}
