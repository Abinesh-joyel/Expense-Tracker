import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Observable } from 'rxjs';
import { setup, track, printSubscribers } from 'observable-profiler';

if (environment.production) {
  enableProdMode();
}
setup(Observable);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    track();
    (window as any).stopProfiler = () => {
      ref.destroy();
      const subscribers = track(false);
      printSubscribers({
        subscribers,
      });
    };
  })
  .catch((err) => console.log(err));
