import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class EditViewCategoryService {

  EditedCategory : Category;
  constructor() { }
}
