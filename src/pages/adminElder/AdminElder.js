import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/admin-navbar/AdminNavbar'
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
import ReactPaginate from 'react-paginate';
import { useAuthContext } from '../../hooks/useAuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button'
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import {format} from 'date-fns'


function AdminElder() {
  const [elders, setElders] = useState([1])
  const [pageNumber,setPageNumber] = useState(0)
  const [eldersIDtoDelete, setEldersIdToDelete] = useState(null);
  const [open, setOpen ]= React.useState(false)

  const [query, setQuery] = useState("");
  //const [data, setData] = useState([]);
  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);

 

  const {user} = useAuthContext()

  const eldersPerPage = 10;
  const pagesVisited = pageNumber * eldersPerPage;
  
  
  useEffect(() => {
    const fetchSearchElder = async () => {
      try {
        const res = await fetch(`https://teal-cape-buffalo-sock.cyclic.app/api/elderRoute/search?q=${query}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        });
  
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
  
        const data = await res.json();
        //console.log(data)
        setElders(data);
      } catch (error) {
        console.error('Error in fetchSearchElder:', error);
      }
    };
  
    if (query.length === 0 || query.length > 2)
      fetchSearchElder();
    
  }, [query]);

  //get/display all created news
  /*useEffect(() => {
    const fetchElders = async() =>{
      const res = await fetch(`http://localhost:8080/api/elderRoute`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      })
      const json = await res.json()
      
      console.log(json);
  
      if(res.ok){
      
        
        setElders(json)
       
      }
      console.log(json)
    }
  
    fetchElders()
  },[])*/

  
  
  //pagination
  const pageCount = Math.ceil(elders?.length / eldersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  //delete Elders
  const handleSnackbarOpen = (message) => {
    console.log('Opening Snackbar with message:', message);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  //deleting Elder
  const deleteElder = async (elderID) => {
    try {
      const response = await fetch(`https://teal-cape-buffalo-sock.cyclic.app/api/elderRoute/${elderID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });


      if (!response.ok) {
        throw new Error('Failed to delete the Elder.');
      }

      // Elders successfully deleted
      handleSnackbarOpen('Elder has been deleted.');
      setOpen(false);
      setSnackbarVisible(true);
    } catch (error) {
      // Handle any errors during deletion
      handleSnackbarOpen('Error deleting the Elders.');
      console.error('Error deleting the Elders:',error);
      
    }
  };

  const dialogOpen = (elderID) => {
    setOpen(true);
    setEldersIdToDelete(elderID)
    
  };
  
  const dialogClose  = () => {
    setOpen(false);
  };

  
  



  return (
    <div className="admin">
    <AdminSidebar />
    <div className="adminContainer">
    <AdminNavbar />
    <Button 
     size = "large"
     variant ="contained"
     /*onClick={() => {
          setModalOpen(true);
        
        }}*/>
      Register Elder
      </Button>
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
      <th>TypeofApplication</th>
      <th>Name</th>
      <th>Address</th>
      <th>YrsofResidenceInManila</th>
      <th>DateofBirth</th>
      <th>Gender </th>
      <th>Age </th>
      <th>Barangay</th>
      <th>Zone </th>
      <th>District</th>
      <th>CivilStatus</th>
      <th>Contact </th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {elders && elders.slice(pagesVisited, pagesVisited + eldersPerPage)
      .map((elders) =>(
        <tr key={elders._id}>
          <td>{elders.TypeofApplication}</td>
          <td>{elders.FirstName} {elders.MiddleName} {elders.SurName}</td>
          <td>{elders.Address}</td>
          <td>{elders.YrsofResidenceInManila}</td>
          <td>
       {elders.DateofBirth
          ? format(new Date(elders.DateofBirth), 'MM/dd/yyyy')
          : 'Invalid Date'}
      </td>
          <td>{elders.Gender}</td>
          <td>{elders.Age}</td>
          <td>{elders.Barangay}</td>
          <td>{elders.Zone}</td>
          <td>{elders.District}</td>
          <td>{elders.CivilStatus}</td>
          <td>0{elders.CellPhoneNumber}</td> 
          <td>
            <span className='actions'>
              <DeleteIcon 
               className="delete-btn"
                onClick={() => dialogOpen(elders._id)}
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
                  onClick={() => deleteElder(eldersIDtoDelete)}
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
</div>
  )
}

export default AdminElder