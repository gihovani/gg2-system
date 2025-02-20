import EventManager from '../utils/EventManager';
import Product from "../models/Product";
import ProductForm from "../components/ProductForm";
import {onScreenSetContent} from "./screen";
import ProductList from "../components/ProductList";

const goToList = (product: Product) => {
    onScreenSetContent.trigger('success', new ProductList());
};
export const onProductSelected = new EventManager((product: Product) => {
    const form = new ProductForm();
    form.setData(product);
    onScreenSetContent.trigger('success', form);
});
export const onProductCreated = new EventManager(goToList);
export const onProductUpdated = new EventManager(goToList);
export const onProductDeleted = new EventManager();
export const onProductListLoaded = new EventManager();

