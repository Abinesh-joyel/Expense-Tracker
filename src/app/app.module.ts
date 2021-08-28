import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ToastrModule } from 'ngx-toastr';
import { ExportModule } from './components/export/export.module';

import { AppEffects } from './app.effects';
import { CategoryEffects } from './components/categories/store/category-effects';
import { ExpenseEffects } from './components/expenses/store/expense-effects';

import { HeaderComponent } from './components/core/header/header.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';

import { AboutComponent } from './components/about/about.component';
import { AuthLayoutComponent } from './components/core/auth-layout/auth-layout.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [AppComponent, SidebarComponent, HeaderComponent, AboutComponent, AuthLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects, CategoryEffects, ExpenseEffects]),
    ToastrModule.forRoot({ timeOut: 1500 }),
    ExportModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // StoreRouterConnectingModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
