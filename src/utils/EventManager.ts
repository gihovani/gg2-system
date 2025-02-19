class EventManager {
    private readonly events: any;

    constructor(success: any = null, error: any = null) {
        this.events = {};
        if (!success) {
            success = () => {
            };
        }
        this.on('success', success);
        if (!error) {
            error = (error: any) => {
                const message = (error.responseJSON && error.responseJSON.message) ? error.responseJSON.message : 'Ocorreu um erro inesperado!';
                alert(message);
            }
        }
        this.on('error', error);
    }

    on(eventName: string, callback: any) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    trigger(eventName: string, data: any) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((callback: any) => {
                callback(data);
            });
        }
    }
}

export default EventManager;