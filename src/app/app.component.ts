import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  currentUser: string;

  ngOnInit(): void {
    this.authService.getCurrentUser();
    this.authService.userObservable.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  logout() {
    this.authService.logout();
  }
}
