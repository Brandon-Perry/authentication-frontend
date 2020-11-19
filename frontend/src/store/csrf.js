import Cookies from 'js-cookie';

export async function fetch(url, options={}) {
    //set options.method to 'GET' if there is no method'
    options.method = options.method || 'GET';
    //set options.header to an empty object if there is no header
    options.headers = options.headers || {};

    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "CSRF-TOKEN" header to the value of the 
    // "XSRF-TOKEN" cookie
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    const res = await window.fetch(url, options);

    // if the response's body is JSON, then parse the JSON body and set it to a
    // key of `data` on the response

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        res.data = data
    }

    if (res.status >= 400) throw res

    return res
}

export function restoreCSRF() {
    return fetch('/api/csrf/restore');
}