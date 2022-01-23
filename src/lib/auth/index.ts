import { onMount } from 'svelte';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, signInWithRedirect, signOut, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from "$lib/firebase";
import { readable } from 'svelte/store';

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
}

export const isValidLinkLogin = async () => {
    const auth = getAuth(firebaseApp);
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email: string = window.localStorage.getItem('emailForSignIn');
        if (!email) email = window.prompt('Please provide your email for confirmation');
        try {
            await signInWithEmailLink(auth, email);
            window.localStorage.removeItem('emailForSignIn');
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
}

export const emailLogin = async (email: string) => {
    await sendSignInLinkToEmail(getAuth(firebaseApp), email, { url: window.location.href, handleCodeInApp: true })
    window.localStorage.setItem('emailForSignIn', email);
}

export const googleLogin = () => signInWithRedirect(getAuth(firebaseApp), new GoogleAuthProvider());

export const logout = async () => await signOut(getAuth(firebaseApp));

export const user = readable(undefined, set => {
    onMount(() => {
        return getAuth(firebaseApp).onAuthStateChanged(async fireUser => {
            if (fireUser) {
                const claims = (await fireUser.getIdTokenResult()).claims;
                const user: User = {
                    id: <string>claims.user_id,
                    name: <string>claims.name,
                    email: <string>claims.email,
                    picture: <string>claims.picture
                };
                set(user);
            } else {
                set(null);
            }
        });
    });
});