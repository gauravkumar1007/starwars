import { fetchApi } from '../../Common/api.js';

export function getPlanetsData(url, successCallback, errorCallback){

    return(dispatch, state)=>{
        fetchApi('GET', url, null, successCallback, errorCallback)
    }
}