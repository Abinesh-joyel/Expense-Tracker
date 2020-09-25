import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { ExpenseBarListComponent } from './expense-bar-list/expense-bar-list.component';
import { ExpenseChartComponent } from './expense-chart/expense-chart.component';
import { ExpensePercentagePipe } from './pipe/expense-percentage.pipe';
import { ExpenseCategoryListComponent } from './expense-category-list/expense-category-list.component';
import { ExpenseLineChartComponent } from './expense-line-chart/expense-line-chart.component';

@NgModule({
  imports: [CommonModule, ChartsModule, ChartRoutingModule],
  declarations: [
    ChartComponent,
    ExpenseBarListComponent,
    ExpenseChartComponent,
    ExpensePercentagePipe,
    ExpenseCategoryListComponent,
    ExpenseLineChartComponent,
  ],
})
export class ChartModule {}
