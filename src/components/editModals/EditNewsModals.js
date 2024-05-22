import React, { useState, useEffect } from 'react';
import "./editModals.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Button from "@mui/material/Button";
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';



function EditNewsModals({ setOpenModal, newsId, setShowAddFormss,onSuccess }) {
    const { user } = useAuthContext();
    const [news, setNews] = useState({}); // Initialize news as an object
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedLink, setEditedLink] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    //fetch news Value via ID
    useEffect(() => {
        const fetchNewsById = async () => {
            try {
                const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/newsRoute/${newsId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await res.json();

                if (res.ok) {
                    setNews(data); // Set news to the fetched data object
                    setEditedTitle(data.Title);
                    setEditedDescription(data.Description);
                    setEditedLink(data.link);
                }
            } catch (error) {
                console.error('Error fetching news by ID:', error);
            }
        };

        fetchNewsById();
    }, [newsId, user.token]);


    // Submit Button Update
    const handleSave = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Prepare the data to be sent in the request body
      const updatedData = {
          Title: editedTitle,
          Description: editedDescription,
          link: editedLink,
          img: selectedImage || news.img,
      };
  
      try {
          const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/newsRoute/${newsId}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
                  // Add other necessary headers if needed
              },
              body: JSON.stringify(updatedData)
          });
  
          if (response.ok) {
              // Handle success
              //console.log('Data updated successfully!', updatedData);
              //console.log("response",response)
              Swal.fire({
                title: "News Update Success",
                icon: "success"
              });
              //fetchNews();
              //window.location.reload('/PublishNews');
              setOpenModal(false);
              setShowAddFormss(true);
              onSuccess();
              
          } else {
            Swal.fire({
                title: "News Update Error",
                icon: "error"
              });
             //console.error('Failed to update data:', response.statusText);
          }
      } catch (error) {
        Swal.fire({
            title: "Error try again later ",
            icon: "error"
          });
          //console.error('Network error:', error);
      }
  };
  
  

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataURL = event.target.result;
                setSelectedImage(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => {
                        setOpenModal(false);
                        setShowAddFormss(true);
                    }}>X</button>
                </div>
                <div className="title">
                    <h1>Edit News</h1>
                </div>
                <div className="form-container">
                    {user && user.token ? (
                      <form className="form" onSubmit={(event) => handleSave(event)}>
                            <div className="input-group">
                                <TextField
                                    label="Title"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    label="Description"
                                    multiline
                                    minRows={3}
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    label="URL"
                                    value={editedLink}
                                    onChange={(e) => setEditedLink(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                               <input
                                accept=".jpg, .jpeg, .png,"
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: 'block', marginTop: '16px' }} // Adjusted display and added marginTop
                            />

                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '16px' }}
                            >
                                Submit/Update
                            </Button>
                        </form>
                    ) : (
                        <div className="not-authorized-message">
                            <p>You need to be logged in to view this content.</p>
                        </div>
                    )}
                </div>
                <div className="footer">
                    <button onClick={() => {
                        setOpenModal(false);
                        setShowAddFormss(true);
                    }} id="cancelBtn">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditNewsModals;
