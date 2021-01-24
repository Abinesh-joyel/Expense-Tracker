import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/utils/models';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
  @Input() category: Category[];
  constructor() {}

  ngOnInit() {}

  trackByFn(index: number, item: Category) {
    return item._id;
  }
}
