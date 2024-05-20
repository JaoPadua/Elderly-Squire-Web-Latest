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
import { Snackbar, TextField } from '@mui/material';
import {format} from 'date-fns'
import './AdminElder.css'
import ExportToCSV from './ExportToCSV';
import Swal from 'sweetalert2';



function AdminElder() {
  const [elders, setElders] = useState([1])
  const [pageNumber,setPageNumber] = useState(0)
  const [eldersIDtoDelete, setEldersIdToDelete] = useState(null);
  const [open, setOpen ]= React.useState(false)

  //export State
   // Example headers
   const headers = [
    'BRGY',
    'LAST NAME',
    'FIRST NAME',
    'MIDDLE NAME',
    'SUFFIX',
    'Age',
    'DateOfBirth',
    'STREET NAME',
    'DISTRICT NO.',
    'ZONE',
    'MOBILE NO.',
    'GENDER',
    'VOTER',
];
   const { exportDataToCSV } = ExportToCSV(elders);

 
  
  //const [data, setData] = useState([]);
  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);


   //pagination and searchQuery
   const [currentPage, setCurrentPage] = useState(0);
   const [searchQuery, setSearchQuery] = useState("");
   const [totalPages,setTotalPages] = useState(0); 

  const {user} = useAuthContext()

//pagination

const changePage = (selectedPage) => {
  setCurrentPage(selectedPage.selected + 1);
};


  
  useEffect(() => {
      fetchElder(currentPage);
    
  }, [currentPage,searchQuery]);
  

  //get all pagination and queries
  const fetchElder = async (page) => {
    try {
      const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/elderRoute/?page=${page}&search=${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }

      const data = await res.json();
      //console.log('data',data)
      setElders(data.elders);
      const totalPages = Math.ceil(data.totalElders /10);
      setTotalPages(totalPages)
      //console.log('Elderdata' , data.elders)
      
      //console.log('Elderdata' , data.totalPages)
    } catch (error) {
      //console.error('Error in fetchSearchElder:', error);
    }
  };

 
  
  
  


  //delete Elders
  const handleSnackbarOpen = (message) => {
    //console.log('Opening Snackbar with message:', message);
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
      const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/elderRoute/${elderID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });


      if (!response.ok) {
        throw new Error('Failed to delete the Elder.');
      }

      // Elders successfully deleted
      Swal.fire({
        title: "Elder data delete Success",
        icon: "success"
      });
      setOpen(false);
      setSnackbarVisible(true);
      fetchElder(currentPage)
    } catch (error) {
      // Handle any errors during deletion
      Swal.fire({
        title: "Error deleting ",
        icon: "error"
      });
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
    <AdminNavbar/>
    <br></br>
    <br></br>
      <div className='search-bar'>
      <input
          className="search"
          placeholder="Search Elder..."
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        </div>
         {/* Export button React to Excel*/ }
         <br></br>
         <div className='Export'>
        <ExportToCSV data={elders}/>
          </div>
    <div className='table-wrapper'>

    <table className='table'>
    <thead>
    <tr>
      <th>TypeofApplication</th>
      <th>SurName</th>
      <th>FirstName</th>
      <th>MiddleName</th>
      <th>Suffix</th>
      <th>Address</th>
      <th>YrsofResidenceInManila</th>
      <th>DateofBirth</th>
      <th>Gender </th>
      <th>Age </th>
      <th>Barangay</th>
      <th>Zone </th>
      <th>District</th>
      <th>Status</th>
      <th>CivilStatus</th>
      <th>Contact </th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {elders && elders.map((elders) =>(
        <tr key={elders._id}>
          <td>{elders.TypeofApplication}</td>
          <td>{elders.SurName}</td> 
          <td>{elders.FirstName} </td>
          <td>{elders.MiddleName}</td>
          <td>{elders.Suffix}</td>
          <td>{elders.Address}</td>
          <td>{elders.YrsofResidenceInManila}</td>
          <td>
       {elders.DateOfBirth
          ? format(new Date(elders.DateOfBirth), 'MM/dd/yyyy')
          : 'Invalid Date'}
      </td>
          <td>{elders.Gender}</td>
          <td>{elders.Age}</td>
          <td>{elders.Barangay}</td>
          <td>{elders.Zone}</td>
          <td>{elders.District}</td>
          <td>{elders.Status}</td>
          <td>{elders.CivilStatus}</td>
          <td>+63 {elders.MobilePhone}</td> 
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
        breakLabel={'...'}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disableNext={currentPage === totalPages - 1}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        renderOnZeroPageCount={null}
      />
  </div>
</div>
</div>
  )
}

export default AdminElder