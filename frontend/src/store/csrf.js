export async function tokenFetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};
    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the 
    // "XSRF-TOKEN" cookie
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