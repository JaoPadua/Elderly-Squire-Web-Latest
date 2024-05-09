import { TextField,Box,Button,Grid,Select,MenuItem,InputLabel,FormControl } from '@mui/material'
import React from 'react'
import { useState,useRef } from "react"
import { useSignup } from '../../hooks/useSignup'
import axios from 'axios';
import "./AddDocumentsModals.css"
import { useAuthContext } from '../../hooks/useAuthContext';
import Swal from 'sweetalert2'


function AddDocumentsModals({setOpenModal}) {

  const inputRef = useRef(null);
  const [title,setTitle] = useState("")
  const [descriptions,setDescriptions] = useState("")
  const [pdfDocuments, setpdfDocuments] = useState("")
 
  const [err, setError]=useState('')

  const {user} = useAuthContext



  //clear inputfields
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleFileChange = async (e) => {
    // Update the state with the selected file
   
    try {

      const files = e.target.files[0];
      const formData = new FormData();
      formData.append('file',files);
      formData.append('upload_preset', "cuuz8bg0");
      let cloudName = "dqs4lb8kt";

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData)
    console.log('data',response); // Logging the response for debugging purposes
    console.log('data response', response.data)
    setpdfDocuments (response.data.secure_url);
    //console.log(setPdfDocs)
  } catch (error) {
      console.log(error);
      throw new Error('Failed to upload file to Cloudinary');
  }
  };


  const handleSubmit = async (event) => {
    event.preventDefault()

    //const docsURL = await handleFileChange(pdfDocs);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('descriptions', descriptions);
    formData.append('pdfDocuments', pdfDocuments);

    //console.log('url',docsURL)
    console.log("Data:", formData);

    try{
          const response = await axios.post('https://teal-cape-buffalo-sock.cyclic.app/api/docsRoute',formData,{
      
                headers: {
                     'Content-Type': 'multipart/form-data',
                    //'Authorization': `Bearer ${user.token}`,
                },
                
            })

             //const responseData = await response.json();
            if (response.status ===200) {
              setTitle('');
              setDescriptions('');
              setpdfDocuments('')
              handleClear();
              Swal.fire({
                title: "Add Documents Success",
                icon: "success"
              });
              //setOpenModal(false)
              //console.log("formdata", formData);
               //console.log('Response Data:', responseData);
              console.log('response',response);

            } else {    

              Swal.fire({
                title: "Add Documents Error",
                icon: "error"
              });
              console.log(response);
            }
          
    
        } 
        catch (error){
          if (error.response) {
            console.log('Server responded with:', error.response.data);
            console.log('Status code:', error.response.status);
            
          }
          Swal.fire({
            title: "Error Occured Try again later",
            icon: "error"
          });
          console.log('Server responded with:', error.response.data);
            console.log('Status code:', error.response.status);
            
      }
      

    }
  

  return (
    <div className="modalBackground">
        <div className="modalContainer">
        <div className="titleCloseBtn">
            <button onClick={() => setOpenModal(false)}>X</button>
          </div>
          <div className="title">
            <h1>Add Documents </h1>
          </div>
          <div className='form-container'>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="Documents Title"
                  label="Documents Title"
                  autoFocus
                  onChange={(event) => setTitle(event.target.value)} 
                  value={title}
                />
                
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="documents descriptions"
                  label="Documents Descriptions"
                  name="descriptions"
                  multiline
                  minRows={3}
                  onChange={(event) => setDescriptions(event.target.value)} 
                  value={descriptions}
                 
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
              fullWidth
              id="Add Documents"
              type="file"
              name="pdfDocuments"
              accept="application/pdf"
              onChange={(e) => setpdfDocuments(e.target.files[0])}
              variant="outlined"
              inputRef={inputRef}
            />
              </Grid>
              <FormControl fullWidth required>
          </FormControl>
              </Grid>
            <Button
              type="submit"
              width="100%"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Documents
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

export default AddDocumentsModals