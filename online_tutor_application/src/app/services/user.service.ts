import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/components/Model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Course } from 'src/app/components/Model/Course';
@Injectable({
    providedIn: 'root',
})
export class UserService implements OnInit {
    private baseUrl: string = 'http://localhost:8082/api/v1';

    registerURL: string = `http://localhost:8081/home/register`;
    loginURL: string = `http://localhost:8081/home/login`;

    private loggedIn = false;

    constructor(private http: HttpClient, private router: Router) {}
    ngOnInit(): void {}

    registerUser(userDetails: User): Observable<User> {
        return this.http.post<User>(`${this.registerURL}`, userDetails);
    }

    loginUser(userData: { email: string; password: string; role: string }) {
        return this.http.post('http://localhost:8081/home/login', userData);
    }
    setToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    // Method to get token from localStorage
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // Method to check if user is logged in (token is present)
    isLoggedIn(): boolean {
        return this.loggedIn;
    }
    getUserRole(): string {
        // Retrieve the user's role from localStorage, cookies, or a service
        return localStorage.getItem('role') || '';
    }
    login(): void {
        this.loggedIn = true;
    }
    //       // Method to log out the user
    logout(): void {
        this.loggedIn = false;
       
    } // Optionally, remove email from localStorage

    getLoggedInUser(): User | null {
        const user = localStorage.getItem('loggedInUser');
        return user ? JSON.parse(user) : null; // Return the User object if found
    }

    /**
     * Saves the logged-in user's details in local storage.
     * @param user An object containing user details.
     */
    saveLoggedInUser(user: User): void {
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save the entire User object
    }

    /**
     * Logs the user out by clearing local storage.
     */
    // logout(): void {
    //     localStorage.removeItem('loggedInUser'); // Remove user data from local storage
    // }

    /**
     * Checks if the user is logged in (i.e., if their data exists in local storage).
     * @returns true if the user is logged in, false otherwise.
     */
    // isLoggedIn(): boolean {
    //     return this.getLoggedInUser() !== null; // Returns true if a user object exists in local storage
    // }
    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/getStudent/${email}`);
    }

    getAllStudents(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/getStudents`);
    }

    getAllTutors(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/getTutors`);
    }

    addCourseToUserDetails(email: string, course: Course): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/courses/${email}`, course);
    }

    deleteCourseFromUser(email: string, course: Course): Observable<any> {
        return this.http.post(`${this.baseUrl}/deleteCourse/${email}`, course);
    }
    getAppliedCourses(email: string): Observable<any> {
        return this.http.get(`${this.baseUrl}getCoursesApplied/${email}`);
    }
}
