import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExportComponent } from './export.component';
import { ReportStore } from './store/report.store';
@NgModule({
  declarations: [ExportComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ReportStore],
})
export class ExportModule {}
