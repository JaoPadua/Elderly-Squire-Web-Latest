import './admin_IDVerifications.css'
import AdminNavbar from '../../components/admin-navbar/AdminNavbar'
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import SmsIcon from '@mui/icons-material/Sms';
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
import { Checkbox, Input, Snackbar } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';
import Divider from '@mui/material/Divider';
import { InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';




function IDverification()  {

  const [users,setUsers] = useState([1])

  const [modalOpen, setModalOpen] = useState(false)
  const [open, setOpen ]=useState(false)
  const [userIDtoDelete, setUserIdToDelete] = useState(null);
  const [openApprove, setOpenApprove] = useState(false);
  const [userIDtoView, setUserIdToView] =useState();
  const [userIDtoMove, setUserIdToMove] = useState();
 
  
  // handle bulk sms
  const [selectedRows, setSelectedRows] = useState([]);



  //sms
  const [openSMS,setOpenSMS] =useState(false)
  const [SmSPopup ,setSMSPopUP] = useState(null)
  const [sentxt,setSenttxt]= useState("")
  const [messageText,setMessageText] = useState("")
  const [bulkSMSPopup, setBulkSMSPopUp] = useState(null)
  const [openBulkSMS, setOpenBulkSMS] = useState(false)

  const [firstNameSMS, setFirstNameSMS] = useState('');
  const [middleNameSMS, setMiddleNameSMS] = useState('');
  const [lastNameSMS, setLastNameSMS] = useState('');
  const [suffixSMS, setSuffixSMS] = useState('');
  const [mobilePhoneSMS, setMobilePhoneSMS] = useState('');

  //search and paginations

  const [searchQuery, setSearchQuery] = useState("");
  //const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1); 


  //snackBar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const {user} = useAuthContext()



  //paginations
  /*const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  
  const pageCount = Math.ceil(users.length / usersPerPage);*/

  const changePage = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };


    //search api and paginations
    useEffect(() => {
      fetchUsers(currentPage)
     }, [currentPage,searchQuery]);
    
       const fetchUsers = async(page,userID) =>{
         const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/usersRoute/?page=${page}&search=${searchQuery}`, {
           headers: {
             'Authorization': `Bearer ${user.token}`,
           }
         })
        
         //console.log(data);
     
         if(!res.ok){
           throw new Error('Failed to fetch data');      
         }
         const data = await res.json();
        console.log('fetchData' ,data);
         setUsers(data.users);
         const totalPages = Math.ceil(data.totalUsers /10);
         //console.log('setUsers',data.users)
         setTotalPages(totalPages);
       } 

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
      const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/usersRoute/${userID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the user.');
      }
  
      // User successfully deleted
      Swal.fire({
        title: "Elder Delete Success",
        icon: "success"
      });
      fetchUsers(currentPage)
      setOpen(false);
    } catch (error) {
      // Handle any errors during deletion
      Swal.fire({
        title: "Error Elder Delete",
        icon: "error"
      });
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
    const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/elderRoute/move-item/${userID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      })
      if (!response.ok) {
        throw new Error('Failed to Move the Elder.');
      }
      
        // User successfully Moved
        Swal.fire({
          title: "Verified Success",
          icon: "success"
        });
        setOpenApprove(false);
        fetchUsers(currentPage)
    }catch(error){
      // Handle any errors during move
      Swal.fire({
        title: "Error Verifying Elder",
        icon: "error"
      });
      console.error('Error Verifying the user:', error);
    }

  
    };
  

  //sms APi actions
    const PopupSMS = (userID) =>{
      setOpenSMS(true)
      setSMSPopUP(userID)

     fetchUserData(userID);
      
    }
    const fetchUserData = async (userID) => {
      try {
        const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/usersRoute/${userID}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
    
        const userData = await response.json();
        setFirstNameSMS(userData.FirstName);
        setMiddleNameSMS(userData.MiddleName);
        setLastNameSMS(userData.SurName);
        setSuffixSMS(userData.Suffix);
        setMobilePhoneSMS(userData.MobilePhone);
        //console.log('User data:', userData);
        
        // Do something with the user data if needed
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };



    const closePopupSms = ()=>{
        setOpenSMS(false)
    }
    
    const closeBulkPopupSMS = () => {
      setOpenBulkSMS(false);
  };
  

    const submitSMStext = async(userID) =>{
      await sendSMS(userID,messageText)
    }

  
    const sendSMS = async(userID,messageText) =>{
      try{
        const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/smsRoute/sendSmS/${userID}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messageText }),
        })
        
    
        if (res.ok) {
          setMessageText('')
          Swal.fire({
            title: "SMS sent Success",
            icon: "success"
          });
          setOpenSMS(false)
          } else {
              throw new Error('Failed to send message');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to send message. Please try again later.');
        }
    }; 


    //send bulk SMS 
    const handleCheckboxChange = (event, rowId) => {
      if (event.target.checked) {
        setSelectedRows([...selectedRows, rowId]);
      } else {
        setSelectedRows(selectedRows.filter(id => id !== rowId));
      }
    };
    

    const handleSelectAll = event => {
      if (event.target.checked) {
        const allRowIds = users.map(users => users._id);
        setSelectedRows(allRowIds);
      } else {
        setSelectedRows([]);
      }
    };


    const submitbulkSMStext = async() =>{
      await sendSMSbulk(selectedRows,messageText)
    }

    const handleSendSMSBulk = (userID) => {
      //sent bulk messages
      setBulkSMSPopUp(userID)
      setOpenBulkSMS(true);
      // Here, you can access the array of selected user IDs in the selectedRows state
      console.log("Selected User IDs:", selectedRows);
    };

    const sendSMSbulk = async(selectedRows,messageText) =>{
      try{
        const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/smsRoute/sendToMany/${selectedRows}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messageText }),
        })
        
    
        if (res.ok) {
          setMessageText('')
          Swal.fire({
            title: "SMS Bulk sent Success",
            icon: "success"
          });
          console.log('response',res)
          setOpenBulkSMS(false)
          setMessageText('')
          setSelectedRows('')
          } else {
              throw new Error('Failed to send message');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to send message. Please try again later.');
        }
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
          value={searchQuery}
          placeholder="Search Elder..."
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        </div>
        <br></br>
      <div className='smsBulk'>
    <Button variant="contained" color="primary" className="sendbulkSMS-btn" onClick={() => handleSendSMSBulk(users._id)}>
     Send Bulk SMS
    </Button>
    <Dialog open={openBulkSMS} onClose={closeBulkPopupSMS}
     fullWidth maxWidth="md" PaperProps={{ style: { maxHeight: '80vh' } }}
     slotProps={{
              backdrop: {
              style: {
              backgroundColor: 'rgba(52, 52, 52, 0.1)',
                    },
                  },
                }}
    >
    <DialogTitle id="alert-dialog-title">
                Send to Many 
              <Divider />
            </DialogTitle>
           
            <DialogContent>
          <DialogContentText>
          Send Bulk Message: 
          </DialogContentText>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="message"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            rows={3}
          />
        </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeBulkPopupSMS} color ="error" variant='contained'>Cancel</Button>
        <Button type="submit" color="primary" variant='contained'  onClick={() => submitbulkSMStext(bulkSMSPopup)}>
        Send Message
        </Button>
      </DialogActions>
        </Dialog>
        
     </div>
     <br></br>
      {/*<div className='button-container'>
    <Button variant="contained" color="primary" className="approve-button" onClick={() => handleApproveClick(users._id)}>
     Approved
    </Button>
    <Button variant="contained" color="error" className="delete-button" onClick={() => handleSendSMSBulk(users._id)}>
     Delete
    </Button>
     </div>*/}
  <div className='table-wrapper'>
  <table className='table'>
  <thead>
    <tr>
      <th><Checkbox
         onChange={handleSelectAll}
         checked={selectedRows.length === users.length && users.length !== 0}
                  style ={{
                      color: "#FFFFFF",
                    }}
      />Select All</th>
      <th>SurName</th>
      <th>MiddleName</th>
      <th>FirstName</th>
      <th>Suffix</th>
      <th>Age</th>
      <th>Contact</th>
      <th>Address</th>
      <th>Gender</th>
      <th>Years of Residence in Manila</th>
      <th>BirthPlace</th>
      <th>Date of Birth</th>
      <th>Details</th>
      <th>Actions</th>
      <th>SmSActions</th>
    </tr>
  </thead>
  <tbody>
  {users.map((users) =>(
      <tr key ={users._id}>
      <td><Checkbox
         onChange={event => handleCheckboxChange(event, users._id)}
          checked={selectedRows.includes(users._id)}
          style ={{
                      color: "#226FFF",
                    }}
      /></td>
      <td>{users.SurName}</td>
      <td>{users.MiddleName} </td>
      <td> {users.FirstName}</td>
      <td>{users.Suffix}</td>
      <td>{users.Age}</td>
      <td>+63 {users.MobilePhone}</td>
      <td>{users.Address}</td>
      <td>{users.Gender}</td>

      <td>{users.YrsofResidenceInManila} Year/Years</td>
      <td>{users.BirthPlace}</td>
      <td>
       {users.DateOfBirth
          ? format(new Date(users.DateOfBirth), 'MM/dd/yyyy')
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
      <Dialog open={openApprove} onClose={dialogClose}  slotProps={{
        backdrop: {
        style: {
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
              },
            },
          }}
        >
      <DialogTitle id="alert-dialog-title">
                {"Confirm Approval?"}
      </DialogTitle>
        <DialogContent>
        
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
          <Dialog open = {open} onClose={dialogClose} slotProps={{
        backdrop: {
      style: {
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
              },
            },
          }}
        >
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
         <td>
          <span className='actions'>
          <Button variant="contained" color="primary" className="approve-btn" onClick={() => PopupSMS(users._id)}>
          Send SmS
          </Button>
            <Dialog open={openSMS} onClose={closePopupSms}
            fullWidth maxWidth="md" PaperProps={{ style: { maxHeight: '80vh' } }}
             slotProps={{
              backdrop: {
              style: {
              backgroundColor: 'rgba(52, 52, 52, 0.1)',
                    },
                  },
                }}
              >
           <DialogTitle id="alert-dialog-title">
                Send SMS
              <Divider />
            </DialogTitle>
           
            <DialogContent>
          <DialogContentText>
          Send SMS to: 
          </DialogContentText>
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              value={`${lastNameSMS} ${firstNameSMS} ${middleNameSMS} ${suffixSMS}`}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="mobile phone"
              label="Mobile Phone"
              type="number"
              value={mobilePhoneSMS}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    +63
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="message"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            rows={3}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopupSms} color ="error" variant='contained'>Cancel</Button>
        <Button type="submit" color="primary" variant='contained'  onClick={() => 
        submitSMStext(SmSPopup)}>
        Send Message
        </Button>
      </DialogActions>
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
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        breakLabel={"..."}
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

 {modalOpen && <Modals setOpenModal={setModalOpen} userId={userIDtoView}/>}
 </div>
  )  

}
export default IDverification;

