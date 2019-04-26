
var serializeJSON=(data)=> {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
}
var httpRequest = (url,data) => {
    var fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: serializeJSON(data)
    }
  let promise = new Promise ((resolve,reject)=> {
    fetch(url,fetchOptions)
    .then((response)=>response.text())
    .then((responseText) => {
        console.log(responseText)
        return JSON.parse(responseText)
    })
    .then((responseJson) => {
        if (responseJson.server) {
            resolve(responseJson.data)
        } else {
            reject(responseJson.msg);
        }
    }).catch(function (e) {
    console.log(e);
    reject('网络异常:' + e);
}).done();
})
return promise;
}

 export var getNew = (url) =>{
    let fetchPromise = new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then((responseText) => {console.log('text',responseText);return JSON.parse(responseText)})
            .then(responseJson => {
                console.log('json',responseJson)
                // if (responseJson.result == "200") {
                //     resolve(responseJson.data);
                // } else {
                //     reject('网络异常:' + responseJson.result);
                // }
                if(responseJson.server){
                    resolve(responseJson);
                } else {
                    reject('网络异常!')
                }
            }).catch(function (e) {
            reject('异常:' + e);
        }).done();
    });
    return fetchPromise;
}

export default httpRequest;