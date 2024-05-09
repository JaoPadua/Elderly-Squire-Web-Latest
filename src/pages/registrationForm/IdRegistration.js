import React,{useState} from "react";
import { Box, InputAdornment, Button} from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import Typography from "@mui/material/Typography";
import TextFields from "../../components/forms/TextFields";
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import Grid from "@mui/material/Grid";
import SelectGenderFields from "../../components/forms/SelectGenderFields";
import SelectApplication from "../../components/forms/SelectApplication";
import SelectDistrict from "../../components/forms/SelectDistrict";
import SelectCivilStatus from "../../components/forms/SelectCivilStatus";
import SelectStatus from "../../components/forms/SelectStatus";
import SelectID from "../../components/forms/SelectID";
import CheckFields from "../../components/forms/CheckFields";
import {useForm} from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './regId.css'
import { phoneNumberPattern } from "../../components/forms/utils";
import axios from 'axios';
import DatePickers from "../../components/forms/DatePickers";
import InputFields from "../../components/forms/InputFields";
import Swal from 'sweetalert2'



const  IdRegistration = () => {

  const [isResetting, setIsResetting] = useState(false);
  
  const handleDateReset = () => {
    // Your form submission logic
    // After successful submission, set isResetting to true to trigger the reset
    setIsResetting(true);
    // Optionally, reset isResetting after a brief delay to allow the reset to take effect
    setTimeout(() => setIsResetting(false), 100);
  };


  const schema = yup.object({
    SurName: yup.string().required('Last Name is Required')
    .matches(/^[A-Za-z ]+$/, 'Last Name must contain only alphabetical characters and spaces'),
FirstName: yup.string().required('First Name is Required')
    .matches(/^[A-Za-z ]+$/, 'First Name must contain only alphabetical characters and spaces'),
    MiddleName: yup.string().required('Middle Name is Required')
    .matches(/^(?:[A-Za-z ]+|N\/A)$/, 'Middle Name must contain only alphabetical characters and spaces or "N/A"'),


    Address: yup.string().required('Address is Required'),
    Nationality: yup
    .string()
    .required('Nationality is Required')
    .matches(/^[A-Za-z]+(\/[A-Za-z]+)?$/,'Invalid format. For dual nationality, separate with a `/`.'),
    YrsofResidenceInManila: yup.string().required('Years of Residence is Required'),
    Gender: yup.string().required('Gender is Required'),
    BirthPlace: yup.string().required('Birthplace is Required'),
    DateOfBirth: yup.date()
    .typeError('Invalid date of birth')
    .required('Date of birth is required')
    .max(new Date(new Date().getFullYear() - 60, new Date().getMonth(), new Date().getDate()), 'Invalid date of birth.'),
    calculatedAge: yup.string().required('Age is Required')
    .test('is-senior', 'You must be at least 60 years old', function (value) {
      return value >= 60;
    }),
    Status:yup.string().required('Status is Required'),
    Barangay: yup.string().required('Barangay is Required'),
    Zone: yup.string().required('Zone is Required'),
    District: yup.string().required('District is Required'),
    CivilStatus: yup.string().required('Civil Status is Required'),
    MobilePhone: yup.string().required('Mobile Phone is Required').matches(phoneNumberPattern,'Phone is not Valid'),
    ValidIdPresented: yup.string().required('Valid ID is Required'),
    ProofOfValidID: yup.mixed().required('Proof of Valid ID is Required'),
    TypeofApplication: yup.string().required('Type of Applications is Required'),
    privacy: yup.bool().oneOf([true], 'Field must be Checked'),
  });


 


  const {handleSubmit, formState:{errors} ,control ,reset,setValue,watch} = useForm({
    defaultValues:{
    TypeofApplication:'',
    SurName:'',
    FirstName:'',
    MiddleName:'',
    Suffix:'',
    Address:'',
    Nationality:'',
    DateOfBirth: null,
    YrsofResidenceInManila:'',
    Gender:'',
    BirthPlace:'',
    calculatedAge:'',
    Barangay:'',
    Zone:'',
    District:'',
    Status: '',
    CivilStatus:'',
    MobilePhone:'',
    ValidIdPresented:'',
    ProofOfValidID: null,
    privacy: false
    },
    resolver: yupResolver(schema)
  });
  console.log('Errors',errors)

  //calculate age based on birth of date
  const handleDateChange = (newDate) => {
    const DateOfBirth = new Date(newDate);
    console.log("DateOfBirth:", DateOfBirth); // Log the date to check its value
    const formattedDate = DateOfBirth.toLocaleDateString('en-US');
    console.log("Formatted Date:", formattedDate);

    //setValue("DateOfBirth", formattedDate);

    const today = new Date();
    let calculatedAge = today.getFullYear() - DateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - DateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < DateOfBirth.getDate())) {
      calculatedAge--;
    }
    setValue('calculatedAge',calculatedAge);
   
  };
  
  const uploadFile = async (files) => {
    console.log(files)
    try {
        //const upload_preset = "image_preset";
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', "cuuz8bg0");
        let cloudName = "dqs4lb8kt";

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData)
    console.log(response); // Logging the response for debugging purposes
    return response.data.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to upload file to Cloudinary');
    }
};


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      //const imgURL = await uploadFile(data.ProofOfValidID);
      const DateOfBirth = new Date(data.DateOfBirth);
      const formattedDate = DateOfBirth.toLocaleDateString('en-US');

      formData.append('TypeofApplication', data.TypeofApplication);
      formData.append('SurName', data.SurName);
      formData.append('MiddleName', data.MiddleName);
      formData.append('FirstName', data.FirstName);
      formData.append('Suffix', data.Suffix);
      formData.append('Address', data.Address);
      formData.append('Nationality', data.Nationality);
      formData.append('DateOfBirth', formattedDate);
      formData.append('YrsofResidenceInManila', data.YrsofResidenceInManila);
      formData.append('Gender', data.Gender);
      formData.append('BirthPlace', data.BirthPlace);
      formData.append('Age', data.calculatedAge);
      formData.append('Barangay', data.Barangay);
      formData.append('Zone', data.Zone);
      formData.append('District', data.District);
      formData.append('Status',data.Status)
      formData.append('CivilStatus', data.CivilStatus);
      formData.append('MobilePhone', data.MobilePhone);
      formData.append('ValidIdPresented', data.ValidIdPresented);
      formData.append('ProofOfValidID', data.ProofOfValidID);
      
      //console.log('data',imgURL)
      //console.log('proof',data.ProofOfValidID)
      // Log formData just before making the request
      //console.log("formData:", formData);


      const response = await axios.post(`https://teal-cape-buffalo-sock.cyclic.app/api/usersRoute/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
 
      if (response.status === 200) {
        Swal.fire({
          title:"Senior ID Register Success!",
          icon: "success"
        })
        setIsResetting(true)
        reset();
        //console.log("formdata", formData);
        console.log(response);
      } else {
        Swal.fire({
          title:"Register Error!",
          icon: "warning"
        })
        //console.log(response);
      }
    } catch (error) {
      //console.log(error);
      if (error.response) {
        console.log('Server responded with:', error.response.data);
        console.log('Status code:', error.response.status);
      }
      Swal.fire({
        title:"An error occurred. Please try again later!",
        icon: "error"
      })
    }
  };

  
 
  return (
    <div className="container-fluid">
      <div className="titleHolder">
        <br></br>
        <br></br>
            {/*<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <HowToRegIcon />
            </Avatar>*/}
            <Typography component="h1" variant="h5">
              ID Registrations for New Señior Citizen
            </Typography>
        <div className="cards__container">
       
        <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "2rem",
      }}
    >
     <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
        
  
        {/* Personal Details */}
        <Typography variant="h6" gutterBottom>
          <PersonIcon/> Personal Details
        </Typography>
        <Grid container spacing={2}>
          {/* Insert Personal Details Fields Here */}
          <Grid item xs={12} sm={6} md={3}>
            <TextFields control={control} errors={errors} name="SurName" label="Last Name" required />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextFields control={control} errors={errors} name="FirstName" label="First Name" required />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextFields control={control} errors={errors} name="MiddleName" label="Middle Name" required />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextFields control={control} errors={errors} name="Suffix" label="Suffix (Optional)" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SelectGenderFields control={control} errors={errors} name="Gender" label="Gender" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectCivilStatus control={control} errors={errors} name="CivilStatus" label="Civil Status" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields control={control} errors={errors} name="YrsofResidenceInManila"  required label="Years of Residency"  inputProps={{
              type: 'number'
            }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DatePickers control={control} errors={errors} name="DateOfBirth" label="Date of Birth" 
            onChange={handleDateChange}  isResetting ={isResetting} required inputProps={{
              value: watch("DateOfBirth"),
            }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <TextFields control={control} errors={errors} name="calculatedAge" label="Age" required inputProps={{
                        type: 'number',
                        value: watch("calculatedAge"),
                        readOnly: true,
                      }} />
          </Grid>
          <Grid item xs={12} md={4}>
                      <TextFields control={control} errors={errors} name="MobilePhone" label="Mobile Phone" required inputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+63</InputAdornment>
                        ),
                        type: 'number'
                      }} />
                    </Grid>

        </Grid>

        {/* Street Address */}
        <Typography variant="h6" gutterBottom>
          <HomeIcon/>Street Address
        </Typography>
        <Grid container spacing={2}>
          {/* Insert Street Address Fields Here */}
          <Grid item xs={12} sm={6} md={4}>
            <TextFields control={control} errors={errors} name="BirthPlace" label="Birth Place" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields control={control} errors={errors} name="Address" label="Address" required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields control={control} errors={errors} name="Barangay" label="Barangay" required inputProps={{ type: 'number' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields control={control} errors={errors} name="Zone" label="Zone" required inputProps={{ type: 'number' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectDistrict control={control} errors={errors} name="District" label="District" required />
          </Grid>
        </Grid>

        {/* Other Informations */}
        <Typography variant="h6" gutterBottom>
          <InfoIcon/>Other Informations
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
            <SelectStatus control={control} errors={errors} name="Status"  required label="Status" />
          </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <TextFields control={control} errors={errors} name="Nationality"  required label="Nationality" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectApplication control={control} errors={errors} name="TypeofApplication" label="Select Type of Application" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <SelectID control={control} errors={errors} name="ValidIdPresented" label="Valid ID" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography>Proof of Valid ID (Scan PDF files)</Typography>
            <InputFields control={control} errors={errors} name="ProofOfValidID" required />
          </Grid>
        </Grid>
        <CheckFields control={control} errors={errors} name ="privacy" required/>
        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>

        </div>
      </div>
    </div>
  );
}
export default IdRegistration;