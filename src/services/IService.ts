import Api from "../utils/Api";

export interface IService {
    url: string;
    api: Api;
}

export abstract class ApiService implements IService {
    readonly url: string;
    readonly api: Api;

    constructor(url: string) {
        this.url = url;
        this.api = new Api();
    }
}
