import $ from 'jquery';
import {IKeyValue} from "../utils/IKeyValue";

export interface FormFields {
    type: string;
    id: string;
    name: string;
    label?: string;
    required?: boolean;
    options?: any[];
}

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

abstract class FormComponent<T> extends DataComponent implements IComponent {
    protected form: JQuery<HTMLFormElement>;
    protected btnNew: JQuery<HTMLInputElement>;

    constructor() {
        super();
        this.form = $('<form></form>');
        this.btnNew = $('<button></button>');
    }

    abstract getFormData(): T;

    abstract getFormFields(): FormFields[];

    abstract create(data: T): Promise<T>;

    abstract update(id: string, data: T): Promise<T>;

    reset() {
        this.form.trigger('reset');
    }

    async handleSubmit(event: Event): Promise<T> {
        event.preventDefault();
        const id = this.form.find('#id').val();
        if (id) {
            return await this.update(id as string, this.getFormData());
        }
        return await this.create(this.getFormData());
    }

    protected getFormValues(): IKeyValue {
        const data: IKeyValue = {};
        const array = this.form.serializeArray();
        array.forEach(field => {
            data[field.name] = field.value;
        });
        return data;
    }

    protected renderForm(fields: FormFields[]): JQuery<HTMLElement> {
        this.form.empty();
        fields.forEach(field => {
            const divRow = $('<div class="row mb-3"></div>');
            const label = $(`<label class="col-sm-2 col-form-label" for="${field.id}">${field.label}</label>`);
            const divCol = $('<div class="col-sm-10"></div>');
            let input: JQuery<HTMLElement>;
            switch (field.type) {
                case 'select':
                    input = $('<select class="form-control" id="' + field.id + '" name="' + field.name + '"></select>');
                    field.options?.forEach((option: { label: string; value: string; }) => {
                        input.append($(`<option value="${option.value}">${option.label}</option>`));
                    });
                    break;
                case 'textarea':
                    input = $(`<textarea class="form-control" id="${field.id}" name="${field.name}"></textarea>`);
                    break;
                case 'decimal':
                    input = $(`<input class="form-control" type="number" id="${field.id}" name="${field.name}" autocomplete="off" step="0.01" min="0">`);
                    break;
                default:
                    input = $(`<input class="form-control" type="${field.type}" id="${field.id}" name="${field.name}" autocomplete="off">`);
                    break;
            }

            if (field.required) {
                input.prop('required', true);
            }

            divCol.append(input);
            if (field.type !== 'hidden') {
                divRow.append(label);
            }
            divRow.append(divCol);
            this.form.append(divRow);
        });

        const btnRow = $('<div class="row"></div>');
        const btnGroup = $('<div class="btn-group"></div>');
        const btnNew = $('<button class="btn btn-secondary visually-hidden btn-new" type="reset">Novo</button>');
        const btnSave = $('<button class="btn btn-primary" type="submit">Salvar</button>');
        btnGroup.append(btnNew);
        btnGroup.append(btnSave);
        btnRow.append(btnGroup);
        this.form.append(btnRow);
        return this.form;
    }


    render(): Promise<JQuery<HTMLElement>> {
        this.renderForm(this.getFormFields());
        return new Promise<JQuery<HTMLElement>>(resolve => {
            this.btnNew = this.form.find('button.btn-new');
            this.form.on('submit', this.handleSubmit.bind(this));
            this.btnNew.on('click', this.reset.bind(this));
            if (this.data.id) {
                this.fillForm(this.data);
            }
            resolve(this.form);
        });
    }

    protected fillForm(data: any) {
        if (data) {
            for (const key in data) {
                const input = this.form.find(`[name="${key}"]`);
                if (input.length) {
                    input.val(data[key]);
                }
            }
            this.btnNew.removeClass('visually-hidden');
        }
    }
}


export default FormComponent;