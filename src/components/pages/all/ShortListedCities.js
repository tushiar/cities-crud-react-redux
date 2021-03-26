import React from 'react'
import Table from '../../ui/Table'
import {useDispatch, useSelector} from 'react-redux'
import {removeShortlisted} from '../../../store/action'


const ShortListedCities = ()=> {
    const dispatch = useDispatch()
    const shortListCitiesList = useSelector((state)=> state.shortListCities)
    
    const onDeleteHandler =(id) =>{
        dispatch(removeShortlisted(id))
    } 
    
    let shortListCitiesData =<h3>No Shortlisted Cities Found</h3>
    if(shortListCitiesList.length>0){
        shortListCitiesData =  <Table data={shortListCitiesList} onDelete ={onDeleteHandler} /> 
    }
    return (
        <div>
          {shortListCitiesData}
        </div>
    )
}

export default ShortListedCities
