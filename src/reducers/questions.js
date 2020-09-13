import {SET_QUESTIONS, ADD_NEW_QUESTION} from '../actions/actiontypes';

export default function questions(state = {}, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
            case ADD_NEW_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        default:
            return state
    }
};