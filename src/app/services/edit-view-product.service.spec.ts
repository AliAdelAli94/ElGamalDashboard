import { TestBed } from '@angular/core/testing';

import { EditViewProductService } from './edit-view-product.service';

describe('EditViewProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditViewProductService = TestBed.get(EditViewProductService);
    expect(service).toBeTruthy();
  });
});
