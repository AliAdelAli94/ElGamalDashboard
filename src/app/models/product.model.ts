import { Image } from './image.model';
import { ProductOption } from './ProductOption.model';
import { Comment } from './comment.model';

export class Product {

    ID: string;

    name: string;

    priceBefore: string;

    priceAfter: string;

    description: string;

    categoryID: string;

    parentCategoryName: string;

    images: Image[] = new Array();

    ProductOptions: ProductOption[] = new Array();

    Comments: Comment[] = new Array();
}