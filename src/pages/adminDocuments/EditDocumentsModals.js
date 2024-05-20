import { useAuthContext } from "../../hooks/useAuthContext";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect,useRef } from 'react';
import "./EditDocuments.css";
import axios from "axios";
import {Grid,Box,Button,FormControl} from "@mui/material"
import Swal from "sweetalert2";



function EditDocumentsModals ({setOpenEditModal, docsID}){



    const inputRef = useRef(null);
    const { user } = useAuthContext();
    const [docs, setdocs] = useState({}); // Initialize news as an object
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [selectedPDF, setSelectedPDF] = useState("");

    
    //fetch news Value via ID
    useEffect(() => {   
        const fetchDocsbyID = async () => {
            try {
                const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/docsRoute/${docsID}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await res.json();
    
                if (res.ok) {
                    setdocs(data); // Set news to the fetched data object
                    setEditedTitle(data.title);
                    setEditedDescription(data.descriptions);
                    //setSelectedPDF(data.pdfDocuments)
                    //console.log('data',data)
                }
            } catch (error) {
                console.error('Error fetching news by ID:', error);
            }
        };
        fetchDocsbyID()
    }, [docsID, user.token]);
    



    //handle pdf change
    const handleFileChange = async (e) => {
        // Update the state with the selected file
       
        try {
    
          const files = e.target.files[0];
          const upload_preset = "image_preset";
          const formData = new FormData();
          formData.append('file',files);
          formData.append('upload_preset', "cuuz8bg0");
          let cloudName = "dqs4lb8kt";
    
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData)
        //console.log('data',response); // Logging the response for debugging purposes
        //console.log('data response', response.data)
        setSelectedPDF (response.data.secure_url);
        //console.log(setPdfDocs)
      } catch (error) {
          console.log(error);
          throw new Error('Failed to upload file to Cloudinary');
      }
      };
    



    // Submit Button Update
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Prepare the data to be sent in the request body
      const formData = new FormData();
      formData.append('title', editedTitle);
      formData.append('descriptions', editedDescription);
      formData.append('pdfDocuments', selectedPDF);
        
      //console.log('pdf',selectedPDF)
        

      try {
          const response = await axios.patch(`https://capstone-project-api-backend.vercel.app/api/docsRoute/updateDocs/${docsID}`,formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${user.token}`
                  // Add other necessary headers if needed
              },
          });
  
          if (response.status === 200) {
              // Handle success
              //console.log('Data updated successfully!', updatedData);
              //console.log("response",response)
              //console.log('pdf',selectedPDF)
              Swal.fire({
                title: "Update Success",
                icon: "success"
              });
              setOpenEditModal(false);
              
              
          } else {
            Swal.fire({
                title: "Update documents error",
                icon: "error"
              });
            //console.log('formdata',formData)
            //console.log(response);
          }
      } catch (error) {
        if (error.response) {
            console.log('Server responded with:', error.response.data);
            console.log('Status code:', error.response.status);
            
          }
          Swal.fire({
            title: "Error occurred try again later",
            icon: "error"
          });
          console.log('Server responded with:', error.response.data);
            console.log('Status code:', error.response.status);
            
      }
  };
  

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => {
                        setOpenEditModal(false);
                    }}>X</button>
                </div>
                <div className="title">
                    <h1>Edit Documents</h1>
                </div>
                <div className="form-container">
                    {user && user.token ? (
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
                                onChange={(event) => setEditedTitle(event.target.value)} 
                                value={editedTitle}
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
                                onChange={(event) => setEditedDescription(event.target.value)} 
                                value={editedDescription}
                                
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                            fullWidth
                            id="Add Documents"
                            type="file"
                            name="pdfDocuments"
                            inputProps={{accept:"application/pdf"}}
                            onChange={(e) => setSelectedPDF(e.target.files[0])}
                            variant="outlined"
                            //inputRef={inputRef}
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
                            Edit Documents
                            </Button>
                            </Box>
                    ) : (
                        <div className="not-authorized-message">
                            <p>You need to be logged in to view this content.</p>
                        </div>
                    )}
                </div>
                <div className="footer">
                    <button onClick={() => {
                        setOpenEditModal(false);
                    }} id="cancelBtn">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditDocumentsModals
