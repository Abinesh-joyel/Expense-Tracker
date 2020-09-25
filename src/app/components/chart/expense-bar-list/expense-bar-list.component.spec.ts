import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseBarListComponent } from './expense-bar-list.component';

describe('ExpenseBarListComponent', () => {
  let component: ExpenseBarListComponent;
  let fixture: ComponentFixture<ExpenseBarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseBarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseBarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
