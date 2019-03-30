import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class EditViewProductService {

  EditedProduct : Product;
  constructor() { }
}
