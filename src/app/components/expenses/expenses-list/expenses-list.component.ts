import { Component, OnInit, Input } from '@angular/core';
import { Expense } from 'src/app/utils/models';
@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
})
export class ExpensesListComponent implements OnInit {
  @Input() expense: Expense;
  constructor() {}

  ngOnInit() {}
}
