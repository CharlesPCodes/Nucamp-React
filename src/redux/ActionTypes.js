import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites';
export const ADD_COMMENT = "ADD_COMMENT";
export const CAMPSITES_LOADING = 'CAMPSITES_LOADING';
export const CAMPSITES_FAILED = 'CAMPSITES_FAILED';
export const ADD_CAMPSITES = 'ADD_CAMPSITES';



export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});



export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId : campsiteId,
        rating: rating,
        author: author,
        text: text
    }
})