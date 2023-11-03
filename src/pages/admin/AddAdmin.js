import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/admin-navbar/AdminNavbar'
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
import ReactPaginate from 'react-paginate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, Typography } from '@mui/material';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useAuthContext } from '../../hooks/useAuthContext';
import  './addAdmin.css'
import RegisterModals from '../../components/registerModals/RegisterModals';

function AddAdmin() {

    const [admin, setAdmin] = useState([1])
    const [pageNumber,setPageNumber] = useState(0)
    const [adminIdtoDelete, setAdminIdtoDelete] = useState()
    const {user} = useAuthContext()
    
    //components MUI
    const [open, setOpen ]= React.useState(false)
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const adminPerPage = 5;
    const pagesVisited = pageNumber * adminPerPage;

    useEffect(() => {
        const fetchAdmin = async() =>{
          const res = await fetch('https://teal-cape-buffalo-sock.cyclic.app/api/adminRoute/getAdmin')
          const data = await res.json()
          
          console.log(data);
      
          if(data && res.ok){
            setAdmin(data)
           
          }
          console.log(data)
        }
      
        fetchAdmin()
      },[])
        //pagination
      const pageCount = Math.ceil(admin.length / adminPerPage);
    
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };
      
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
      const deleteAdmin = async (adminID) => {
        try {
          const response = await fetch(`https://teal-cape-buffalo-sock.cyclic.app/api/adminRoute/${adminID}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          });
          if (!response.ok) {
            throw new Error('Failed to delete the Admin.');
          }
      
          // News successfully deleted
          handleSnackbarOpen('Admin has been deleted.');
          setOpen(false);
        } catch (error) {
          // Handle any errors during deletion
          handleSnackbarOpen('Error deleting the Admin.');
          console.error('Error deleting the Admin:',error);
          
        }
      };
    
      const dialogOpen = (adminID) => {
        setOpen(true);
        setAdminIdtoDelete(adminID)
        
      };
      
      const dialogClose  = () => {
        setOpen(false);
      };

  return (
    <div className='admin'>
    <AdminSidebar/>

    <div className='adminContainer'>
    <AdminNavbar/>
    <div className='addAdmin'>
    <Button 
     size = "large"
     variant ="contained"
     onClick={() => {
          setModalOpen(true);
        
        }}>
      Register Admin
      </Button>
        <div className="table-container">
          <table className="tbody">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
                 {/* Adjust the column headers as needed */}
              </tr>
            </thead>
            <tbody>
            {admin && admin
    .slice(pagesVisited, pagesVisited + adminPerPage)
    .map((admin) =>(
    <tr key = {admin._id}>
    <td>{admin.firstName} {admin.lastName}</td>
    <td>{admin.email}</td>
    <td>
    <span className='actions'>
    <EditIcon className='edit-btn'
        onClick
    />
     <DeleteIcon 
          className="delete-btn"
          onClick={() => dialogOpen(admin._id)}  
          />
          <Dialog open = {open} onClose={dialogClose}>
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
                  onClick={() => deleteAdmin(adminIdtoDelete)}
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
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
  </div>
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
    {modalOpen && <RegisterModals setOpenModal={setModalOpen}/>}
    </div>
   
  )
}

export default AddAdmin