import EventManager from '../utils/eventManager.js';

export const onCustomerSelected = new EventManager();
export const onCustomerCreated = new EventManager();
export const onCustomerUpdated = new EventManager();
export const onCustomerDeleted = new EventManager();
export const onCustomerListLoaded = new EventManager();