import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    isLoggedIn: boolean = false; // Track login status
    isStudentOrTutorBoard: boolean = false; // Track if on restricted pages

    // Reference to the sidenav
    @ViewChild('drawer') drawer!: MatSidenav;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        // Check login status
        this.isLoggedIn = this.userService.isLoggedIn();

        // Listen for route changes to manage restricted pages
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Check if the current route is a restricted route
                const restrictedRoutes = ['/student-board', '/tutor-board'];
                this.isStudentOrTutorBoard = restrictedRoutes.includes(
                    event.url
                );

                // Close sidenav on restricted routes
                if (this.isStudentOrTutorBoard && this.drawer) {
                    this.drawer.close();
                }
            }
        });
    }

    // Logout logic
    logout(): void {
        this.userService.logout();
        this.isLoggedIn = false;
        this.isStudentOrTutorBoard = false; // Reset restricted status
        this.router.navigate(['/login']);
    }
}
