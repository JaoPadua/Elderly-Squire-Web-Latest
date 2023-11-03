import './admin_IDVerifications.css'
import AdminNavbar from '../../components/admin-navbar/AdminNavbar'
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import React from 'react'
import { useEffect,useState } from 'react';
import ReactPaginate from 'react-paginate';
import Modals from "../../components/Modals/Modals";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button'
import MuiAlert from '@mui/material/Alert';
import {format} from 'date-fns'
import { Snackbar } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';



function IDverification()  {

  const [users,setUsers] = useState([1])
  const [pageNumber,setPageNumber] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [userIDtoDelete, setUserIdToDelete] = useState(null);
  const [open, setOpen ]= React.useState(false)
  const [openApprove, setOpenApprove] = useState(false);
  const [userIDtoView, setUserIdToView] =useState();
  const [userIDtoMove, setUserIdToMove] = useState();

  //search
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
  const {user} = useAuthContext()




  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  //const dateformatted = format(date,"MM/DD/yyyy")


  
  /*useEffect(() => {
    const fetchUsers = async() =>{
      const res = await fetch('http://localhost:8080/api/usersRoute/', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      })
     
      //console.log(data);
  
      if(!res.ok){
        throw new Error('Failed to fetch data');    
      }
      const data = await res.json();
      //console.log(data);
      setUsers(data);
    }

    if(user && user.token){
      fetchUsers()
    }
    
  },[user])*/

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //deleteUsers

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
  
  const deleteUser = async (userID) => {
    try {
      const response = await fetch(`https://teal-cape-buffalo-sock.cyclic.app/api/usersRoute/${userID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the user.');
      }
  
      // User successfully deleted
      handleSnackbarOpen('User has been deleted.');
      setOpen(false);
    } catch (error) {
      // Handle any errors during deletion
      handleSnackbarOpen('Error deleting the user.');
      console.error('Error deleting the user:', error);
    }
  };
  


  const dialogOpen = (userID) => {
    setOpen(true);
    setUserIdToDelete(userID)
    
  };
  
  const dialogClose  = () => {
    setOpen(false);
    setOpenApprove(false);
  };

  const handleApproveClick = (userID) => {
    setOpenApprove(true);
    setUserIdToMove(userID);
    // Do something with the userId for approving
  };
 
  //user getting moved to Verified List

 
    const moveElder =  async (userID) => {
    
      try{
    const response = await  fetch(`https://teal-cape-buffalo-sock.cyclic.app/api/elderRoute/move-item/${userID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      })
      if (!response.ok) {
        throw new Error('Failed to Move the Elder.');
      }
      
        // User successfully Moved
        handleSnackbarOpen('User has been Moved.');
        setOpenApprove(false);
    }catch(error){
      // Handle any errors during move
      handleSnackbarOpen('Error Verifying the user.');
      console.error('Error Verifying the user:', error);
    }

  
    };
  
  //search api
  useEffect(() => {
    const fetchSearchUsers = async() =>{
      const res = await fetch(`https://teal-cape-buffalo-sock.cyclic.app/api/usersRoute/search?q=${query}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      })
     
      //console.log(data);
  
      if(!res.ok){
        throw new Error('Failed to fetch data');    
      }
      const data = await res.json();
      //console.log(data);
      setUsers(data);
    }

    if (query.length === 0 || query.length > 2)
      fetchSearchUsers();
    
    
  },[query])

  return (
<div className="admin">
<AdminSidebar />
<div className="adminContainer">
<AdminNavbar />

    <div className='search-bar'>
      <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        </div>
  <div className='table-wrapper'>
  <table className='table'>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Contact</th>
      <th>Address</th>
      <th>Gender</th>
      <th>Years of Residence in Manila</th>
      <th>BirthPlace</th>
      <th>Date of Birth</th>
      <th>Details</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  { users && users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((users) =>(
    <tr key ={users._id}>
    <td>{users.FirstName} {users.MiddleName} {users.SurName}</td>
      <td>{users.Age}</td>
      <td>+63 {users.CellPhoneNumber}</td>
      <td>{users.Address}</td>
      <td>{users.Gender}</td>

      <td>{users.YrsofResidenceInManila} Year/Years</td>
      <td>{users.BirthPlace}</td>
      <td>
       {users.DateofBirth
          ? format(new Date(users.DateofBirth), 'MM/dd/yyyy')
          : 'Invalid Date'}
      </td>
      <td>
      <span className='details'>
        <InfoIcon 
        className="view-btn"
        onClick={() => {
          setModalOpen(true);
          setUserIdToView(users._id)
        }}
         />
        </span>
      </td>
         <td>

         <span className='actions'>
        <CheckCircleIcon
         className="approve-btn"
          onClick={() => handleApproveClick(users._id)}
         />
      <Dialog open={openApprove} onClose={dialogClose}>
      <DialogTitle id="alert-dialog-title">
                {"Confirm Approval?"}
      </DialogTitle>
        <DialogContent  className='transparentBackground'>
          <DialogContentText fontSize={22} color="black">
          Are you sure you want to Approved this applicant?
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
            startIcon={<VerifiedIcon
              color  = "white" />}
              size='large'
              variant='contained'
              color='success'
              onClick={() => moveElder(userIDtoMove)}
            >
            Approved
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

        <DeleteIcon 
          className="delete-btn"
          onClick={() => dialogOpen(users._id)}
          />
          <Dialog open = {open} onClose={dialogClose}>
          <DialogTitle id="alert-dialog-title">
                {"Confirm Deletion?"}
            </DialogTitle>
            <DialogContent  style={{ backgroundColor: 'transparent' }}>
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
                  onClick={() => deleteUser(userIDtoDelete)}
                  >
                  Delete
                  </Button>
                </DialogActions>
            </DialogContent>
          </Dialog>
          <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={handleSnackbarClose}
                  severity="success"  // Change the severity based on your use case
                >
                  {snackbarMessage}
                </MuiAlert>
              </Snackbar>
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
</div>

 {modalOpen && <Modals setOpenModal={setModalOpen} userId={userIDtoView}/>}
 </div>
  )  

}
export default IDverification;

