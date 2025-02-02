import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { Apollo } from 'apollo-angular';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
