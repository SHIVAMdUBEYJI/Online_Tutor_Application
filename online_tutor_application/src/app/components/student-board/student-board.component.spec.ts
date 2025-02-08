import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBoardComponent } from './student-board.component';

describe('StudentBoardComponent', () => {
  let component: StudentBoardComponent;
  let fixture: ComponentFixture<StudentBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBoardComponent]
    });
    fixture = TestBed.createComponent(StudentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
