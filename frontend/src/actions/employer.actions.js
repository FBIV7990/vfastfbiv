import {employerConstants} from '../constants'
import { employerService } from '../services';
import { alertActions } from './index';
import {ToastsContainer, ToastsStore} from 'react-toasts';

export const employerActions = {        
    getAll,
    getById,  
    clear,
    create  ,
    getRates ,
    editEmployer,
    addRates,
    updateRates,
};



function addRates(data) {

    return dispatch => {
        dispatch(request());

        employerService.add_rates(data)
            .then(
                result => { 
                    if(result.success)
                   {   
                         dispatch(success(result));                             
                         dispatch(alertActions.success(result.message));
                         ToastsStore.success('Rates added!');                       
                   }
                    else { 
                         dispatch(failure(result.message));
                         dispatch(alertActions.error(result.message));                        
                        };                                             
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));                  
                }
            );
    };

    function request() { return { type: employerConstants.ADD_RATES_REQUEST } }
    function success(employer) { return { type: employerConstants.ADD_RATES_SUCCESS, employer } }
    function failure(error) { return { type: employerConstants.ADD_RATES_FAILURE, error } }
}

function updateRates(data) {

    return dispatch => {
        dispatch(request());

        employerService.update_rates(data)
            .then(
                result => { 
                    if(result.success)
                   {   
                         dispatch(success(result));                             
                         dispatch(alertActions.success(result.message));
                         ToastsStore.success('Rates updated!');                       
                   }
                    else { 
                         dispatch(failure(result.message));
                         dispatch(alertActions.error(result.message));                        
                        };                                             
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));                  
                }
            );
    };

    function request() { return { type: employerConstants.UPDATE_RATES_REQUEST } }
    function success(employer) { return { type: employerConstants.UPDATE_RATES_SUCCESS, employer } }
    function failure(error) { return { type: employerConstants.UPDATE_RATES_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        employerService.getAll()
            .then(
                data =>
                 {       
                      dispatch(success(data));
                     dispatch(alertActions.success('Employers loaded.')) ;
                     ToastsStore.success("Employers loaded.!");                 
            },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: employerConstants.GET_ALL_REQUEST } }
    function success(data) { return { type: employerConstants.GET_ALL_SUCCESS, employers:data.users } }
    function failure(error) { return { type: employerConstants.GET_ALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
    
        dispatch(request());

        employerService.getById(id)
            .then(
                data=> {
                    if(data.success)                   
                     dispatch(success(data.user))},
                     error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employerConstants.GET_BY_ID_REQUEST} }
    function success(user) { return { type: employerConstants.GET_BY_ID_SUCCESS, user } }
    function failure(error) { return { type: employerConstants.GET_BY_ID_FAILURE, error } }
}


function getRates(id) {

    return dispatch => {
        dispatch(request());

        employerService.getRates(id)
            .then(
                result => { 
                    if(result.success)
                   {   
                         dispatch(success(result.rates));                             
                       dispatch(alertActions.success("Employer rates"));
                                                       
                   }
                    else { 
                         dispatch(failure(result.message));
                         dispatch(alertActions.error(result.message));                        
                        };                                             
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));                  
                }
            );
    };

    function request() { return { type: employerConstants.GET_RATES_BY_ID_REQUEST } }
    function success(rates) { return { type: employerConstants.GET_RATES_BY_ID_SUCCESS, rates } }
    function failure(error) { return { type: employerConstants.GET_RATES_BY_ID_FAILURE, error } }
}
function clear() {
    return { type: employerConstants.CLEAR };
}

function create(data) {
    console.log('logging create action:',data)
    return dispatch => {
        dispatch(request());
        employerService.create(data)
            .then(
                employer => {                    
                      dispatch(success(employer));
                      dispatch(alertActions.success(employer.message))
                     ToastsStore.success("Employer registered succesfully!");                  
            },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                    ToastsStore.success("error!"); 
                }
            );
    };

    function request() { return { type: employerConstants.ADD_EMPLOYER_REQUEST } }
    function success(employer) { return { type: employerConstants.ADD_EMPLOYER_SUCCESS,employer } }
    function failure(error) { return { type: employerConstants.ADD_EMPLOYER_FAILURE, error } }
}


function editEmployer(data) {
    return dispatch => {
        dispatch(request());

        employerService.editEmployer(data)
            .then(
                employer => {                      

                      dispatch(success(employer));
                     dispatch(alertActions.success('Employer Profile Edited!'));
                     ToastsStore.success("Employer Profile Edited!");              
            },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                    // ToastsStore.success("Verifiers loaded.!");  
                }
            );
    };

    function request() { return { type: employerConstants.EDIT_EMPLOYER_REQUEST } }
    function success(employer) { return { type: employerConstants.EDIT_EMPLOYER_SUCCESS, employer } }
    function failure(error) { return { type: employerConstants.EDIT_EMPLOYER_FAILURE, error } }
}