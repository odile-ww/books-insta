import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { httpInterceptorProviders } from './interceptors';

const firebaseConfig = {
  apiKey: 'AIzaSyDI3Ir8arnqHmPpumTquH4frjPmKU8WE6s',
  authDomain: 'quotes-api-angular.firebaseapp.com',
  databaseURL: 'https://quotes-api-angular.firebaseio.com',
  projectId: 'quotes-api-angular',
  storageBucket: 'quotes-api-angular.appspot.com',
  messagingSenderId: '710953902904',
  appId: '1:710953902904:web:e6cae1d8be92d48e6b17cd',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
