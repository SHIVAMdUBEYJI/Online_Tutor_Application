import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TutorBoardComponent } from './components/tutor-board/tutor-board.component';
import { StudentBoardComponent } from './components/student-board/student-board.component';
import { SharedModule } from './shared/shared.module';
import{MatProgressSpinnerModule} from'@angular/material/progress-spinner'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        StudentBoardComponent,
        TutorBoardComponent,



    ],
    imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbar,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule,

],
    providers: [],
    bootstrap: [AppComponent],

})
export class AppModule {}
