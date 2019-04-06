import { TestBed } from '@angular/core/testing';

import { EditViewCategoryService } from './edit-view-category.service';

describe('EditViewCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditViewCategoryService = TestBed.get(EditViewCategoryService);
    expect(service).toBeTruthy();
  });
});
