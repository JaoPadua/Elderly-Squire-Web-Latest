// Logs.js

import React, { useEffect, useState } from 'react';
import './Actionlogs.css'; // Import CSS file
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar';
import { useAuthContext } from '../../hooks/useAuthContext';
import ReactPaginate from 'react-paginate';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import Swal from 'sweetalert2';


function Logs() {
  const [logs, setLogs] = useState([]);
  const {user} = useAuthContext()
  const [deleteIDLogs,setDeleteIDLogs]=useState("")
  const [openDelete,setOpenDelete] = React.useState(false)


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  //    //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount,setPageCount] = useState(0); 


  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  const fetchLogs = async (page) => {
    try {
      const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/getLogs/Logs?page=${page}`,{
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data.logs);
      //console.log('data',data.logs)
      const pageCount = Math.ceil(data.totalLogs /10);
      setPageCount(pageCount);
    } catch (error) {
      console.error('Error fetching logs:', error.message);
    }
  };

  const changePage = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
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

  const dialogOpen = (logsID) => {
    setOpenDelete(true);
    setDeleteIDLogs(logsID)
    
  };
  
  const dialogClose  = () => {
    setOpenDelete(false);
  };

  const deleteLog = async(logsID) =>{
    try {
      
      const response =await fetch(`https://capstone-project-api-backend.vercel.app/api/getLogs/deleteLogs/${logsID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      //console.log('logs',logsID)
      if(!response.ok){
        throw new Error('Failed to delete logs');
      }
      Swal.fire({
        title: "Logs Delete Success",
        icon: "success"
      });
      setOpenDelete(false);
      fetchLogs(currentPage)
    } catch (error) {
      // Handle any errors during deletion
      Swal.fire({
        title: "Error Delete Logs",
        icon: "error"
      });
      console.error('Error deleting the logs:',error);
    }
  }


  return (
    <div className='admin'>
      <AdminSidebar/>
      <div className='adminContainer'>
      <br></br>
      <br></br>
      <br></br>
      <div className='actionlogs-container'>
    <div className='table-wrapper'>
    <table className='activitytable'>
    <thead>
    <tr>
      <th>User</th>
      <th>Action</th>
      <th>Timestamp</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {logs.map(log => (
            <tr key={log._id}>
              <td>{log.user.firstName} {log.user.lastName}</td>
              <td>{log.action}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>
                <span className='actions-button'>
                <DeleteIcon 
                className="delete-btn"
                onClick={() => dialogOpen(log._id)}  
                />
          <Dialog open = {openDelete} onClose={dialogClose} slotProps={{
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
                  onClick={() => deleteLog(deleteIDLogs)}
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
        breakLabel={'...'}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        renderOnZeroPageCount={null}
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
    </div>
  );
}

export default Logs;
