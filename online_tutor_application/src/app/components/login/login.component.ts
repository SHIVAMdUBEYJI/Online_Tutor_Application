import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../Model/User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginError: string | null = null;
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        // Initialize the form with validations
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            role: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        // No need to reinitialize the form here
    }

    login(): void {
        this.isLoading = true;

        this.userService.loginUser(this.loginForm.value).subscribe(
            (response: any) => {
                this.isLoading = false;
                this.snackBar.open('Login Successful', 'Close', {
                    duration: 3000,
                });

                console.log('Full response:', response); // Log the full response for inspection

                // Extract email from the message string
                const emailRegex = /(\S+@\S+\.\S+)/; // Regular expression to match email format
                const matchedEmail = response.message.match(emailRegex);

                if (matchedEmail && matchedEmail[0]) {
                    const userEmail = matchedEmail[0];
                    localStorage.setItem('email', userEmail); // Store email in local storage
                    console.log(
                        'Email saved to localStorage:',
                        localStorage.getItem('email')
                    );
                } else {
                    console.error('No email found in response message.');
                }

                // Navigate based on role
                const role = this.loginForm.get('role')?.value;
                if (role === 'student') {
                    this.router.navigate(['/student-board']);
                } else if (role === 'tutor') {
                    this.router.navigate(['/tutor-board']);
                }
            },
            (error) => {
                this.isLoading = false;
                this.snackBar.open(
                    'Unauthorized role, please choose the correct one.',
                    'Close',
                    { duration: 3000 }
                );
                this.loginError =
                    'Invalid email or password. Please try again.';
                console.error('Error logging in user:', error);
            }
        );
    }
}
