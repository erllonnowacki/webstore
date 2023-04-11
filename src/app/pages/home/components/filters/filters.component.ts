import { Subscription } from "rxjs";
import { StoreService } from "./../../../../services/store.service";
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;

  categories: Array<string> | undefined;

  constructor(private StoreService: StoreService) {}

  ngOnInit(): void {
    this.StoreService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
