import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentComponent } from '../components/dialog-content/dialog-content-component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DialogContentComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [DialogContentComponent]
})
export class SharedModule { }
