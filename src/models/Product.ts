import {IKeyValue} from "../utils/IKeyValue";

class Product {
    public id: string;
    public sku: string;
    public title: string;
    public price: number;
    public description: string;
    public image_link: string;
    public availability: string;
    public brand: string;
    public gtin: string;
    public mpn: string;
    public condition: string;
    public sale_price: number;
    public sale_price_effective_date: string;
    public link: string;
    public shipping_weight: number;
    public product_type: string;
    public identifier_exists: string;
    constructor(data: IKeyValue) {
        this.id = (data.id) ? <string>data.id : '';
        this.sku = <string>data.sku;
        this.title = <string>data.title;
        this.price = <number>data.price;
        this.sale_price = <number>data.sale_price;
        this.sale_price_effective_date = <string>data.sale_price_effective_date;
        this.link = <string>data.link;
        this.shipping_weight = <number>data.shipping_weight;
        this.product_type = <string>data.product_type;
        this.description = <string>data.description;
        this.image_link = <string>data.image_link;
        this.availability = <string>data.availability;
        this.brand = <string>data.brand;
        this.gtin = <string>data.gtin;
        this.mpn = <string>data.mpn;
        this.condition = <string>data.condition;
        this.identifier_exists = <string>data.identifier_exists;
    }
}

export default Product;