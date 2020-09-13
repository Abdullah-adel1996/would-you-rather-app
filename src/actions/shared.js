import {getInitialData} from '../utils/api';
import {setUsers} from '../actions/users';
import {setQuestions} from '../actions/questions';





export const handleInitialData = () => {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions}) => {
                dispatch(setUsers(users))
                dispatch(setQuestions(questions))
            })
    }

}