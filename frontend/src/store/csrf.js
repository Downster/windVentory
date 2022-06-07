export async function tokenFetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};



    if (localStorage.getItem('x-access-token')) {
        options.headers['x-access-token'] = localStorage.getItem('x-access-token')
    }
    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    return res;
}

export function restoreCSRF() {
    return tokenFetch('/auth/csrf/restore');
}