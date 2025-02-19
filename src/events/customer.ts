import EventManager from '../utils/EventManager';
import Customer from "../models/Customer";
import CustomerForm from "../components/CustomerForm";
import {onScreenSetContent} from "./screen";
import CustomerList from "../components/CustomerList";

const goToList = (customer: Customer) => {
    onScreenSetContent.trigger('success', new CustomerList());
};
export const onCustomerSelected = new EventManager((customer: Customer) => {
    const form = new CustomerForm();
    form.setData(customer);
    onScreenSetContent.trigger('success', form);
});
export const onCustomerCreated = new EventManager(goToList);
export const onCustomerUpdated = new EventManager(goToList);
export const onCustomerDeleted = new EventManager();
export const onCustomerListLoaded = new EventManager();

