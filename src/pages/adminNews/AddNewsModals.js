import React, { useState, useEffect } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, Typography, Alert,Grid,Box,TextareaAutosize} from '@mui/material';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useAuthContext } from '../../hooks/useAuthContext';
import  './addnews.css'



function AddNewsModals({setOpenModal}) {

    const [Title,setTitle] = useState('')
    const [Description,setdescription] = useState('')
    const [link,setlink] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [Err,setError] = useState('')
    //components MUI

    const [open, setOpen ]= React.useState(false)
    const {user} = useAuthContext()

    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

     //add news post
            const handleSubmit = async (e) =>{
                e.preventDefault()

            // Convert image to base64 before sending
            let base64Image = null;
            const fileInput = document.getElementById('image-upload-button');
            if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = () => {
            base64Image = reader.result;
            sendNewsData(base64Image);
            };
            reader.readAsDataURL(file);
            } else {
            sendNewsData(base64Image);
            }
            }

        const sendNewsData = async (base64Image) => {
        const data = {
        Title: Title,
        Description: Description,
        link: link,
        img: base64Image, // Include base64 image data in the request
        };

        //console.log('Request Data:', data);
        try {
        const response = await fetch('http://localhost:8080/api/newsRoute/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${user.token}`
        },
        });

        const json = await response.json();

        console.log('Response:', json);  // Log the response

        if (!response.ok) {
        setError(json.error);
        } else {
        setError(null);
        setTitle('');
        setdescription('');
        setlink('');
        setSelectedImage('')
        Swal.fire({
          title: "News Added Success",
          icon: "success"
        });
        setOpen(false);
        //console.log('News added', json);
        }
        } catch (error) {
        console.error('Error:', error.message);
        Swal.fire({
          title: "Error Adding News",
          icon: "error"
        });
        setError('An error occurred while sending news data.');
        }
        };


        //images upload functions
      
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataURL = event.target.result;
            //console.log('Selected Image Data URL:', dataURL); // Add this line
            setSelectedImage(dataURL);
            const base64Image = reader.result;
            console.log('Base64 image:', base64Image);
            // Now you can set the base64 image in state or use it as needed
          };
          reader.readAsDataURL(file);
        }
      };
      
      //show forms after modals close
      /*const handleCloseModals = () => {
        setShowAddForms(true); // Set showAddForms to true
        // Other necessary logic for modal closure
      };*/



        return (

            <div className="modalBackground">
            <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => setOpenModal(false)}>X</button>
              </div>
              <div className="title">
                <h1>Add News</h1>
              </div>
              <div className="form-container">
                    {user && user.token ? (
                      <form className="form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="input-group">
                                <TextField
                                    label="Title"
                                    value={Title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextareaAutosize
                                    aria-label="Description"
                                    placeholder="Description"
                                    value={Description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    fullWidth
                                    minRows={3}
                                    sx={{ marginBottom: 2, variant: 'outlined' }}
                                />
                                <TextField
                                    label="URL"
                                    value={link}
                                    onChange={(e) => setlink(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                {selectedImage && (
                                  <div>
                                  <p>Selected Image: {selectedImage.name}</p>
                                    <img
                                      src={selectedImage}
                                      id="image-upload-button"
                                      alt="Selected Image"
                                      style={{ maxWidth: '20%', maxHeight: '20%' }}
                                      // Adjust the size as needed
                                    />
                                  </div>
                                )}
                               <input
                                accept="image/*"
                                id="image-upload-button"
                                type="file"
                                onChange={(e) => handleImageUpload(e)}
                                style={{ display: 'none', marginTop: '10px' }} // Adjusted display and added marginTop
                            />
                            <label htmlFor="image-upload-button">
                            <Button variant="contained" component="span">
                              Upload Image
                            </Button>
                          </label>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '16px' }}
                            >
                                Submit
                            </Button>
                        </form>
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

export default AddNewsModals