import {SET_QUESTIONS, ADD_NEW_QUESTION} from './actiontypes';
import {saveQuestionAnswer, saveQuestion} from '../utils/api';
import {handleInitialData} from "./shared";
import {hideLoading, showLoading} from 'react-redux-loading'



export const setQuestions = (questions) => {
    return {
        type:SET_QUESTIONS,
        questions
    }
}
export const addNewQuestion = (question) => {
    return {
        type: ADD_NEW_QUESTION,
        question
    }
}
export const handleQuestionAnswer = (qid, answer) => {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return saveQuestionAnswer(authedUser, qid, answer)
            .then(() => {
                dispatch(handleInitialData()) 
                dispatch(hideLoading())           
            })
    }
    

}

export const handleAddNewQuestion = (optionOneText, optionTwoText) => {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then(() => {
                dispatch(handleInitialData())
                dispatch(hideLoading())
            })
    }
}

