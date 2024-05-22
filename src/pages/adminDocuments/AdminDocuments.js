import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
import AdminNavbar from '../../components/admin-navbar/AdminNavbar';
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
import { useAuthContext } from '../../hooks/useAuthContext';
import MuiAlert from '@mui/material/Alert';
import AddDocuments from "./AddDocumentsModals";
import EditDocumentsModals from './EditDocumentsModals';
import Swal from 'sweetalert2'


function AdminDocuments() {

  const [documents, setDocuments]= useState([])
  const [title, setTitle] = useState('')
  const [docsDescriptions,setDocumentsDescriptions] = useState('')
  const [documentsIDtoDelete, setDocumentsIDtoDelete] = useState(null)
  const {user} = useAuthContext()
  const [showAddForms, setShowAddForms] = useState(true);
  const [open, setOpen ]= React.useState(false)
  const [docsIDtoEdit, setDocsIDtoEdit] =useState()

      //snackbar
      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
      const [snackbarSeverity, setSnackbarSeverity] = useState('success');
      const [modalOpen, setModalOpen] = useState(false)
      const [editmodalOpen,setEditModalOpen] = useState(false)

      const [isSnackbarVisible, setSnackbarVisible] = useState(false);

      //pagination
      const [currentPage, setCurrentPage] = useState(0);
      const [totalPages,setTotalPages] = useState(0); 


      const changePage = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
      };
      

useEffect(() => {
  fetchDocuments(currentPage)
}, [currentPage]);
    
const fetchDocuments  = async (page) =>{
  try {
    const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/docsRoute/docs/?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const data = await res.json();
    //console.log('data',data)
    setDocuments(data.documents);
    const totalPages = Math.ceil(data.totaldocuments /10);
    setTotalPages(totalPages)
    //console.log('documents' , data.documents)
    //console.log('documents' , data.totalPages)
  } catch (error) {
    //console.error('Error in fetchSearchElder:', error);
  }
};





const showPdf = (pdfUrl)=>{
  window.open(pdfUrl,"_blank","noreferrer")
}

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

  const deleteDocuments =async (documentID) =>{
    try {
      const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/docsRoute/${documentID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });


      if (!response.ok) {
        throw new Error('Failed to delete the document.');
      }

      //  successfully deleted
      Swal.fire({
        title: "Documents Delete Success",
        icon: "success"
      });
      setOpen(false);
      setSnackbarVisible(true);
      fetchDocuments(currentPage)
    } catch (error) {
      // Handle any errors during deletion
      Swal.fire({
        title: "Error Deleting Documents",
        icon: "warning"
      });
      console.error('Error deleting the document:',error);
      
    }
  };
  
 
  const dialogOpen = (documentID) => {
    setOpen(true);
    setDocumentsIDtoDelete(documentID)
    //console.log('id',documentID)
    
  };
  
  const dialogClose  = () => {
    setOpen(false);
  };


  const handleAddDocumentsAdded = () => {
    fetchDocuments(currentPage)
};

const handleEditDocumentsAdded = () => {
  fetchDocuments(currentPage)
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
      Add Documents
      </Button>
      </div>

    <div className="admin-table-wrapper">
          <table className="Admin-table">

          <thead>
        <tr>
          <th>Title</th>
          <th>Descriptions</th>
          <th>Documents</th>
          <th>Actions</th>
          {/* Adjust the column headers as needed */}
        </tr>
      </thead>
      <tbody>
        {documents && documents.map((doc) => (
          <tr key={doc._id}>
            <td>{doc.title}</td>
            <td>{doc.descriptions}</td>
            <td>
              <Button
                variant="contained"
                color="primary"
                onClick={() => showPdf(doc.pdfDocuments.url)}
              >
                Show Document
              </Button>
            </td>
            <td>
              <span className='actions'>
              <EditIcon className='edit-btn'
                  onClick={() =>{
                    setEditModalOpen(true)
                    setDocsIDtoEdit(doc._id)
                  }}
                  />
                <DeleteIcon 
                  className="delete-btn"
                  onClick={() => dialogOpen(doc._id)}  
                />
                <Dialog open={open} onClose={dialogClose}  slotProps={{
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
                        size="large"
                        variant="contained"
                        onClick={dialogClose}
                      >
                        Cancel
                      </Button>
                      <Button 
                        startIcon={<DeleteIcon color="white" />}
                        size="large"
                        variant="contained"
                        color="error"
                        onClick={() => deleteDocuments(documentsIDtoDelete)}
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
            pageCount={totalPages}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            renderOnZeroPageCount={null}
              />
          </div>

            </div>
            {modalOpen ? <AddDocuments setOpenModal={setModalOpen} onSuccess={handleAddDocumentsAdded}/> : null}
          {editmodalOpen ? <EditDocumentsModals  docsID={docsIDtoEdit} setOpenEditModal={setEditModalOpen} onSuccess={handleEditDocumentsAdded}/> : null}
    </div>
  )
}

export default AdminDocuments