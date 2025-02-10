import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ngmradi-mlks',
        appId: '1:1072206145282:web:f3ca0b661edf91d925841b',
        storageBucket: 'ngmradi-mlks.firebasestorage.app',
        apiKey: 'AIzaSyB2OVqzA31WLd5YkI3sfD-FO2_6nDiEpZo',
        authDomain: 'ngmradi-mlks.firebaseapp.com',
        messagingSenderId: '1072206145282',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
