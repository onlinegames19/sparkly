import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAp07yR6ailPZVjeI7I1QJTnMMeE2tOvFs",
    authDomain: "sparkly-gmz.firebaseapp.com",
    projectId: "sparkly-gmz",
    storageBucket: "sparkly-gmz.firebasestorage.app",
    messagingSenderId: "83661112176",
    appId: "1:83661112176:web:f5af334022156d9a5585b5",
    measurementId: "G-LGFDJ1GHQD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if (!user && window.location.pathname !== '/login') {
        // Not logged in → send to login
        window.location.href = "/login";
    } else if (user && window.location.pathname === '/login') {
        // Already logged in → send to dashboard
        window.location.href = "/dashboard";
    }
});

const signOut = () => {
    auth.signOut().then(() => {
        window.location.href = "/login";
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}

window.signOut = signOut;