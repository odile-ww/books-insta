import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null>(null);

  signup(email: string, username: string, password: string): Observable<void> {
    //Firebase returns promises
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((resp) => updateProfile(resp.user, { displayName: username }));

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  googleSignIn() {
    const promise = signInWithPopup(
      this.firebaseAuth,
      new GoogleAuthProvider()
    );
    return from(promise);
  }
}
