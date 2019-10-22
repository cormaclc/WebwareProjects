class ProjectAPI {
    static get(id, callback) {
        fetch('/api/messages/' + id)
            .then(res => res.json())
            .then(callback);
    }

    static getAll(callback) {
        fetch('/api/messages')
            .then(res => res.json())
            .then(callback);
    }

    static create(message, callback) {
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(callback)
    }

    static remove(id, callback) {
        fetch('/api/messages/' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(callback)
    }
}

export default ProjectAPI;
