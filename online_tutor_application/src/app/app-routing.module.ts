import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TutorBoardComponent } from './components/tutor-board/tutor-board.component';
import { StudentBoardComponent } from './components/student-board/student-board.component';

// import { HomeComponent } from './components/home/home.component';

// You may need to implement AuthGuardService to restrict access based on roles
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'student-board',
        component: StudentBoardComponent,
        // canActivate: [AuthGuardService], // Guard to allow only students
        // data: { role: 'student' }
    },
    {
        path: 'tutor-board',
        component: TutorBoardComponent,
        // canActivate: [AuthGuardService], // Guard to allow only tutors
        // data: { role: 'tutor' }
    },
    //   { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
    //   { path: '**', redirectTo: '/login' } // Wildcard route for a 404 page, redirect to login
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
