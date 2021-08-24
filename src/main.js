import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyCman_jRokfItv6mFEw4EaEP1w9Zm-mhjc",
    authDomain: "sit120-a3.firebaseapp.com",
    projectId: "sit120-a3",
    databaseURL: "https://sit120-a3-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "sit120-a3.appspot.com",
    messagingSenderId: "977549277622",
    appId: "1:977549277622:web:abbf3a6c259d7de6952917"
};

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
