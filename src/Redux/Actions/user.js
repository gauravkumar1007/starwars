import { fetchApi } from '../../Common/api.js';

const SAVE_USER = "SAVE_USER";

export function getUserData(url, successCallback, errorCallback){

    return(dispatch, state)=>{
        fetchApi('GET', url, null, successCallback, errorCallback)
    }
}

export function setUserData(user){
    return { type: SAVE_USER, user };
}