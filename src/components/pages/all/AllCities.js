import React, {useState, useEffect} from 'react'

import Table from '../../ui/Table'
import {useDispatch, useSelector} from 'react-redux'
import {addCities, addNewCity, shortlistCity, deleteCity} from '../../../store/action'
import Modal from "../../ui/Modal";
import NewCityForm from "../NewCityForm";

const AllCities = ()=> {
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState({
        status : false,
        action : null
    });
    const dispatch = useDispatch()
    const citiesList = useSelector((state)=> state.cities)
    const citiesLoading = useSelector((state)=> state.loading)
    const citiesError = useSelector((state)=> state.error)

    
    useEffect(()=> {
        if(citiesList.length === 0){
            dispatch(addCities())
        } 
    },[]);
    
    const onShortListHandler =(id)=>{
        dispatch(shortlistCity(id));
        setShowSuccess({status : true, action : 's'});
        setTimeout(()=> setShowSuccess({status : false, action : null}), 1000)
    }
    const onDeleteHandler =(id)=>{
        dispatch(deleteCity(id));
        setShowSuccess({status : true, action : 'd'});
        setTimeout(()=> setShowSuccess({status : false, action : null}), 1000)
    }
    const addCityHandler = () =>{
        setShowForm(true);
    }
    const closeFormHandler = () => {
        setShowForm(false);
    }
    
    const onSubmitHandler = (formData) => {
        
        closeFormHandler();
        dispatch(addNewCity(formData));
        
    }
    let citiesData =<h3>No Cities Found</h3>
    // console.log(citiesList)
    if(citiesList && citiesList.length>0){
        citiesData =  <Table data={citiesList} onShortList={onShortListHandler} onDelete={onDeleteHandler} addCity={addCityHandler} /> 
    }
    if(citiesLoading){
        citiesData = <h3>Loading.....</h3>
    }
    if(citiesError){
        citiesData=<h3>Something went wrong!!!</h3>
    }
    return (
        <div>
            {showSuccess.status && <Modal>{showSuccess.action === 's' ? 'Shortlisted' : 'Deleted'} Successfully...</Modal>}
            {showForm && <Modal close={closeFormHandler}>
                <NewCityForm onSubmit={onSubmitHandler} cityData={citiesList} />
            </Modal>}
          {citiesData}
        </div>
    )
}

export default AllCities

