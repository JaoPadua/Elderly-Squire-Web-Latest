import React from 'react'
import { FormControl, MenuItem, TextField } from '@mui/material'
import {  Controller } from "react-hook-form"
import { addErrorIntoField } from './utils';
import ErrorMessage from "./ErrorMessage";

const SelectStatus = ({label,name,control, errors}) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
      <TextField {...field} 
      {...addErrorIntoField(errors[name])}
      required select label ={label}>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="BEDRIDDEN">BEDRIDDEN</MenuItem>
              <MenuItem value="PHYSICAL INCAPACITY">PHYSICAL INCAPACITY</MenuItem>
              <MenuItem value="MENTAL INCAPACITY">MENTAL INCAPACITY</MenuItem>           
      </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  )
}

export default SelectStatus