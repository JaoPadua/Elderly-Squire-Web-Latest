import React, {useState}from 'react'
import { Box, InputAdornment, Button,TextField,IconButton} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Avatar from "@mui/material/Avatar";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import TextFields from '../../components/forms/TextFields';
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import CheckFields from '../../components/forms/CheckFields';
import {useForm, Controller} from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup";
import { pawdRegExp } from '../../components/forms/utils';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



  const ElderPortalSignUp = () => {
    const [visible, setVisible] = useState(false);
    const [confirmvisible, setconfirmVisible] = useState(false);

    const navigate = useNavigate()
   
    const EndAdorment = ({visible,setVisible}) => {
        return <InputAdornment position='end'>
          <IconButton onClick={()=>setVisible(!visible)}>
           {visible ?  <VisibilityOffIcon/> : <RemoveRedEyeIcon/>}
          </IconButton>
        </InputAdornment>
    };
    const ConfirmEndAdorment = ({confirmvisible,setconfirmVisible}) => {
      return <InputAdornment position='end'>
        <IconButton onClick={()=>setconfirmVisible(!confirmvisible)}>
         {confirmvisible ? <VisibilityOffIcon/> : <RemoveRedEyeIcon/> }
        </IconButton>
      </InputAdornment>
  };


    const schema = yup.object({
      SurName: yup
      .string()
      .required('Last Name is Required')
      .matches(/^[A-Za-z]+$/, 'Last Name must contain only alphabetical characters'),
      
    FirstName: yup
      .string()
      .required('First Name is Required')
      .matches(/^[A-Za-z]+$/, 'First Name must contain only alphabetical characters'),
     
    //MiddleName: yup.string().required('MiddleName is Required').matches(/^[A-Za-z]+$/, 'FirstName must contain only alphabetical characters'),
    email: yup.string().required('E-mail Address is required.').email('E-mail Address provided is invalid.').max(320),
    password: yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.').max(15),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
    privacy: yup.bool().oneOf([true], 'Field must be Checked'),
  });


    const {handleSubmit, formState:{errors} ,control ,reset} = useForm({
      defaultValues:{
      SurName:'',
      FirstName:'',
      //MiddleName:'',
      email: '',
      password:'',
      Suffix:'',
      confirmPassword:'',
      privacy: false
      },
      resolver: yupResolver(schema)
    });


      const onSubmit = async(data) =>{

          try {
              const formData = new FormData();
              formData.append('lastName',data.SurName)
              formData.append('firstName',data.FirstName)
              formData.append('email',data.email)
              formData.append('password',data.password)


            const response = await axios.post(`https://capstone-project-api-backend.vercel.app/api/elderPortal/ElderSignup`, formData, {  
              headers: {
                'Content-Type': 'application/json'
              }
            })

            if(response.status === 200){
              Swal.fire({
                title: "Register Success!",
                icon: "success"

              })
              console.log('Data',response)
              reset()
              navigate('/ElderPortalLogin')
            }
            
            else{
              throw new Error('Failed with status code: ' + response.status);
            }

          } catch (error) {
            if (error.response && error.response.status === 409) {
              Swal.fire({
                  title: "Registration Failed",
                  text: "Email already exists",
                  icon: "warning" 
              });
          } else {
              Swal.fire({
                  title: "Registration Failed",
                  text: `An error occurred, please try again later.`,
                  icon: "warning"
              });
          }

        }
      }
    


    return (
      <div className="container-fluid">
      <div className="titleHolder">
      <br></br>
      <br></br>
        <div className="cards__container">

    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mt: "4rem",
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
      <HowToRegIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
     Sign Up
    </Typography>
    {/* <Form /> */}
    {/*<Grid container spacing={1} justify="center">*/}
    {/*<Grid item md="6">*/}
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ width: "100%", mt: "2rem" }}
    >
      <Grid item md={6}>
      <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={12}>
              <TextFields control={control} errors={errors} name="SurName" label="Last Name" required />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <TextFields control={control}  errors={errors} name="FirstName" label="First Name" required />
            </Grid>
          
         {/* <Grid item xs={12} sm={6} md={12}>
            <TextFields control={control} errors={errors} name="MiddleName" label="Middlename" required />
          </Grid>*/}
          <Grid item xs={12} sm={6} md={12}>
            <TextFields control={control} errors={errors} name="email" label="Email" required inputProps={{
             
              type: "email"
            }} /> 
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <TextFields control={control} errors={errors} name="password" label="Password"  required inputProps={{
              endAdornment:(<EndAdorment visible={visible} setVisible={setVisible}/>),
              type: visible ? "text" : "password"
            }} />
          </Grid>
          {<Grid item xs={12} sm={6} md={12}>
            <TextFields control={control} errors={errors} name="confirmPassword" label="Confirm Password" required  inputProps={{
            endAdornment:(<ConfirmEndAdorment confirmvisible={confirmvisible} setconfirmVisible={setconfirmVisible}/>),
              type: confirmvisible ? "text" : "password"
            }} />
          </Grid>}
          </Grid>
          <CheckFields control={control} errors={errors} name ="privacy" //sx={{display: "flex", alignItems: "center", }}
          />
          <Button
           type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >Submit
            </Button>
        </Box>
      </Grid>
    </Grid>
    {/*</Grid>*/}
    {/*</Grid>*/}
  </Box>
  </div>
      </div>
    </div>
    );
  }

  

export default ElderPortalSignUp;