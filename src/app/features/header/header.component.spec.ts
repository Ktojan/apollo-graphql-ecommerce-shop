import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { WishlistService } from '../../shared/wishlist.service';
import { CartService } from '../../shared/cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { initialProds } from '../products/products.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let wishlistServiceSpy: jasmine.SpyObj<WishlistService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const wishlistSpy = jasmine.createSpyObj('WishlistService', ['getWishListItems']);
    const cartSpy = jasmine.createSpyObj('CartService', ['getCartItems']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: WishlistService, useValue: wishlistSpy },
        { provide: CartService, useValue: cartSpy },
        { provide: Router, useValue: routerSpyObj }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    wishlistServiceSpy = TestBed.inject(WishlistService) as jasmine.SpyObj<WishlistService>;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    wishlistServiceSpy.getWishListItems.and.returnValue(of(initialProds)); // 3 items
    cartServiceSpy.getCartItems.and.returnValue(of(initialProds.slice(1)));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set wishlist item count on initialization', () => {
    expect(component.wishListItems).toBe('3');
    expect(wishlistServiceSpy.getWishListItems).toHaveBeenCalled();
  });

  it('should set cart item count on initialization', () => {
    expect(component.cartItems).toBe('2');
    expect(cartServiceSpy.getCartItems).toHaveBeenCalled();
  });

  it('should initialize menu items correctly', () => {
    expect(component.items.length).toBe(5);
    expect(component.items[0].label).toBe('Home');
    expect(component.items[1].label).toBe('Products');
    expect(component.items[2].label).toBe('Categories');
    expect(component.items[3].label).toBe('Wishlist');
    expect(component.items[4].label).toBe('Cart');
  });
});
