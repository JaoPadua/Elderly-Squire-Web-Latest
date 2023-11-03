import { TextField,Box,Button,Grid,FormControlLabel,Checkbox } from '@mui/material'
import React from 'react'
import { useState } from "react"
import { useSignup } from '../../hooks/useSignup'


function RegisterModals({setOpenModal}) {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()
 const [errorr,setError] = useState()
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password,
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
            alert("An error occurred. Please try again later.");
    
          } else{
            //console.log('New Users Addedd', json)
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            alert("Register Admin successfully!");
          }
          
    
        } 
        catch (error){
          console.error("Error adding new Admin:", error);
          // Optionally, show an error message to the user
          alert("An error occurred. Please try again later.");
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
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                />
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