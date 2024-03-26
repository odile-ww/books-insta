import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { ThemeService } from './state/themeState.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: string;
  subscription: Subscription;
  theme: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme = this.themeService.getStatus();
    console.log(this.theme);
    this.authService.getCurrentUser();
    this.subscription = this.authService.userObservable.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/quotes');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.getStatus();
    console.log(this.theme);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
