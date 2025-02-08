// dialog-content.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent {
    applicationForm: FormGroup;
    isViewingApplications: boolean;
    applications: any[];

    constructor(
      public dialogRef: MatDialogRef<DialogContentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private applicationService: ApplicationService
    ) {
      this.isViewingApplications = data.isViewingApplications || false;
      this.applications = data.applications || [];

      this.applicationForm = this.fb.group({
        studentName: ['', Validators.required],
        studentEmail: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required]
      });
    }

    onSubmit(): void {
        const application = {
          studentName: this.applicationForm.get('studentName')?.value,
          studentEmail: this.applicationForm.get('studentEmail')?.value,
          courseId: this.data.courseId,
          message: this.applicationForm.get('message')?.value,
          tutorEmail: this.data.tutorEmail
        };

        if (!application.courseId) {
          console.error('Course ID is undefined');
          return;
        }

        this.applicationService.applyForCourse(application).subscribe(
          (response) => {
            console.log('Application submitted successfully', response);
            this.dialogRef.close();
            alert('Successfully applied for the course!');
          },
          (error) => {
            console.error('Error applying for course', error);
            alert('There was an error applying for the course. Please try again.');
          }
        );
      }


    }
