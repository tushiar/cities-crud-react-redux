import classes from './NewCityForm.module.css'
import React, {useState, useEffect} from 'react'

const NewCityForm = props => {

    const [formData, setFormData] = useState({
        city : "",
        state : "Select State",
        district : "Select District"
    });
    const [error, setError] = useState(false);
    const [filteredDistrictOptions, setFilteredDistrictOptions] = useState([]);
    

    const onChangeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    // console.log(props.cityData)
    const stateList = props.cityData.map(data => data.State) ;
    
    const uniqueStateList = [...new Set(stateList)].sort();
    
    useEffect(() => {
        const filteredDistrictList = props.cityData.filter(data => data.State === formData.state);
        const districtList = filteredDistrictList.map(data => data.District);
        const uniqueDistrictList = [...new Set(districtList)].sort();
        setFilteredDistrictOptions(uniqueDistrictList);
        
    }, [formData.state])
    
    const stateOptions = uniqueStateList.map((data, index) => {
        return (
            <option key={index} value={data}>{data}</option>
        )
    });
    const districtOptions = filteredDistrictOptions.map((data, index) => {
        return (
            <option key={index} value={data}>{data}</option>
        )
    });

    const submitForm = (event) => {
        event.preventDefault();
        if(formData.city.trim().length === 0 || formData.state.trim().length === 0 || formData.district.trim().length === 0 || formData.state === "Select State" || formData.district === "Select District"){
            setError(true);
        }else{
            props.onSubmit(formData)
        }
    }

    return (
        <form onSubmit={submitForm }>
            <h2>Add a new city!</h2>
            <div className={classes.FormControl}>
                <label htmlFor="stateInput">Select your State</label>
                <select id="stateInput" name="state" value={formData.state} onChange={onChangeHandler}>
                    <option value={formData.state}>{formData.state}</option>
                    {stateOptions}
                </select>
            </div>
            {filteredDistrictOptions.length > 0 && <div className={classes.FormControl}>
                <label htmlFor="districtInput">Select your District</label>
                <select id="districtInput" name="district" value={formData.district} onChange={onChangeHandler}>
                    <option value={formData.district}>{formData.district}</option>
                    {districtOptions}
                </select>
            </div>}
            {formData.district !== "Select District" && <div className={classes.FormControl}>
                <label htmlFor="cityInput">City Name</label>
                <input type="text" id="cityInput" name="city" value={formData.city} placeholder ="City" onChange={onChangeHandler} />
            </div>}
            {error && <p style={{color : 'red'}}>Please fill all the details..!</p>}
            <button>Add City</button>
        </form>
    )
}

export default NewCityForm
