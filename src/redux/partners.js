import * as ActionTypes from './ActionTypes';

// pass the following defaults into Partners for the reducer
export const Partners =(state={
    isLoading: true,
    errMess: null,
    partners: []
} ,action) =>{
    switch(action.type){
        // if adding partners then return the following
        case ActionTypes.ADD_PARTNERS:
            return{...state, isLoading:false, errMess:null, partners: action.payload}
            // if loading then return the following
        case ActionTypes.PARTNERS_LOADING:
            return{...state, isLoading: true, errMess: null, partners: [] }
            // if failed the return the following
        case ActionTypes.PARTNERS_FAILED:
                return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}