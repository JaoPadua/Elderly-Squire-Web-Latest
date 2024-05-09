import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import oscaManilaImage from "../img/oscamanila.png";
import { useState,useEffect  } from "react"
import { useElderLogin } from "../../hooks/useElderLogin";
import './elderPortalLogin.css'
import ForgotPassword from '../forgotPassword/ForgotPassword';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton,InputAdornment } from '@mui/material';



function ElderPortalLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {elderLogin, error, isLoading} = useElderLogin()


    const [visible, setVisible] = useState(false);

    const EndAdorment = ({visible,setVisible}) => {
      return <InputAdornment position='end'>
        <IconButton onClick={()=>setVisible(!visible)}>
         {visible ?  <VisibilityOffIcon/> : <RemoveRedEyeIcon/>}
        </IconButton>
      </InputAdornment>
  };




    const handleSubmit = async (e)=>{
        e.preventDefault()
        await elderLogin(email, password)
        //console.log('Test',login)
    }  

  return (
    <div className="container-fluid">
    <div className="titleHolder">
    <br></br>
    <br></br>
   <div className="cards__container">
    <Container component="main" maxWidth="lg">
    <Box
      sx={{
        marginTop: 10
      }}
    >
      <Grid container>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography component="h1" variant="h5" >
            Elderly Squire Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                autoFocus
              />  
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={visible ? "text" : "password"}
                id="password"
                InputProps={{
                      endAdornment: <EndAdorment visible={visible} setVisible={setVisible} />
                       }}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
              />
            {error && <div className="error">{error}</div>}
              <Button
                disabled={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
              <Grid item xs={10} sm={4} md={5}>
                <Link to="/ForgotPassword" variant="body2" >
                  Forgot password?
                </Link>
              </Grid>
              <br></br>
              <Grid item xs={10} sm={4} md={7}>
                <Link to='/ElderPortalSignUp' variant="body2">
                  <Typography>
                  Don't have an account?
                  </Typography>Sign Up
                </Link>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "100% 100%",
            backgroundPosition: "center"
          }}
        />
      </Grid>
    </Box>
    
  </Container>
  </div>
      </div>
    </div>
  )
}

export default ElderPortalLogin