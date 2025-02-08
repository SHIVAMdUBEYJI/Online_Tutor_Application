import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNo: [
                '',
                [Validators.required, Validators.pattern('^[0-9]{10}$')],
            ],
            qualification: ['', Validators.required],
            role: ['', Validators.required],
        });
    }

    ngOnInit(): void {}

    register(): void {
        if (this.registerForm.valid) {
            this.userService.registerUser(this.registerForm.value).subscribe({
                next: (response) => {
                    // Show success message
                    alert('User registered successfully');
                    this.registerForm.reset();
                    // Navigate to the login page
                    this.router.navigateByUrl('/login');
                },
                error: (error) => {
                    console.error('Error during registration', error);
                    alert('Registration failed. Please try again.');
                },
            });
        } else {
            alert('Please fill in all required fields.');
        }
    }
}
