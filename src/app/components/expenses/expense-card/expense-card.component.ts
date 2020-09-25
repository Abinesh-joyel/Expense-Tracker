import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseCardComponent implements OnInit {
  @Input() title: string;
  @Input() value: number;
  constructor() {}

  ngOnInit() {}
}
