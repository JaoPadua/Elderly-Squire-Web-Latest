import { TextField,Button,IconButton,CloseIcon,InputAdornment } from '@mui/material';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import oscaManilaImage from "../img/oscamanila.png";
import { useState,useEffect  } from "react"
import { useLogin } from "../../hooks/useLogin";
import './login.css'
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  
  const [visible, setVisible] = useState(false);
  const EndAdorment = ({visible,setVisible}) => {
    return <InputAdornment position='end'>
      <IconButton onClick={()=>setVisible(!visible)}>
       {visible ?  <VisibilityOffIcon/> : <RemoveRedEyeIcon/>}
      </IconButton>
    </InputAdornment>
};




  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
    
    /*if(!error){
    console.log(error)
    Navigate('/admin') // if its not error go to login else dislpay the error
    }*/
    
  };
    
 


  return (
    <Container component="main" maxWidth="lg">
    <Box
      sx={{
        marginTop: 30
      }}
    >
      <Grid container>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${oscaManilaImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "100% 100%",
            backgroundPosition: "center"
          }}
        />
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
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography component="h1" variant="h5">
            Login to your Admin account
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
                InputProps={{
                      endAdornment: <EndAdorment visible={visible} setVisible={setVisible} />
                       }}
                id="password"
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
            </Box>
            <Link to="/ForgotAdminPassword" variant="body2" >
                  Forgot password?
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container>
);
}

export default Login;
