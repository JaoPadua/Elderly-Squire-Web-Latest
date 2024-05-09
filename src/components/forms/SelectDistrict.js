import React from 'react'
import { FormControl, MenuItem, TextField } from '@mui/material'
import {  Controller } from "react-hook-form"
import { addErrorIntoField } from './utils';
import ErrorMessage from "./ErrorMessage";

const SelectDistrict = ({label,name,control,errors}) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
      <TextField {...field}
      {...addErrorIntoField(errors[name])}
       required select label ={label}>
      <MenuItem value=" 1">District 1 </MenuItem>
      <MenuItem value=" 2">District 2</MenuItem>
      <MenuItem value=" 3">District 3</MenuItem>
      <MenuItem value=" 4">District 4</MenuItem>
      <MenuItem value=" 5">District 5</MenuItem>
      <MenuItem value=" 6">District 6</MenuItem>
      </TextField>
        )}
      />
        {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
  </FormControl>
  )
}

export default SelectDistrict