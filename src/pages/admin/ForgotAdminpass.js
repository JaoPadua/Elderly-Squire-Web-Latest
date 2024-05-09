import React, {useState} from 'react'
import { TextField,Button, Typography,IconButton,CloseIcon,Box,Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import "./forgotAdminpass.css"
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import axios from 'axios';


function ForgotAdminpass() {

    const [email, setEmail] = useState('');
    const [message,setMessage] =useState('')
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
  


      
    
    const handleSubmit = async (event) => {


        event.preventDefault();

        //Check if the email field is empty
        if (!email.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'Email is required.',
            });
            return; // Stop the function if the field is empty
        }
        try {
            const response = await axios.post('http://localhost:8080/api/adminRoute/forgotAdminPass', { email });

            Swal.fire({
                title: "Email Sent Successfully",
                text: "Please check your email to reset your password.",
                icon: "success",
                timer: 2000
            });
            setMessage(response.data.message)
            // Navigate to login after a successful operation
            setTimeout(() => {
                navigate('/LoginDisplay');
            }, 2000);
        } catch (error) {
          if (error.response && error.response.status === 404) {
                Swal.fire({
                    title: "Error",
                    text: "Email does not exist.",
                    icon: "warning"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "An error occurred, please try again later.",
                    icon: "Warning"
                });
            }
        }
    };

      
  
    /*const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };*/

    const cancelButton =  ()=>{
        navigate("/LoginDisplay")
    }
  
 return(
    <div className="forgotpassword-modalBackground">
        <div className="forgotpassword-modalContainer">
          <div className="forgotpassword-title">
            <h1>Forgot Admin Password?</h1>
          </div>
          <div className='forgotpassword-form-container'>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={12}>
              <Typography textAlign={'center'}>
                Please enter email to recover the password
                </Typography>
                <br></br>
                <TextField 
                    type="email"
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />

            </Grid>
            </Grid>
            <Button className='button'
              type="submit"
              width="100%"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            </Box>
          </div>
          <div className="footer">
            <button onClick={cancelButton} id="cancelBtn">
              Cancel
            </button>
            </div>
            </div>
          </div>
  )
}
export default ForgotAdminpass;