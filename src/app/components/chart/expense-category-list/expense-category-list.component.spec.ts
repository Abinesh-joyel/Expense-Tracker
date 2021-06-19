import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseCategoryListComponent } from './expense-category-list.component';

describe('ExpenseCategoryListComponent', () => {
  let component: ExpenseCategoryListComponent;
  let fixture: ComponentFixture<ExpenseCategoryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
