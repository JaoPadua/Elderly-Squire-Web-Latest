import { TextField,Box,Button,Grid,Select,MenuItem,InputLabel } from '@mui/material'
import React from 'react'
import { useState,useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import Swal from 'sweetalert2';

function EditImportModals({setOpenModal, elderID}) {
    
    
  const { user } = useAuthContext(); 
  const [elder, setElder] = useState("")
  const [editedfirstName,setEditedFirstName] = useState("")
  const [editedmiddleName,setEditedMiddleName] = useState("")
  const [editedSuffix, setEditedSuffix] = useState("")
  const [editedSurName,setEditedSurName] = useState("")
  const [editedBRGY,setEditedBRGY] = useState("")
  const [editedBIRTHMONTH,setEditedBIRTHMONTH] = useState("")
  const [editedBirthDay,setEditedBirthDay] = useState("")
  const [editedStreeName,setEditedStreetName] = useState("")
  const [editedDistrictNO,setEditedDistrictNO] = useState("")
  const [editedMobileNO,setEditedMobileNO] = useState("")
  const [editedOSCAIDNO,setEditedOSCAIDNO] = useState("")
  const [editedGender,setEditedGender] = useState("")
  const [editedVoter,setEditedVoter] = useState("")
  const initialStatus = elder ? elder.STATUS : '';
  const [editedStatus,setEditedStatus] = useState(initialStatus)
  const [Err,setError] = useState('')

  
  
  useEffect(() => {
    const fetchElderbyID = async () => {
        try {
            const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/importRoute/${elderID}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await res.json();

            if (res.ok) {
                setElder(data); // Set news to the fetched data object
                setEditedFirstName(data['FIRST NAME']);
                setEditedMiddleName(data['MIDDLE NAME']);
                setEditedSurName(data['LAST NAME'])
                setEditedSuffix(data.SUFFIX)
                setEditedStatus(data.STATUS)
            }
        } catch (error) {
            console.error('Error fetching news by ID:', error);
        }
    }


    fetchElderbyID();
}, [elderID, user.token]);
  
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const updateData = {
    STATUS:editedStatus
    }

    try{
      const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/importRoute/updateImport/${elderID}`, {
                method:'PATCH',
                body:JSON.stringify(updateData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                
            })
            const json = await response.json()
    
          if (!response.ok) {
            setError(json.error);
            // Optionally, show an error message to the user
            Swal.fire({
              title: "Error Update Import",
              icon: "error"
            });
    
          } else{
            //console.log('Elder Status Update', json)
            setOpenModal(false);
            Swal.fire({
              title: "Update Success",
              icon: "success"
            });
          }
          
    
        } 
        catch (error){
          console.error("Error adding Updating Elder:", error);
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
            <h1>Edit Elder</h1>
          </div>
          <div className='form-container'>
          {user && user.token ? (
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  disabled
                  required
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setEditedFirstName(e.target.value)} 
                  value={editedfirstName}
                  InputProps={{
                  readOnly: true,
                }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  disabled
                  variant="outlined"
                  id="MiddleName"
                  label="Middle Name"
                  name="MiddleName"
                  onChange={(e) => setEditedMiddleName(e.target.value)} 
                  value={editedmiddleName}
                  InputProps={{
                  readOnly: true,
                }}
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  variant="outlined"
                  id="LastName"
                  label="Last Name"
                  name="LastName"
                  autoComplete="LastName"
                  onChange={(e) => setEditedSurName(e.target.value)} 
                  value={editedSurName} 
                  InputProps={{
                  readOnly: true,
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  disabled
                  fullWidth
                  name="Suffix"
                  label="Suffix"
                  id="Suffix"
                  onChange={(e) => setEditedSuffix(e.target.value)} 
                  value={editedSuffix}
                  InputProps={{
                  readOnly: true,
                }}
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
              labelId="Status-select-label"
              id="Status-select"
              value={editedStatus}
              onChange={(e) =>setEditedStatus(e.target.value)}
              fullWidth
              required
              name="Status"
              label="Status"
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              <MenuItem value="BEDRIDDEN">BEDRIDDEN</MenuItem>
              <MenuItem value="PHYSICAL INCAPACITY">PHYSICAL INCAPACITY</MenuItem>
              <MenuItem value="MENTAL INCAPACITY">MENTAL INCAPACITY</MenuItem>
              <MenuItem value="DECEASED.">DECEASED</MenuItem>
            </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              width="100%"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Status
            </Button>
            </Box>
            ) : (
          <div className="not-authorized-message">
          <p>You need to be logged in to view this content.</p>
         </div>
           )}
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

export default EditImportModals