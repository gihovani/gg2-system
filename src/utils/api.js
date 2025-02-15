const api = {
    get: async (url) => {
        return $.get(url);
    },
    post: async (url, data) => {
        return $.post(url, data);
    },
    put: async (url, data) => {
        return $.post(url, data);
    },
    delete: async (url) => {
        return $.ajax({
            url: url,
            type: 'DELETE'
        });
    }
};

export default api;