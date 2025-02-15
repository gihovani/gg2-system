class EventManager {
    constructor() {
        this.events = {
            'error': (error) => {
                console.error('Error:', error);
            }
        };
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