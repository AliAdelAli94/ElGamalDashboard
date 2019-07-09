import { OrderProductDTO } from './OrderProductDTO.model';

export class OrderDetailsDTO{

    public ID : string;

    public total? : number;

    public shippingAmount? : number;

    public userID? : string;

    public userName : string;

    public status : string;

    public OrderDetails : OrderProductDTO [] = new Array();

    public Address : string;

    public Phone : string;

    public date : string;
}