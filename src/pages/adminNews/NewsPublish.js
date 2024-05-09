import React, { useState, useEffect } from 'react'
import "./news.css"
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
import AdminNavbar from '../../components/admin-navbar/AdminNavbar'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReactPaginate from 'react-paginate';
import Dialog from "@mui/material/Dialog";
import EditNewsModals from "../../components/editModals/EditNewsModals";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, Typography,TextareaAutosize } from '@mui/material';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
//import { useNewsContext } from '../../hooks/useNewsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Swal from 'sweetalert2'


function NewsPublish() {

    const [news, setNews] = useState([1])
    const [Title,setTitle] = useState('')
    const [Description,setdescription] = useState('')
    const [link,setlink] = useState('')
    const [Err,setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [newsIDtoView, setNewsIdtoView] =useState();
    const [open, setOpen ]= React.useState(false)
    const [newsIDtoDelete, setNewsIdToDelete] = useState(null);
    const [showAddForms, setShowAddForms] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    //pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0); 

    const {user} = useAuthContext()

    /*const newsPerPage = 2;
    const pagesVisited = pageNumber * newsPerPage;*/

    //add news post
  const handleButton = async (e) =>{
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

    //console.log('Response:', json);  // Log the response

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
      fetchPaginatedNews()
      //console.log('News added', json);
    }
  } catch (error) {
    //console.error('Error:', error.message);
    Swal.fire({
      title: "Error Adding  News",
      icon: "error"
    });
    setError('An error occurred while sending news data.');
  }
};



//get/display all created news

const changePage = (selectedPage) => {
  setCurrentPage(selectedPage.selected + 1);
};


    useEffect(() => {
       fetchPaginatedNews(currentPage)
      },[currentPage])

      //fetch news
      const fetchPaginatedNews = async(page) =>{
        try {
          const res = await fetch(`http://localhost:8080/api/newsRoute/News/?page=${page}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          });
      
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
      
         const data = await res.json()
          console.log('News', data);
          setNews(data.news);
          const pageCount = Math.ceil(data.totalNews/2);
          setTotalPages(pageCount);
          //console.log('setNews', data.news);
          //console.log('fetchTotalPages',data.totalPages)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }


      //delete News
      const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
      };
      
      const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
      };
      const deleteNews = async (newsID) => {
        try {
          const response = await fetch(`http://localhost:8080/api/newsRoute/${newsID}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          });
          if (!response.ok) {
            throw new Error('Failed to delete the News.');
          }
      
          // News successfully deleted
          Swal.fire({
            title: " Success Deleting News",
            icon: "success"
          });
          setOpen(false);
          fetchPaginatedNews(currentPage)
        } catch (error) {
          // Handle any errors during deletion
          Swal.fire({
            title: "Error Deleting News",
            icon: "error"
          });
          //console.error('Error deleting the News:',error);
          
        }
      };
    
      const dialogOpen = (newsID) => {
        setOpen(true);
        setNewsIdToDelete(newsID)
        
      };
      
      const dialogClose  = () => {
        setOpen(false);
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
            //console.log('Base64 image:', base64Image);
            // Now you can set the base64 image in state or use it as needed
          };
          reader.readAsDataURL(file);
        }
      };
      
      //show forms after modals close
      const handleCloseModals = () => {
        setShowAddForms(true); // Set showAddForms to true
        // Other necessary logic for modal closure
      };
      

  
  return (
    <div className='admin'>
    <AdminSidebar/>

    <div className='adminContainer'>
    <AdminNavbar/>
    <div className='containerr'>
    <div className='table-wrapper'>
    <table className='newstable'>
    <thead>
    <tr>
      <th>Title</th>
      <th>Descriptions</th>
      <th>Url</th>
      <th>image</th>
      <th>Actions</th>
    </tr>
  </thead>
    <tbody>
    {news && news.map((news) =>(
    <tr key = {news._id}>
    <td>{news.Title}</td>
    <td>{news.Description}</td>
    <td>  {news.link && (
          <a href={news.link} target="_blank" rel="noopener noreferrer">
            {news.link}
        </a>
    )}</td>
    <td>
    {news.img && (
          <img src={news.img} alt="News img" />
        )}
    </td>
    <td>
    <span className='actions'>
    <EditIcon className='edit-btn'
        onClick={() => {
          setModalOpen(true);
          setNewsIdtoView(news._id)
          setShowAddForms(false);
       
        }}
    />
     <DeleteIcon 
          className="delete-btn"
          onClick={() => dialogOpen(news._id)}
          />
          <Dialog open = {open} onClose={dialogClose} slotProps={{
                  backdrop: {
                  style: {
                  backgroundColor: 'rgba(52, 52, 52, 0.1)',
                        },
                      },
                    }}>
          <DialogTitle id="alert-dialog-title">
                {"Confirm Deletion?"}
              </DialogTitle>
            <DialogContent>
              <DialogContentText fontSize={22} color="black">
                Are you sure you want to permanently remove this?
              </DialogContentText>
                <DialogActions>
                  <Button 
                  size = "large"
                  variant ="contained"
                  onClick = {dialogClose}
                  >
                  Cancel
                  </Button>
                  <Button 
                  startIcon={<DeleteIcon
                  color  = "white" />}
                  size = "large"
                  variant ="contained"
                  color = "error"
                  onClick={() => deleteNews(newsIDtoDelete)}
                  >
                  Delete
                  </Button>
                </DialogActions>
            </DialogContent>
          </Dialog>
    </span>
    </td>
  </tr>
    ))}
  </tbody>
    </table>
    </div>
    <div className='paginate'>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          breakLabel="..."
          renderOnZeroPageCount={null}
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disableNext={currentPage === totalPages - 1}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
    </div>
 
  {showAddForms && (
  <div className='addforms'>
    <form onSubmit={handleButton}>
      <div style={{ marginBottom: '10px' }}>
        <Typography variant="h6">Add News</Typography>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          fullWidth
          margin="dense"
          autoFocus
          label="Title"
          name="title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Description"
          name="description"
          value={Description}
          inputProps={{ maxLength: 100 }}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          fullWidth
          label="URL"
          name="url"
          value = {link}
          onChange={(e) => setlink(e.target.value)}
        />
      </div>
      {/*selectedImage && (
          <div>
          <p>Selected Image: {selectedImage.name}</p>
            <img
              src={selectedImage}
              alt="Selected Image"
              style={{ maxWidth: '30%', maxHeight: '30%' }}
               // Adjust the size as needed
            />
          </div>
        )*/}
      <div style={{ marginBottom: '10px' }}>
      <TextField
        fullWidth
        id="image-upload-button"
        InputProps={{
          inputComponent: 'input',
          inputProps: {
            type: 'file',
            accept: 'image/*',
            onChange: handleImageUpload,
          },
        }}
        variant="outlined"
      />
        {/*<label htmlFor="image-upload-button">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>*/}
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  </div>
)}
      <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={handleSnackbarClose}
                  severity={snackbarSeverity}  // Change the severity based on your use case
                >
                  {snackbarMessage}
                </MuiAlert>
              </Snackbar>
              
    
    </div>
   </div>
   {modalOpen && <EditNewsModals setOpenModal={setModalOpen} newsId={newsIDtoView} setShowAddFormss={setShowAddForms}/>}
    </div>
   
  )
}

export default NewsPublish