globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true; // DON'T COMMIT

import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCDGxBG-AGq-03xeBdIX6ovSTIXLLkm1dQ',
    authDomain: 'usea-seoul.firebaseapp.com',
    projectId: 'usea-seoul',
    storageBucket: 'usea-seoul.appspot.com',
    messagingSenderId: '1030974608290',
    appId: '1:1030974608290:web:c62ead652a2fd687cc18fb',
    measurementId: 'G-6D0X1L543J'
});

export const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider('6LciN9YaAAAAAH7W5SGO4i74-df_MEHU974oivnr'),
    isTokenAutoRefreshEnabled: true
});