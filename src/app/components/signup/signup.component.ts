import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  errorMessage: string;

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  signupForm = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.signupForm.getRawValue();
    this.authService
      .signup(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/quotes');
        },
        // TO DO: handle invalid status of the form
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }

  signInWithGoogle() {
    this.authService.googleSignIn().subscribe({
      next: () => {
        //TODO: finish the sign in
        this.router.navigateByUrl('/quotes');
      },

      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
