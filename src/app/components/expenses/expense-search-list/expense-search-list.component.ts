import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/utils/models';

@Component({
  selector: 'app-expense-search-list',
  templateUrl: './expense-search-list.component.html',
  styleUrls: ['./expense-search-list.component.scss'],
})
export class ExpenseSearchListComponent implements OnInit {
  @Input() category: Category;
  @Output() selected = new EventEmitter<Category>();
  constructor() {}

  ngOnInit() {}
}
