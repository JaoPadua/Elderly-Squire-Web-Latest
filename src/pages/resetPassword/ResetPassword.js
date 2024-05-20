import React, {useState} from 'react'
import { TextField,Button, Typography,IconButton,CloseIcon,Box,Grid,InputAdornment } from '@mui/material';
import Modal from '@mui/material/Modal';
import "./resetPassword.css"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate,useParams  } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import axios from 'axios';


function ResetPassword() {

    const [password, setPassword] = useState('');
    const [message,setMessage]= useState('')
    const [emailError, setEmailError] = useState('');
    const { id, token } = useParams(); // Retrieve parameters from the URL


    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const EndAdorment = ({visible,setVisible}) => {
      return <InputAdornment position='end'>
        <IconButton onClick={()=>setVisible(!visible)}>
         {visible ?  <VisibilityOffIcon/> : <RemoveRedEyeIcon/>}
        </IconButton>
      </InputAdornment>
  };



    const handleResetPassword = async (e) => {
      e.preventDefault()
      //console.log("Submitting New Password:", password);

      const trimmedPassword = password.trim();
      if (!trimmedPassword) {
        Swal.fire({
            icon: 'warning',
            title: 'Password Error',
            text: 'password is required.',
        });
        return; 
    }
    if (trimmedPassword.length < 8 || trimmedPassword.length > 15) {
      Swal.fire({
          icon: 'warning',
          title: 'Password Error',
          text: 'Password must be at least 8 characters',
      });
      return;
  }
      try {
        const response = await axios.post(`https://capstone-project-api-backend.vercel.app/api/elderPortal/reset-password/${id}/${token}`,{password});
        setMessage(response.data.message); // Adjust according to what your backend sends
        //console.log('data',response)
        Swal.fire({
          title:"Update Password Success",
          icon: "success",
        })
        setPassword('')
        setTimeout(() => {
          navigate('/ElderPortalLogin');
      }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Swal.fire({
              title: "Error",
              text: "Invalid or Expired Token",
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

  
 return(
    <div className="forgotpassword-modalBackground">
        <div className="forgotpassword-modalContainer">
          <div className="forgotpassword-title">
            <h1>Reset Password</h1>
          </div>
          <div className='forgotpassword-form-container'>
          <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={12}>
              <Typography textAlign={'center'}>
                Please enter new Password
                </Typography>
                <br></br>
                <TextField
                    id="password"
                    label="New Password"
                    variant="outlined"
                    type={visible ? "text" : "password"}
                    fullWidth
                    InputProps={{
                      endAdornment: <EndAdorment visible={visible} setVisible={setVisible} />
                       }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    />
            </Grid>
            </Grid>
            <Button className='button'
              type="submit"
              width="100%"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update 
            </Button>
            </Box>
          </div>
          <div className="footer">
            </div>
            </div>
          </div>
  )
}
export default ResetPassword;