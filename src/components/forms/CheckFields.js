import React, {useState} from 'react'
import { Checkbox,FormControlLabel,Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import {  Controller } from "react-hook-form"
//import { addErrorIntoField } from "../../components/forms/utils";
import ErrorMessage from "./ErrorMessage";


const CheckFields = ({name,control,errors}) => {


  return (

    <>
   <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
          control={<Checkbox {...field} checked={field['value'] ?? false} />}
          label={
        <Typography>
          I have read and agree to the{' '}
          <a href="https://privacy.gov.ph/data-privacy-act/#w1" target="_blank" rel="noopener noreferrer">
            Privacy Policy.
          </a>
        </Typography>
      }
      
          />
        )}
        
      />
   {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
  </>
    
  )
}

export default CheckFields