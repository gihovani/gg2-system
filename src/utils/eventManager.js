class EventManager {
    constructor() {
        this.events = {};
        this.on('error', (error) => {
            const message = (error.responseJSON && error.responseJSON.message) ? error.responseJSON.message : 'Ocorreu um erro inesperado!';
            alert(message);
        });
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    trigger(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }
}

export const onCustomerSelected = new EventManager();
export const onCustomerCreated = new EventManager();
export const onCustomerUpdated = new EventManager();
export const onCustomerDeleted = new EventManager();
export const onCustomerListLoaded = new EventManager();