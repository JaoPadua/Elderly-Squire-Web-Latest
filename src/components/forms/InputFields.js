import React from 'react'
import FormControl from "@mui/material/FormControl";
import {  Controller } from "react-hook-form"
import { addErrorIntoField } from './utils';
import ErrorMessage from "./ErrorMessage";
import { Input, TextField } from '@mui/material';



const InputFields = ({ label,required,control,errors }) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
        <Controller
          name="ProofOfValidID"
          control={control}
          render={({ field:{value, onChange,...field} }) => (
            <TextField
              {...field}
              {...addErrorIntoField(errors["ProofOfValidID"])}
              required={required}
              label={label}
              type="file"
              value={value ? value?.fileName :""}
              onChange={(event) => {
                    onChange(event.target.files[0]);
                  }}
              inputProps={{ accept: ".pdf" }}
              variant="outlined"
            />
          )}
        />
      {errors["ProofOfValidID"] ? <ErrorMessage message={errors["ProofOfValidID"].message} /> : null}
    </FormControl>
  )
}

export default InputFields