import { FormControl, MenuItem, TextField } from '@mui/material'
import React from 'react'
import {  Controller } from "react-hook-form"
import { addErrorIntoField } from './utils';
import ErrorMessage from "./ErrorMessage";


const SelectGenderFields = ({label,name,control,errors}) => {


  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
      <TextField {...field} 
      {...addErrorIntoField(errors[name])}
      required select label ={label}>
      <MenuItem value="Male">Male</MenuItem>
      <MenuItem value="Female">Female</MenuItem>
      <MenuItem value="Others">Others</MenuItem>
      </TextField>
        )}
      />
        {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  )
}

export default SelectGenderFields