import { TextField,Box,Button,Grid,Select,MenuItem,InputLabel,FormControl,InputAdornment,IconButton } from '@mui/material'
import React from 'react'
import { useState } from "react"
import { useSignup } from '../../hooks/useSignup'
import Swal from 'sweetalert2'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



function RegisterModals({setOpenModal}) {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [errorr,setError] = useState()
 
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

    const data = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password,
      role,
    }

    try{
      const response = await fetch('https://teal-cape-buffalo-sock.cyclic.app/api/adminRoute/signup', {
                method:'POST',
                body:JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                
            })
            const json = await response.json()
    
          if (!response.ok) {
            setError(json.error);
            // Optionally, show an error message to the user
            Swal.fire({
              title: "All fields must be filled ",
              icon: "warning"
            });
    
          } else{
            //console.log('New Users Addedd', json)
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setRole('')
            Swal.fire({
              title: "Add Admin Success",
              icon: "success"
            });
          }
          
    
        } 
        catch (error){
          console.error("Error adding new Admin:", error);
          // Optionally, show an error message to the user
          Swal.fire({
            title: "Error please try again",
            icon: "error"
          });
        }
      }


  

  return (
    <div className="modalBackground">
        <div className="modalContainer">
        <div className="titleCloseBtn">
            <button onClick={() => setOpenModal(false)}>X</button>
          </div>
          <div className="title">
            <h1>Register Admin</h1>
          </div>
          <div className='form-container'>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)} 
                  value={firstName}
                />
                {error && <div className="error">{error}</div>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)} 
                  value={lastName}
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={visible ? "text" : "password"}
                InputProps={{
                      endAdornment: <EndAdorment visible={visible} setVisible={setVisible} />
                       }}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth required>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

              </Grid>
            </Grid>
          {error && <div className="error">{error}</div>}
            <Button
              type="submit"
              isLoading={isLoading}
              width="100%"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            </Box>
          </div>
          <div className="footer">
            <button onClick={() => setOpenModal(false)} id="cancelBtn">
              Cancel
            </button>
            </div>
            </div>
          </div>
  )
}

export default RegisterModals