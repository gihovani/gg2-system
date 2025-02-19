import $ from 'jquery';
class Api {
    async get(url: string) {
        return $.get(url);
    }

    async post(url: string, data: any) {
        return $.post(url, data);
    }

    async put(url: string, data: any) {
        return $.post(url, data);
    }

    async delete(url: string) {
        return $.ajax({
            url: url,
            type: 'DELETE'
        });
    }
}

export default Api;