import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExportComponent } from './export.component';
@NgModule({
  declarations: [ExportComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ExportModule {}
