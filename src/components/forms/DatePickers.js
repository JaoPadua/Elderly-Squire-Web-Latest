import React,{useState,useEffect} from "react";
import FormControl from "@mui/material/FormControl";
import {  Controller } from "react-hook-form"
import { addErrorIntoField } from './utils';
import ErrorMessage from "./ErrorMessage";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickers = ({ label,required,name,control,errors,onChange,isResetting }) => {

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    onChange && onChange(newDate !== null ? newDate : '');  // Call the onChange function passed from the parent
  };
  

  useEffect(() => {
    if (isResetting) {
      setSelectedDate(null);
    }
  }, [isResetting]);



  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...addErrorIntoField(errors[name])}
                required={required}
                {...field}
                type={Date}
                format="MM/DD/YYYY"
                label={label}
                //value={selectedDate ? value?.selectedDate: ""}
                value={selectedDate || null}
                onChange={(newDate) => {
                field.onChange(newDate); // Update react-hook-form's state
                handleDateChange(newDate); // Update local state
              }}
              slotProps={{ textField: { variant: 'outlined' },    error: false,}}
            />
          )}
          />
        </LocalizationProvider>
        {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  )
}

export default DatePickers