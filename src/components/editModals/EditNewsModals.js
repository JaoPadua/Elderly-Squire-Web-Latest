import React from 'react'
import "./editModals.css";
import {useState , useEffect} from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


function EditNewsModals({setOpenModal, newsId, title, description, link, image, onSave,setShowAddFormss}) {
    const [news,setNews] = useState([])
    const {user} = useAuthContext()
    const [editedTitle, setEditedTitle] = useState(news.Title);
    const [editedDescription, setEditedDescription] = useState(news.Description);
    const [editedLink, setEditedLink] = useState(news.link);
    //const [editedImage, setEditedImage] = useState(news.img);
    const [selectedImage, setSelectedImage] = useState(news.img);
    /*const [values , setValues] =useState({
    Title: title,
    Description: description,
    link:link,
   })*/
   

    useEffect(() => {
        //console.log("newsId",newsId)
        const fetchNewsById = async () => {
           // Replace with the actual news ID you want to fetch
      
          try {
            const res = await fetch(`http://localhost:8080/api/newsRoute/${newsId}`, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            });          
            const data = await res.json();
      
            console.log(data);
            if (res.ok) {
              // Check if data is an array or an object
              if (Array.isArray(data)) {
                // Assuming data is an array, use the first element
                setNews(data[0]);

              } else if (typeof data === 'object' && data !== null) {
                // Assuming data is an object
                setNews(data);
                /*setValues({
                  Title: data.Title,
                  Description: data.Description,
                  link: data.link,
                });*/
              } else {
                console.error('Unexpected data format:', data);
              }
            }
          } catch (error) {
            console.error('Error fetching user by ID:', error);
          }
        };
    
      
        fetchNewsById();
      }, [newsId]);


      const handleSave = () => {
        //onSave(newsId, editedTitle, editedDescription, editedlink, editedImage);
        setOpenModal(false);
      };
      
      const handleTitleChange = (value) => {
        //setValues({ ...values, Title: value });
      };
    
      const handleDescriptionChange = (value) => {
        //setValues({ ...values, Description: value });
      };
    
      const handleLinkChange = (value) => {
        //setValues({ ...values, link: value });
      };
    
      const handleImageChange = (file) => {
        //setEditedImage(file);
      };

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

  return (
    <div className="modalBackground">
    <div className="modalContainer">
      <div className="titleCloseBtn">
      <button onClick={() => 
        {setOpenModal(false)
        setShowAddFormss(true)
        }}>X</button>
      </div>
      <div className="title">
        <h1>Edit News</h1>
      </div>
      <div className="form-container">
      {user && user.token ? ( // Check if user is authenticated
      <form className="form" onSubmit={handleSave}>

        <div className="input-group">
                  <TextField
                    label="Title"
                    name="title"
                    value={[news.Title,editedTitle]}
                    onChange={(e) => setEditedTitle( e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={[news.Description,editedDescription]}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    label="URL"
                    name="url"
                    value={[news.link,editedDescription]}
                    onChange={(e) => setEditedLink(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                  <input
                    accept="image/*"
                    type="file"
                    name="image"
                    onChange={(e) => handleImageUpload(e)}
                    style={{ display: 'none' }}
                  />
                 {selectedImage && (
                      <div>
                      <p>Selected Image: {selectedImage.name}</p>
                        <img
                          src={selectedImage}
                          alt="Selected Image"
                          style={{ maxWidth: '30%', maxHeight: '30%' }}
                          // Adjust the size as needed
                        />
                      </div>
                    )}
                <label htmlFor="image-input">
                    <Button variant="outlined" component="span">
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
        <button onClick={() => 
        {setOpenModal(false)
        setShowAddFormss(true)
        }} id="cancelBtn">
          Cancel
        </button>
      </div>
    </div>
  </div>
);
}

export default EditNewsModals