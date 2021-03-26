import React, { useState, useEffect } from "react";
import classes from "./Table.module.css";


const Table = (props) => {
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    city: "",
  });
  const [shouldFilter, setShouldFilter] = useState(false);

  useEffect(() => {
    
    if (
      filters.state === "" &&
      filters.district === "" &&
      filters.city === ""
    ) {
      // console.log(false);
      setShouldFilter(false);
    } else {
      // console.log(true);
      setShouldFilter(true);
    }
  }, [filters]);

  const onChangeHandler = (event) => {
    const name = event.target.id;
    const value = event.target.value;

    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let filteredCityData = [...props.data];
  if (shouldFilter) {
    filteredCityData = [...props.data].filter((data) => {
      if (filters.state.length > 0 && !data.State.toLowerCase().includes(filters.state.toLowerCase())) return false;

      if (filters.district.length > 0 && !data.District.toLowerCase().includes(filters.district.toLowerCase()) ) return false;

      if (filters.city.length > 0 &&!data.City.toLowerCase().includes(filters.city.toLowerCase()) ) return false;  


      return true;
    });
  }
  // console.log(filteredCityData);
  const cityData = filteredCityData.map((data) => {
    
    return (
      <tr key={data.id}>
        <td>{data.State}</td>
        <td>{data.District}</td>
        <td>{data.City}</td>
        <td>
          <span>
            {props.onShortList && <button onClick={() => props.onShortList(data.id)}>Shortlist</button>}
            &nbsp; &nbsp;
            {props.onDelete && <button onClick={() => props.onDelete(data.id)}> Delete</button>}
          </span>
        </td>
      </tr>
    );
  });

  return (
    <table className={classes.Table}>
      <thead>
        <tr>
          <th>State</th>
          <th>District</th>
          <th>City</th>
          <th>Action</th>
        </tr>
        <tr>
          <th>
            <input
              type="text"
              id="state"
              placeholder="State"
              value={filters.state}
              onChange={onChangeHandler}
              className={classes.Input}
            />
          </th>
          <th>
            <input
              type="text"
              id="district"
              placeholder="District"
              value={filters.district}
              onChange={onChangeHandler}
              className={classes.Input}
            />
          </th>
          <th>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={filters.city}
              onChange={onChangeHandler}
              className={classes.Input}
            />
          </th>
          <th>{props.addCity && <button onClick={props.addCity}>Add City</button>}</th>
        </tr>
      </thead>
      <tbody>{cityData}</tbody>
    </table>
  );
};

export default Table;
