import { Image } from './image.model';
import { ProductOption } from './ProductOption.model';

export class Product {

    ID: string;
    name:string;
    priceBefore: string;
    priceAfter : string;
    description : string;
    categoryID : string;
    images : Image[] = new Array();
    ProductOptions : ProductOption[] = new Array();
}