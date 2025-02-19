export interface IComponent {
    render(): Promise<JQuery<HTMLElement> | HTMLElement>;
}

export abstract class DataComponent implements IComponent {
    protected data: any = {};

    abstract render(): Promise<JQuery<HTMLElement> | HTMLElement>;

    setData(data: any) {
        this.data = data;
    }
}
