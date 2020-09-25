import { Component, Input } from '@angular/core';
import { ExpenseCategory } from 'src/app/utils/models';

@Component({
  selector: 'app-expense-bar-list',
  templateUrl: './expense-bar-list.component.html',
  styleUrls: ['./expense-bar-list.component.scss'],
})
export class ExpenseBarListComponent {
  @Input() expCategory: ExpenseCategory;
  @Input() maxPercentage: number;
  @Input() dateFlag: boolean;
  constructor() {}
}
