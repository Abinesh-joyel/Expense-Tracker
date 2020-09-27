import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
  exportForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.exportForm = this.fb.group({
      start: [],
      end: [],
      format: ['pdf'],
    });
  }

  onSubmit() {}
}
