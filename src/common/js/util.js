var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd hh:mm:ss';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    //获取连接参数
    getQueryStringByName: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        let context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    getQueryStringByString:function(str){
         let r = window.location.href;
         console.log(r)
    },
    //获取cookie
    getCookie:function(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i=0; i<ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //时间戳转换
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            let matchs1 = pattern.match(SIGN_REGEXP);
            let matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                let _date = new Date(1970, 0, 1);
                for (let i = 0; i < matchs1.length; i++) {
                    let _int = parseInt(matchs2[i]);
                    let sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    //获取当前时间
    setRequestTime: function(){
      let newTimestamp = new Date().getTime();
      let requestTime = parseInt(newTimestamp/1000);
      return requestTime;
    },
    //设置合并请求参数
    setRequestParams: function(apiParams,params){
      let requestObj = Object.assign(apiParams,params);
       console.log('requestObj',requestObj); 
       console.log('requestObj',requestObj); 
       //console.log('params',JSON.stringify(params)); 
      let requestParams = '';
      for(let item in requestObj){
          if(requestObj[item] == null){
              delete requestObj[item];
          } 
      }
      for(let item in requestObj){
        requestParams += `${item}=${requestObj[item]}&`;
      }
      requestParams = requestParams.substring(0,requestParams.length-1);
      console.log('requestParams',requestParams); 
      return requestParams;
    },
    //1.对象按照key排序
    objKeySort: function(apiParams,params) { 
        var arys = Object.assign(apiParams,params);
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newkey = Object.keys(arys).sort();　　 
        //console.log('newkey='+newkey);
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for(var i = 0; i < newkey.length; i++) {
            //遍历newkey数组
            newObj[newkey[i]] = arys[newkey[i]]; 
            //向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj; //返回排好序的新对象
    },
    //2.合并参数
    setParamsString:function(params){
        let requestParams = '';
        for(let item in params){
           if(params[item] == null){
              delete params[item];
           } 
        }
        for(let item in params){
            requestParams += `${item}=${params[item]}&`;
        }
        requestParams = requestParams.substring(0,requestParams.length-1);
        //console.log('requestParams',requestParams); 
        return requestParams;
    },
    //3.参数编码
    /*urldecode: function(encodedString){
        var output = encodedString;
        var binVal, thisString;
        var myregexp = /(%[^%]{2})/;
        function utf8to16(str){
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while(i < len) 
            {
                c = str.charCodeAt(i++);
                switch(c >> 4)
                { 
                    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    out += str.charAt(i-1);
                    break;
                    case 12: case 13:
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                    case 14:
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                    break;
                }
            }
            return out;
        }
        while((match = myregexp.exec(output)) != null
                    && match.length > 1
                    && match[1] != '')
        {
            binVal = parseInt(match[1].substr(1),16);
            thisString = String.fromCharCode(binVal);
            output = output.replace(match[1], thisString);
        }
        
        //output = utf8to16(output);
        output = output.replace(/\\+/g, " ");
        output = utf8to16(output);
        return output;
    }*/

};
