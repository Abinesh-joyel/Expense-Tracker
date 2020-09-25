import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoriesComponent } from './categories.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';

// import { StoreModule } from '@ngrx/store';
// import { categoryReducer } from './store/category-reducers';
// StoreModule.forFeature('category', categoryReducer),

@NgModule({
  imports: [CommonModule, CategoriesRoutingModule],
  declarations: [
    CategoriesComponent,
    CategoryAddComponent,
    CategoryListComponent,
  ],
})
export class CategoriesModule {}
