import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Category } from 'src/app/utils/models';

@Component({
  selector: 'app-expense-search-list',
  templateUrl: './expense-search-list.component.html',
  styleUrls: ['./expense-search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseSearchListComponent {
  @Input() category: Category;
  @Output() selected = new EventEmitter<Category>();
  constructor() {}
}
