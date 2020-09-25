import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './components/shared/shared.module';

import { AppEffects } from './app.effects';
import { CategoryEffects } from './components/categories/store/category-effects';
import { ExpenseEffects } from './components/expenses/store/expense-effects';

import { HeaderComponent } from './components/core/header/header.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';

import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { ExportComponent } from './components/export/export.component';
import { AboutComponent } from './components/about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    ExportComponent,
    AboutComponent,
  ],
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
    // StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
