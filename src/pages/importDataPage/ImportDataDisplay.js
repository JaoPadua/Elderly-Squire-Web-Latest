  import React from 'react'
  import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
  import AdminNavbar from '../../components/admin-navbar/AdminNavbar'
  import { useState,useEffect } from 'react';
  import * as XLSX from 'xlsx';
  import { Button } from '@mui/material';
  import { useAuthContext } from '../../hooks/useAuthContext';
  import ReactPaginate from 'react-paginate';
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
  import DialogActions from "@mui/material/DialogActions";
  import DialogContent from "@mui/material/DialogContent";
  import DialogContentText from "@mui/material/DialogContentText";
  import DialogTitle from "@mui/material/DialogTitle";
  import { Snackbar } from '@mui/material';
  import MuiAlert from '@mui/material/Alert';
  import Dialog from "@mui/material/Dialog";
  import EditImportModals from "../importDataPage/EditImportModals";
import Swal from 'sweetalert2';


  function ImportDataDisplay() {

    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [elders, setElders] = useState([1])
    const [modalOpen, setModalOpen] = useState(false)
    const [elderIDtoView, setElderIDtoView] =useState();
    const [elderIDtoDelete, setElderIDtoDelete] = useState()
    const [open, setOpen ]= React.useState(false)
    
    
      //snackbar
      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
      const [snackbarSeverity, setSnackbarSeverity] = useState('success');


      //paginations and search QUery
      const [searchQuery, setSearchQuery] = useState("");

      const [currentPage, setCurrentPage] = useState(0);
      const [totalPages,setTotalPages] = useState(0); 

    const {user} = useAuthContext()



  const changePage = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  //fetch Imported ElderAPI

  useEffect(() => {
    fetchElders(currentPage)
    //console.log(currentPage)
  },[currentPage,searchQuery])

  const fetchElders = async(page) =>{
    try {
      const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/importRoute/?page=${page}&search=${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
     const data = await res.json()
     
      setElders(data.elders);
      //console.log('elder',data);
      //console.log('data',data.elders)
      const pageCount = Math.ceil(data.totalElders/10);
      setTotalPages(pageCount);
      //console.log('ImportElders', data.elders);
      //console.log('setImportElders', elders);
      //console.log('fetchTotalPages',data.totalPages)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  


 // file upload of excel
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
  setData(null); // Clear previous data

  const reader = new FileReader();
  reader.onload = (e) => {
    const binaryData = e.target.result;
    const workbook = XLSX.read(binaryData, { type: 'binary', cellDates: true, raw: true });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true, defval: '' });
    
    // Log the raw parsed data
    //console.log('Raw Parsed Data:', parsedData);
    
    // Preserve leading zeros by converting each cell to string
    const parsedDataWithLeadingZeros = parsedData.map(row => row.map(cell => String(cell)));
    
    setData(parsedDataWithLeadingZeros);
  };

  reader.readAsBinaryString(e.target.files[0]);
};

    


const handleUpload = () => {
  if (!data) {
    Swal.fire({
      title: "Select an excel first",
      icon: "warning"
    });
    return;
  }
  if (file) {
    // Read the Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Parse the Excel data
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);

        // Convert the CSV data to a Blob
        const blob = new Blob([csvData], { type: 'text/csv' });
        const formData = new FormData();
        formData.append('file', blob, file.name.replace(/\.[^/.]+$/, '.csv'));

        // Perform the file upload to the API
        fetch('https://capstone-project-api-backend.vercel.app/api/importRoute/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        })
          .then((response) => response.json())
          .then((result) => {
            // Handle the API response, e.g., update the state or show a success message
            Swal.fire({
              title: "Import Data Success",
              icon: "success"
            });
            //console.log('data',result)
            setFile(null)
            fetchElders(currentPage)
            //console.log(result);
          })
          .catch((error) => {
            // Handle errors
            //console.error('Error uploading file:', error);
          });
      } catch (error) {
        // Handle any unexpected errors related to the Excel parsing
        console.error('Unexpected error during Excel parsing:', error);
      }
    };

    // Read the file as binary data
    reader.readAsBinaryString(file);
  }
};


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
    const deleteElder = async (ImportDataID) => {
      try {
        const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/importRoute/${ImportDataID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete Elder.');
        }
    
        // News successfully deleted
        Swal.fire({
          title: "Delete Success",
          icon: "success"
        });
        setOpen(false);
        fetchElders(currentPage)
      } catch (error) {
        // Handle any errors during deletion
        Swal.fire({
          title: "Error Deleting data",
          icon: "error"
        });
        console.error('Error deleting the Elder:',error);
        
      }
    };

    const dialogOpen = (elderID) => {
      setOpen(true);
      setElderIDtoDelete(elderID)
      
    };
    
    const dialogClose  = () => {
      setOpen(false);
    };



    return (
      <div className='admin'>
      <AdminSidebar/>
      <div className='adminContainer'>
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
      <div className='importtitle'>
      <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} />
      <Button variant='contained' className='uploadButton' onClick={handleUpload}>Upload</Button>
      </div>
      <div className='table-wrapper'>
      <h2>Data from Excel:</h2>
            <table className='table'>
              <thead>
              <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Suffix</th>
              <th>Barangay</th>
              <th>DateofBirth</th>
              <th>Address</th>
              <th>District</th>
              <th>Mobile No.</th>
              <th>OSCA ID No.</th>
              <th>Gender</th>
              <th>Voter</th>
              <th>Status</th>
              <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {elders ? (elders.map((importElder) => (
                    <tr key={importElder._id}>
                    <td>{importElder['LAST NAME']}</td>
                    <td>{importElder['FIRST NAME']} </td>
                    <td>{importElder['MIDDLE NAME']}</td>
                    <td>{importElder.SUFFIX}</td>
                    <td>{importElder.BRGY}</td>
                    <td>{importElder['BIRTH MONTH']}/{importElder['BIRTH DAY']}/{importElder['BIRTH YEAR']}</td>
                    <td>{importElder['STREET NAME']}</td>
                    <td>
                    {importElder['DISTRICT NO'] && importElder['DISTRICT NO']['']}
                    </td>
                    <td>
                    +63 {importElder['MOBILE NO'] && importElder['MOBILE NO']['']}

                    </td>
                    <td>{importElder['OSCA ID NO'] && importElder['OSCA ID NO']['']}</td>
                    <td>{importElder.GENDER}</td>
                    <td>{importElder.VOTER}</td>
                    <td>{importElder.STATUS}</td>
                    <td>
                    <span className='actions'>
                    <EditIcon className='edit-btn'
                    onClick={() => {
                      setModalOpen(true);
                      setElderIDtoView(importElder._id);
                          }}
                      />
                    <DeleteIcon 
                    className="delete-btn"
                    onClick={() => dialogOpen(importElder._id)}
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
                    onClick={() => deleteElder(elderIDtoDelete)}
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
                    severity={snackbarSeverity}  // Change the severity based on your use case
                  >
                    {snackbarMessage}
                  </MuiAlert>
                </Snackbar>
                    </span>
                    </td>
                  </tr>
              ))
                ): (
                <tr>
                  <td colSpan="12">No data available</td>
                </tr>
                )}
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
      </div>
      {modalOpen && <EditImportModals setOpenModal={setModalOpen} elderID={elderIDtoView}/>}
      </div>
    )
  }

  export default ImportDataDisplay