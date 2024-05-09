import React from 'react'
import { FormControl, MenuItem, TextField } from '@mui/material'
import {  Controller } from "react-hook-form"
import { addErrorIntoField } from './utils';
import ErrorMessage from "./ErrorMessage";


const SelectID = ({label,name,control, errors}) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
   <Controller
        name={name}
        control={control}
        render={({ field }) => (
      <TextField {...field} 
      {...addErrorIntoField(errors[name])}
      required select label ={label}>
      <MenuItem value="Passport">Passport ID</MenuItem>
      <MenuItem value="Voters ID">Voter's ID</MenuItem>
      <MenuItem value="SSS ID">SSS ID</MenuItem>
      <MenuItem value="UMID ID">Umid ID</MenuItem>
      <MenuItem value="Barangay Certificate">Barangay Certificate</MenuItem>
      <MenuItem value="PoliceClearance">Police Clearance</MenuItem>
      <MenuItem value="NBI Clearance">NBI Clearance</MenuItem>
      <MenuItem value="National ID">National ID</MenuItem>
      <MenuItem value="Birth Certificate">Birth Certificate</MenuItem>
      </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
  </FormControl>
  )
}

export default SelectID