import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './components/auth/service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'money-manager';
  constructor(private auth: AuthService, private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    this.auth.autoLogOn();
     if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          if(confirm("New version available. Load New Version?")) {
            window.location.reload();
          }
        });
    }
  }
}
