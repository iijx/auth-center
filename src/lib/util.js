
const resolveValueFromHeaders = (headers, key) => {
    if (!headers || !headers[key]) return '';

    if ( key === 'token') {
        const parts = headers[key].split(' ');
    
        if (parts.length === 2) {
            const scheme = parts[0];
            const token = parts[1];
    
            if (/^Bearer$/i.test(scheme)) {
                return token || '';
            }
        }
        else return '';
    } else {
        return headers[key].trim();
    }
}

const noLoginCheck = (url) => {
    return url.indexOf('/nologin/') !== -1
}

module.exports = {
    resolveValueFromHeaders,
    noLoginCheck,
}