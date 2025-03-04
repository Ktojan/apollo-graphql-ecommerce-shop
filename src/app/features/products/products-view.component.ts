import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, filter } from 'rxjs';
import { Product } from './Product';
import { initialProds, ProductsService } from './products.service';
import { SubscriptionContainer } from './SubscriptionContainer';
import { MessageService } from 'primeng/api';
import { WishlistService } from '../../shared/wishlist.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent implements OnInit, OnDestroy {
  products$!: Observable<any>
  prodList: Product[] = [];
  subs = new SubscriptionContainer();
  categories!: any;

  // Sorting
  sortOptions: any = ['asc', 'desc'];
  sortKey!: string;
  sortField!: string;
  sortOrder!: number;

  // Ordering by price
  priceFrom!: number;
  priceTo!: number;
  rangeValues: number[] = [];

  highestPrice: number = 0;
  lowestPrice: number = 0;

  numberOfProducts!: number;
  isLoading = true;

  searchInput = '';
  categoriesFilter!: string;

  public items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private _productService: ProductsService,
    private _messageService: MessageService,
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { filters: any };
    const filters = state?.filters;
    if (filters) {
      this.categoriesFilter = filters;
    }
  }

  ngOnInit() {
    this.subs.add(this._productService.getProducts("asc", this.categoriesFilter).subscribe((products: any) => {
      const productsExtended = products.data.product.concat(initialProds.filter(
        pr => this.categoriesFilter? pr.category.name == this.categoriesFilter : true)
      );
      this.prodList = productsExtended.map((pr: Product) => ({ ...pr, price: pr.price*0.01 }));
      console.log('Fetched products: ', this.prodList);
      this.products$ = of(this.prodList);
      this.numberOfProducts = this.prodList.length;
      this.isLoading = false;

      const sortedPrices = [...this.prodList].sort((productA: any, productB: any) => (productA.price - productB.price))

      this.highestPrice = sortedPrices[0].price
      this.lowestPrice = sortedPrices.at(-1)!.price || 0;
      this.rangeValues = [this.highestPrice, this.lowestPrice];
      this.prodList.forEach((product: Product) => {
        if (product.price > this.highestPrice) {
          this.highestPrice = product.price;
        };

        if (product.price < this.lowestPrice) {
          this.lowestPrice = product.price;
        };
      });
    }));

    this.subs.add(this._productService.getProductCategories().subscribe((categories: any) => {
      this.categories = categories.data.category;
      this.isLoading = false;
    }))

  }

  // Search filtering
  onChanges(changes: any) {
    this.searchInput = changes;
    this.subs.add(this._productService.searchProducts(changes).subscribe((products: any) => {
      this.products$ = of(products.data.product.map((pr: Product) => ({ ...pr, price: pr.price*0.01 })));
    }))
  }

  trackByProductId(index: number, product: Product): number {
    return index;
  }

  applyFilters(filtersObject: any) {
    if (filtersObject) {
      this.subs.add(this._productService.getFilteredProducts(filtersObject).subscribe((product: any) => {
        this.products$ = of(product.data.product);
      }))
    }
  }

  getBySubcategory(selectedCategory: string) {
    this.subs.add(this._productService.getProductBySubcategory(selectedCategory).subscribe((products: any) => {
      this.products$ = of(this.prodList);
    }))
  }

  filterSubcategories(categories: string[]) {
    this.subs.add(this._productService.getProductsFromSubcategories(categories).subscribe((products: any) => {
      this.products$ = of(products.data.product.map((pr: Product) => ({ ...pr, price: pr.price*0.01 })));
    }))
  }

  addToWishList(product: Product) {
    this._wishlistService.addWishListItem(product);
  }

  removedFromWishList(product: Product) {
    this._wishlistService.removeWishListItem(product);
  }

  // For pagination
  loadData(event: any) {
    event.first = 3
    event.rows = 3;
  }

  openProductDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  handlePriceFilter(event: any) {
    this.priceFrom = Math.round(event.values[0]*100);
    this.priceTo = Math.round(event.values[1]*100);
    this.subs.add(this._productService.getProductsByPrice(this.priceFrom, this.priceTo).subscribe((products: any) => {
      this.products$ = of(products.data.product.map((pr: Product) => ({ ...pr, price: pr.price*0.01 })));
    }))
  }

  addToCart(product: Product) {
    this._cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this._cartService.removeFromCart(product);
  }

  onPriceChange(event: any) {
    this.subs.add(this._productService.getProductsByPrice(this.rangeValues[0], this.rangeValues[1]).subscribe((products: any) => {
      this.products$ = of(products.data.product);
    }))
  }

  onSortChange(event: any) {
    this.subs.add(this._productService.getProducts(event.value).subscribe((products: any) => {
      this.products$ = of(products.data.product.map((pr: Product) => ({ ...pr, price: pr.price*0.01 })));
    }))

  }

  ngOnDestroy() {
    this.subs?.dispose()
  }

}
