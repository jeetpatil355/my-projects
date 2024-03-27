import * as React from 'react';
import AppBar from '@mui/material/AppBar';


const Search = ({text,handleChange, title, field}) => {
  return (
    <AppBar position="static" color="transparent" style={{ boxShadow: "none" }}>
      <div className='d-flex mt-4 justify-content-between align-items-center mb-4'>
        <h3 className='mx-4'>{title}</h3>
        <input onChange={(e)=> handleChange(e)} value={text} className="form-control w-50 h-50 mx-4" type="text" placeholder={field} aria-label="default input example" />
      </div>
      <hr />
    </AppBar>
  );
}


export default Search
