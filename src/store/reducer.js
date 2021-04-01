import * as actionsTypes from './actions/actionsTypes';

const initialState = {
    auth: false,
    userName: null,
    userEmail: null,
    error: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.USER_LOGIN:
            return {
                ...state,
                auth : true
            }
        
        case actionsTypes.USER_LOGOUT:
            sessionStorage.removeItem('usrname');
            sessionStorage.removeItem('usremail');
            return {
                    ...state,
                    auth : false
                }
        
        case actionsTypes.USER_DETAILS:
            return {
                ...state,
                userName: action.username,
                userEmail: action.useremail,
                auth: true
            }

        case actionsTypes.ERRORS:
            return {
                ...state,
                error: action.error
            }
    
        default:
            return state;
    }
};

export default reducer;