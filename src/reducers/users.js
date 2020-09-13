import {SET_USERS} from '../actions/actiontypes';

export default function users(state = {}, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                ...action.users,
            }
        default:
            return state
    }
};