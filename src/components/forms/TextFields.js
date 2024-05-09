import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {  Controller } from "react-hook-form"
import { addErrorIntoField } from './utils';
import ErrorMessage from "./ErrorMessage";


const TextFields = ({ label, inputProps,required,name,control,errors,disabled }) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...addErrorIntoField(errors[name])}
              required={required}
              label={label}
              disabled={disabled}
              InputProps={{...inputProps}} 
            />
          )}
        />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default TextFields;
