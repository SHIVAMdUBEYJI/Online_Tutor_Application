import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/components/Model/Course';
import { Observable } from 'rxjs';
import { Application } from 'src/app/components/Model/Application';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
    private baseUrl = 'http://localhost:8082/course/v1';  // Adjust the base URL according to your backend

    constructor(private http: HttpClient) {}

    // Fetch all available courses for students
    getCourses(): Observable<Course[]> {
      return this.http.get<Course[]>(`${this.baseUrl}/getCourses`);
    }

    // Fetch courses for a tutor by email
    getTutorCourses(tutorEmail: string): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.baseUrl}/getTutorCourses/${tutorEmail}`);
    }

    getApplications(courseId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getApplications/${courseId}`);
      }
      acceptApplication(applicationId: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/acceptApplication`, { applicationId });
      }

      // Reject an application
      rejectApplication(applicationId: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/rejectApplication`, { applicationId });
      }

}
