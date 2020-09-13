import {SET_AUTHED_USER} from './actiontypes';

export const setAuthedUser = (id) => {
    return {
        type:SET_AUTHED_USER,
        id
    }
}
