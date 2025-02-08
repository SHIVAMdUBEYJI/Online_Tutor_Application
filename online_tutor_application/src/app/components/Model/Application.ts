export interface Application {
    id?: string;
    courseId: string;
    tutorEmail: string;
    studentEmail: string;
    status?: string; // e.g., "Pending", "Accepted", "Rejected"
  }
