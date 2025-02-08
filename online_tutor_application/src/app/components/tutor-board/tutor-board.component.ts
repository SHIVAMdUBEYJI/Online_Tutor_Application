import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Application } from '../Model/Application';
import { Course } from '../Model/Course';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { DialogContentComponent } from '../dialog-content/dialog-content-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-tutor-board',
    templateUrl: './tutor-board.component.html',
    styleUrls: ['./tutor-board.component.css'],
})
export class TutorBoardComponent implements OnInit {
    applications: Application[] = [];
    selectedCourse: Course | null = null;
    filteredApplications: Application[] = [];
    tutorCourses: Course[] = [];
    loadingCourses = false;
    loadingApplications = false;
    errorMessage = '';


    constructor(
        private courseService: CourseService,
        private userService: UserService,
        private cd: ChangeDetectorRef,
        private router: Router,
         private dialog:MatDialog
    ) {}

    ngOnInit(): void {
        const email = localStorage.getItem('email')?.trim();
        console.log('Logged in email:', email); // Debugging log

        if (!email) {
            this.errorMessage = 'No email found. Please log in again.';
            console.error('Logged in email is undefined.');
            // Optional: Redirect to login if email is missing
            // this.router.navigate(['/login']);
        } else {
            this.fetchTutorCourses(email);
        }
    }
    logout(): void {
        this.userService.logout(); // Clears session
        this.router.navigate(['/login']); // Redirects to login
    }
    fetchTutorCourses(email: string): void {
        this.loadingCourses = true;
        console.log(`Fetching courses for tutor with email: ${email}`); // Debugging log

        this.courseService.getTutorCourses(email).subscribe(
            (courses: Course[]) => {
                console.log('Courses received from backend:', courses); // Debugging log
                this.tutorCourses = courses;
                this.loadingCourses = false;
                this.cd.detectChanges(); // Trigger change detection
            },
            (error) => {
                this.loadingCourses = false;
                this.errorMessage = 'Error fetching tutor courses.';
                console.error('Error fetching tutor courses', error);
            }
        );
    }

    viewApplications(course: Course): void {
        this.selectedCourse = course;
        this.loadingApplications = true;

        if (course.courseId) {
            console.log(
                `Fetching applications for course ID: ${course.courseId}`
            ); // Debugging log
            this.courseService.getApplications(course.courseId).subscribe(
                (applications: Application[]) => {
                    // Filter applications based on selected course ID
                    console.log('Applications loaded:', applications); 
                    this.filteredApplications = applications.filter(
                        (app) => app.courseId === course.courseId
                    );
                    this.loadingApplications = false;
                },
                (error) => {
                    this.loadingApplications = false;
                    this.errorMessage =
                        'Error fetching applications for the course.';
                    console.error('Error fetching applications', error);
                }
            );
        } else {
            this.errorMessage = 'Course ID is missing.';
            console.error('Course ID is missing.');
        }
    }

    acceptApplication(applicationId: string | undefined): void {
        if (applicationId) {
            console.log(`Accepting application with ID: ${applicationId}`); // Debugging log
            this.courseService.acceptApplication(applicationId).subscribe(
                () => {
                    alert('Application accepted!');
                    if (this.selectedCourse) {
                        this.viewApplications(this.selectedCourse); // Refresh applications for the course
                    }
                },
                (error) => {
                    console.error('Error accepting application', error);
                }
            );
        }
    }

    rejectApplication(applicationId: string | undefined): void {
        if (applicationId) {
            console.log(`Rejecting application with ID: ${applicationId}`); // Debugging log
            this.courseService.rejectApplication(applicationId).subscribe(
                () => {
                    alert('Application rejected!');
                    if (this.selectedCourse) {
                        this.viewApplications(this.selectedCourse); // Refresh applications for the course
                    }
                },
                (error) => {
                    console.error('Error rejecting application', error);
                }
            );
        }
    }
}
