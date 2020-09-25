import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { AppState } from 'src/app/store';
import { ListCategory } from './category-actions';
import { CategoryService } from '../service/category.service';
import { map, tap, mergeMap } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private categoryService: CategoryService
  ) {}

  @Effect()
  init$ = defer(() => {
    return this.categoryService.getCategories().pipe(
      tap((res) => {
        console.log(res);
      }),
      mergeMap((categories) =>
        of(new ListCategory({ categories: categories.categories }))
      )
    );
  });
}
