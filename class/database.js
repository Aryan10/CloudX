const {readFileSync, writeFileSync} = require('fs');

function _read(path) {
    try {
        const data = readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('READ ERROR: ', error);
        return [];
    }
}

function _write(path, data) {
    try {
        writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('WRITE ERROR: ', error);
    }
}

function fetch(path) {
    return _read(path);
}

function find(path, id) {
    return (id in _read(path));
}

function get(path, id) {
    return _read(path)[id];
}

function set(path, id, val) {
    let data = _read(path);
    data[id] = val;
    _write(path, data);
}

function remove(path, id) {
    delete _read(path)[id];
}

module.exports = {
    _read,
    _write,
    fetch,
    find,
    get,
    set,
    remove
};
