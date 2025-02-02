import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingComponent } from './shipping.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
