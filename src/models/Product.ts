import {IKeyValue} from "../utils/IKeyValue";

class Product {
    public id: string;
    public title: string;
    public price: number;
    public description: string;
    public image_link: string;
    public availability: string;
    public brand: string;
    public gtin: string;
    public mpn: string;
    public condition: string;

    constructor(data: IKeyValue) {
        this.id = (data.id) ? <string>data.id : '';
        this.title = <string>data.title;
        this.price = <number>data.price;
        this.description = <string>data.description;
        this.image_link = <string>data.image_link;
        this.availability = <string>data.availability;
        this.brand = <string>data.brand;
        this.gtin = <string>data.gtin;
        this.mpn = <string>data.mpn;
        this.condition = <string>data.condition;
    }
}

export default Product;