import { TestBed } from '@angular/core/testing';

import { DatabaseManipulationService } from './database-manipulation.service';

describe('DatabaseManibulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseManipulationService = TestBed.get(DatabaseManipulationService);
    expect(service).toBeTruthy();
  });
});
