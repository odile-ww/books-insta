import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-space', component: UserSpaceComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'quotes', component: QuotesListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
