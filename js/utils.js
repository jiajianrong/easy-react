import 'whatwg-fetch';


function formatUrl(url, params) {
    let a = document.createElement('a');
    a.href = url;
    let urlFormatted = new URL(a.href);
    Object
        .keys(params)
        .forEach( key => urlFormatted.searchParams.append(key, params[key]) );
    return urlFormatted;
}


function fetchJson(url, params) {
    let urlFormatted = formatUrl(url, params);
    return fetch(url).then( res => res.json() );
}


export { formatUrl, fetchJson }
