import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistViewComponent } from './wishlist-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageService } from 'primeng/api';

describe('WishlistViewComponent', () => {
  let component: WishlistViewComponent;
  let fixture: ComponentFixture<WishlistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishlistViewComponent],
      providers: [ MessageService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WishlistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
