import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorBoardComponent } from './tutor-board.component';

describe('TutorBoardComponent', () => {
  let component: TutorBoardComponent;
  let fixture: ComponentFixture<TutorBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorBoardComponent]
    });
    fixture = TestBed.createComponent(TutorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
