export function fetchApi(method, url, payload, successCallback, errorCallback){
    console.log(" --------- fetchApi -------")
    const options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    if(method !== 'GET'){
        options.body = JSON.stringify(payload);
    }

    return fetch(url, options)
        .then(response => {
            console.log("fetchApi response -->>",response)
            if(response.status === 200) {
                response.json().then(json => {
                    if(json) {
                        successCallback(json);
                    } else {
                        errorCallback({error:'error while fetching post in category '});
                    }
                });
            } else {
                return Promise.reject('something went wrong!')
            }
        }).catch(err => {
            errorCallback(err);
        });
}