import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'money-manager';
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.autoLogOn();
  }
}
