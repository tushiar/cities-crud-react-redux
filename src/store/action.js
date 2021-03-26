import {ADD_CITIES_FAILED, ADD_CITIES_SUCCESS, START_ADD_CITIES, ADD_NEW_CITY, SHORTLIST_CITY, DELETE_CITY, REMOVE_SHORTLISTED} from './index'
import axios from 'axios';

export const startAddCities = () => {
    return {
        type : START_ADD_CITIES
    }
}
export const addCitiesSuccess = (cities) => {
    return {
        type : ADD_CITIES_SUCCESS,
        cities
    }
}
export const addCitiesFailed = () => {
    return {
        type : ADD_CITIES_FAILED
    }
}

export const addCities =()=>{
    return dispatch => {
        dispatch(startAddCities());

        axios.get("https://gist.githubusercontent.com/pratikg117/7ce66c7ade26a94772111334e40b287b/raw/fd5d7109921ca7a461a19ae73bfb71c9696bd139/Assignment%2520Json")
        .then(res=>{
            const updatedCities = res.data.map((city, index)=>{
                    return {
                        id: index,
                        ...city
                    }
                });
            
                dispatch(addCitiesSuccess(updatedCities));
            
        })
        .catch(error => {
            dispatch(addCitiesFailed());
        })

    }
}
export const shortlistCity =(id)=>{
    return{
        type: SHORTLIST_CITY,
        cityId: id
    }
}
export const deleteCity =(id) =>{
    return{
        type: DELETE_CITY,
        cityId:id
    }
}
export const removeShortlisted=(id)=>{
    return {
        type: REMOVE_SHORTLISTED,
        cityId: id
    }
}

export const addNewCity = (formData) => {
    
    return {
        type : ADD_NEW_CITY,
        formData : formData
    }
}