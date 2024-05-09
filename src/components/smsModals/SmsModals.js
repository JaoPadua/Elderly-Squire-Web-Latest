import { TextField,Box,Button,Grid,Select,MenuItem } from '@mui/material'
import React from 'react'
import { useState } from "react"
import { useSignup } from '../../hooks/useSignup'


function SmsModals({setOpenModal,userId}) {
    const { user } = useAuthContext();
    const [messageText, setMessageText] = useState('');
    const [response, setResponse] = useState('');
    const [mobilePhone, setMobilePhone] = useState('')
    const [SurName,setSurName]= useState('')
    const [FirstName,setFirstName] = useState('')
    const [MiddleName, setMiddleName] = useState('')
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState({})



    useEffect(() => {
        async function fetchUsers() {
          try {
            const response = await fetch(`http://localhost:8080/api/usersRoute/${userId}`, {
                body:JSON.stringify(data),
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
                
            })
            const data = await response.json()
            if(response.ok){
                setUsers(data);
                setSurName(data.SurName);
                setFirstName(data.FirstName);
                setMiddleName(data.MiddleName);
                setMobilePhone(data.MobilePhone)
            }
           
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        }
        fetchUsers();
      }, []);





  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await fetch(`http://localhost:8080/api/smsRoute/sendSmS/${userID}`, {
            method: 'POST',
            headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
            const json = await response.json()
    
          if (!response.ok) {
            setError(json.error);
            alert("All Fields must be Filled.");
    
          } else{
            //console.log('New Users Addedd', json)
            setMessageText('')
            setOpenModal(false);
            alert("SmS Sent Succesfully");
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
                    <button onClick={() => {
                        setOpenModal(false);
                    }}>X</button>
                </div>
                <div className="title">
                    <h1>Send SmS</h1>
                </div>
                <div className="form-container">
                {user && user.token ? (
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="SurName"
                  required
                  fullWidth
                  id="Surname"
                  label="Sur Name"
                  autoFocus
                  onChange={(e) => setSurName(e.target.value)} 
                  value={SurName}
                />
                {error && <div className="error">{error}</div>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="lastName"
                  onChange={(e) => setFirstName(e.target.value)} 
                  value={FirstName}
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Middle Name"
                  label="Middle Name"
                  name="miiddleName"
                  onChange={(e) => setMiddleName(e.target.value)} 
                  value={MiddleName} 
                />
              </Grid>
              <Grid item xs={12}>
              <TextareaAutosize
                aria-label="SmS Descriptions"
                placeholder="SMS TEXT DESCRIPTION"
                value={Description}
                onChange={(e) => setMessageText(e.target.value)}
                fullWidth
                minRows={3}
                sx={{ marginBottom: 2, variant: 'outlined' }}
                                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              isLoading={isLoading}
              width="100%"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sent SmS
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
  );
}

export default SmsModals