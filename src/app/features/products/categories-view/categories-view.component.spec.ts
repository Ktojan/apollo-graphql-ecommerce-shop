import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesViewComponent } from './categories-view.component';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoriesViewComponent', () => {
  let component: CategoriesViewComponent;
  let fixture: ComponentFixture<CategoriesViewComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const productsServiceMock = jasmine.createSpyObj('ProductsService', ['getProductCategories', 'setCategoryFilter']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CategoriesViewComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesViewComponent);
    component = fixture.componentInstance;
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock the getProductCategories method to return a fake observable
    productsServiceSpy.getProductCategories.and.returnValue(of({ data: { category: ['Electronics', 'Home'] }}) as Observable<any>);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProductCategories on initialization and set categories', () => {
    expect(productsServiceSpy.getProductCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(['Electronics', 'Home']);
  });

  it('should initialize menu items and home correctly', () => {
    expect(component.items).toEqual([{ label: 'Categories', routerLink: '/categories' }]);
    expect(component.home).toEqual({ icon: 'pi pi-home', routerLink: '/home' });
  });

  it('should set category filter and navigate to products page with correct extras', () => {
    const categoryName = 'Electronics';
    const expectedNavigationExtras = {
      state: {
        filters: categoryName
      }
    };
    component.openProductsPage(categoryName);

    expect(productsServiceSpy.setCategoryFilter).toHaveBeenCalledWith(categoryName);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products/search'], expectedNavigationExtras);
  });
});
