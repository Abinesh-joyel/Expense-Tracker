import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportStore } from './store/report.store';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
  exportForm: FormGroup;
  reports$ = this.reportStore.reports$;
  constructor(private fb: FormBuilder, private readonly reportStore: ReportStore) {}

  ngOnInit() {
    this.exportForm = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
      format: ['pdf'],
    });
    this.reports$.subscribe((res) => {
      console.log(res);
    });
  }

  onSubmit() {
    console.log(this.exportForm.value);
    this.reportStore.getReports();
  }
}
