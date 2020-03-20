import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProblemsComponent } from './insert-problems.component';

describe('InsertProblemsComponent', () => {
  let component: InsertProblemsComponent;
  let fixture: ComponentFixture<InsertProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
