import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../Model/Course';
import { DialogContentComponent } from '../dialog-content/dialog-content-component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from '../Model/User';

@Component({
    selector: 'app-student-board',
    templateUrl: './student-board.component.html',
    styleUrls: ['./student-board.component.css'],
})
export class StudentBoardComponent implements OnInit {
    courses: Course[] = [];
    loading = false;
    errorMessage = '';
    user: User | null = null;

    constructor(
        private courseService: CourseService,
        private userService: UserService,
        public dialog: MatDialog,
        private authService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.user = this.userService.getLoggedInUser();
        console.log(this.user); // Check the user object
        this.fetchCourses();
    }
    logout(): void {
        this.userService.logout(); // Clears session
        this.router.navigate(['/login']); // Redirects to login
    }
    fetchCourses(): void {
        this.loading = true;
        this.courseService.getCourses().subscribe(
            (data: Course[]) => {
                this.courses = data;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.errorMessage =
                    'Error fetching courses. Please try again later.';
                console.error('Error fetching courses', error);
            }
        );
    }

    openApplyDialog(course: Course): void {
        const dialogRef = this.dialog.open(DialogContentComponent, {
            width: '300px',
            data: {
                courseId: course.courseId,
                courseName: course.courseName,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            alert('successfully Applied!!');
            console.log('The dialog was closed');
        });
    }
}
