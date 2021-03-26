import {ADD_CITIES_FAILED, ADD_CITIES_SUCCESS, START_ADD_CITIES, ADD_NEW_CITY, DELETE_CITY, SHORTLIST_CITY,REMOVE_SHORTLISTED } from "./index";

const initialData = {
  cities: [],
  shortListCities: [],
  loading : false,
  error : null
};

const reducer = (state = initialData, action) => {
  switch (action.type) {
    case ADD_CITIES_SUCCESS: {
      return {
        ...state,
        cities: action.cities,
        loading : false
      };
    }
    case START_ADD_CITIES : {
      return {
        ...state,
        loading : true,
        error : null
      }
    }
    case ADD_CITIES_FAILED : {
      return {
        ...state,
        loading : false,
        error : "Some Error"
      }
    }
    case SHORTLIST_CITY: {
        const selectedCity = state.cities.find(city => city.id === action.cityId);
        const updatedShortListCities = [...state.shortListCities];
        updatedShortListCities.push(selectedCity);
        return {
          ...state,
          shortListCities: updatedShortListCities
        };
      }
    case DELETE_CITY:{
        const updatedCity = state.cities.filter(city => city.id !== action.cityId);
        const updatedShortlistCity = state.shortListCities.filter(city => city.id !== action.cityId);
        return {
            ...state,
            cities : updatedCity,
            shortListCities : updatedShortlistCity
        }

    }
    case REMOVE_SHORTLISTED:{
        const updatedShortlistCity = state.shortListCities.filter(city => city.id !== action.cityId);
        return {
            ...state,
            shortListCities : updatedShortlistCity
        }
    }
    case ADD_NEW_CITY : {
      const citiesDataLength = state.cities.length;
      const newCity = {
        State : action.formData.state,
        District : action.formData.district,
        City : action.formData.city,
        id : citiesDataLength
      }
      const updatedCities = [...state.cities];
      updatedCities.unshift(newCity);
      
      return {
        ...state,
        cities : updatedCities
      }
    }
    default:
      return state;
  }
};
export default reducer;
