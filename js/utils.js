import 'whatwg-fetch';


function formatUrl(url, params) {
    let a = document.createElement('a');
    a.href = url;
    let urlFormatted = new URL(a.href);
    
    var paramArr = Object.keys(params).map( key => {
        return key + '=' + params[key]
    } );
    
    return urlFormatted + '?' + paramArr.join('&');
    
    // 2017-1-18 fallback to workaround lower-version-browsers
    // Object.keys(params).forEach( key => urlFormatted.searchParams.append(key, params[key]) );
    // return urlFormatted;
}


function fetchJson(url, params) {
    let urlFormatted = formatUrl(url, params);
    return fetch(urlFormatted,{credentials: 'same-origin'}).then( res => res.json() );
}








function json2query(obj, splitter) {
    return Object
        .getOwnPropertyNames(obj)
        .map(function(k){
            return encode(k) + '=' + encode(obj[k]);
        })
        .join(splitter||'&');
}



/**
 * Note：引用覆盖和更新
 */
function mixin() {
    var arr = Array.prototype.slice.call(arguments,0);
    
    return arr.reduce(function(prev, curr){
        for(var k in curr){
            prev[k]=curr[k];
        }
        return prev;
    });
}



/**
 * Return formatted date string.
 * 如果无形参则返回当前年月日，如 2016-09-10
 * @param {Object} d
 * @param {Object} f
 */
function stringifyDate(d,f) {
    var _d,
        _f,
        _DEFAULT_DATE = new Date(),
        _DEFAULT_FORMATTER = '{yyyy}-{MM}-{dd}';
    
    if (arguments.length>=2) {
        _d = d;
        _f = f;
    } else if (arguments.length==0) {
        _d = _DEFAULT_DATE;
        _f = _DEFAULT_FORMATTER;
    } else {
        var _p1 = arguments[0],
            _p1HasBrace = _p1.indexOf && _p1.indexOf('{')!=-1;
        
        _d = _p1HasBrace ? _DEFAULT_DATE : _p1;
        _f = _p1HasBrace ? _p1 : _DEFAULT_FORMATTER;
    }
    
    return _d.format(_f);
}





Date.prototype.format=function(){
    var _0=function(){
        return this<10?("0"+this):this;
    };
    return function(s){
        var map={
            y:this.getFullYear(),
            M:_0.call(this.getMonth()+1),
            d:_0.call(this.getDate()),
            H:_0.call(this.getHours()),
            m:_0.call(this.getMinutes()),
            s:_0.call(this.getSeconds())};
        return (s||"{y}-{M}-{d} {H}:{m}:{s}").replace( /{(y|M|d|H|m|s)+}/g, function(s,t){
            return map[t];
        });
    };
}();


Date.prototype.ago=function(long,ago){
    if(!long)return this;
    ago=!/day|week|month|year/i.test(ago)?"day":ago.toLowerCase();
    if(ago=="day")return new Date(this.getTime()-long*86400000);
    if(ago=="week")return new Date(this.getTime()-long*7*86400000);
    
    var y=this.getFullYear(),
        M=this.getMonth()+1,
        d=this.getDate(),
        time=this.getHours()+":"+this.getMinutes()+":"+this.getSeconds();
        
    if(ago=="month"){
        M-=long;
        y+=parseInt(M/12);
        M=M%12;
        if(M<=0){
            M=12+M;
            y--;
        }
    }else if(ago=="year"){
        y-=long;
    }
    var date=new Date(M+"/"+d+"/"+y+" "+time);
    
    
    return date.getDate()!=d ? 
        new Date((M+1)+"/1/"+y+" "+time).ago(1) : date;
};




export { formatUrl, fetchJson, json2query, mixin, stringifyDate }
