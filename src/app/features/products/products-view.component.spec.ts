import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewComponent } from './products-view.component';
import { Apollo } from 'apollo-angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/shared/cart.service';
import { WishlistService } from 'src/app/shared/wishlist.service';
import { ProductsService } from './products.service';

xdescribe('ProductsViewComponent', () => {
  let component: ProductsViewComponent;
  let fixture: ComponentFixture<ProductsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsViewComponent],
      providers: [Apollo, ActivatedRoute, Router, MessageService, WishlistService, ProductsService, CartService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
