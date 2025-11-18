import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Redirects based on login status
onAuthStateChanged(auth, user => {
    if (!user && window.location.pathname !== '/login') {
        window.location.href = "/login";
    } else if (user && window.location.pathname === '/login') {
        window.location.href = "/dashboard";
    }
});

// Sign out
const signOut = () => {
    auth.signOut().then(() => {
        window.location.href = "/login";
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}
window.signOut = signOut;

// Check if user is admin
onAuthStateChanged(auth, async user => {
    if (user) {
        const userRef = doc(db, "users", user.email);
        try {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                window.isAdmin = !!userSnap.data().admin;
            } else {
                window.isAdmin = false;
            }
            document.querySelectorAll('.adminOnly').forEach(el => {
                el.style.display = window.isAdmin ? 'block' : 'none';
            });
            document.querySelectorAll('.adminExclude').forEach(el => {
                el.style.display = !window.isAdmin ? 'block' : 'none';
            });
        } catch (error) {
            console.error("Error checking admin status:", error);
            window.isAdmin = false;
        }
    }
});