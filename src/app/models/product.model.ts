import { Image } from './image.model';
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

    productOptions: string = "";

    Comments: Comment[] = new Array();
}