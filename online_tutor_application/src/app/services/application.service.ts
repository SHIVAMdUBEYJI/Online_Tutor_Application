import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from 'src/app/components/Model/Application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService implements OnInit {
  private baseUrl = 'http://localhost:8082/application/v1';

  constructor(private http: HttpClient) {}
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  applyForCourse(application: Application): Observable<Application> {
    return this.http.post<Application>(`${this.baseUrl}/apply`, application);
  }

  getApplicationsForTutor(tutorEmail: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/tutor/{tutorEmail}`);
  }

  updateApplicationStatus(id: string, status: string): Observable<Application> {
    return this.http.put<Application>(`${this.baseUrl}/updateStatus/${id}`, {}, { params: { status } });
  }
}
