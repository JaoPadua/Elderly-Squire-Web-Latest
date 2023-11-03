import React from 'react'
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar'
import AdminNavbar from '../../components/admin-navbar/AdminNavbar'
import { useState,useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';
import ReactPaginate from 'react-paginate';
import DeleteIcon from '@mui/icons-material/Delete';

function ImportDataDisplay() {

  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [importElder, setImportElder] = useState([1])
  const [pageNumber,setPageNumber] = useState(0)

  const {user} = useAuthContext()

  const eldersPerPage = 10;
  const pagesVisited = pageNumber * eldersPerPage;

//pagination
const pageCount = Math.ceil(importElder?.length / eldersPerPage);
const changePage = ({ selected }) => {
  setPageNumber(selected);
};

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setData(null); // Clear previous data

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(parsedData);
    };

    reader.readAsArrayBuffer(e.target.files[0]);
  };

  
    

  const handleUpload = () => {
    if (!data) {
      alert('Please select an Excel file first.');
      return;
    }
    if (file) {
      // Perform the file upload to the API
      const formData = new FormData();
      formData.append('file', file);
    
      try {
        fetch('https://teal-cape-buffalo-sock.cyclic.app/api/importRoute/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        })
          .then((response) => response.json())
          .then((result) => {
            // Handle the API response, e.g., update the state or show a success message
            alert("Succesfully Imported Data")
            console.log(result);
          })
          .catch((error) => {
            // Handle errors
            console.error('Error uploading file:', error);
          });
      } catch (error) {
        // Handle any unexpected errors related to the fetch request
        console.error('Unexpected error during file upload:', error);
      }
    }
    



  }

  useEffect(() => {
    const fetchImportElders = async() =>{
      const res = await fetch('https://teal-cape-buffalo-sock.cyclic.app/api/importRoute/', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      })
      const json = await res.json()
      
      console.log(json);
  
      if(res.ok){
      
        
        setImportElder(json)
       
      }
      console.log(json)
    }
  
    fetchImportElders()
  },[user.token])


  return (
    <div className='admin'>
    <AdminSidebar/>
    <div className='adminContainer'>
    <AdminNavbar/>
    <div className='title'>
    <input type="file" onChange={handleFileChange} />
    <Button variant='contained' className='uploadButton' onClick={handleUpload}>Upload</Button>
    </div>
    <h2>Data from Excel:</h2>
          <table className='table'>
            <thead>
            <th>Name</th>
            <th>Barangay</th>
            <th>DateofBirth</th>
            <th>Address</th>
            <th>District</th>
            <th>DistrictName</th>
            <th>Mobile No.</th>
            <th>OSCA ID No.</th>
            <th>Gender</th>
            <th>Voter</th>
            <th>Status</th>
            </thead>
            <tbody>
            {importElder && importElder.slice(pagesVisited, pagesVisited + eldersPerPage)
              .map((importElder, index) => (
                <tr key={importElder._id}>
                  <td>{importElder['FIRST NAME']} {importElder['MIDDLE NAME']} {importElder['LAST NAME']}</td>
                  <td>{importElder.BRGY}</td>
                  <td>{importElder['BIRTH MONTH']}/{importElder['BIRTH DAY']}/{importElder['BIRTH YEAR']}</td>
                  <td>{importElder['STREET NAME']}</td>
                  <td>
                    {/*importElder['DISTRICT NO'] && typeof importElder['DISTRICT NO'] === 'string'
                      ? importElder['DISTRICT NO'].trim().split(" ")[1] // Extract the "6" part
                      : 'N/A'*/}
                  </td>
                  <td>{importElder['DISTRICT NAME']}</td>
                  <td>
                    {/*importElder['MOBILE NO'] && typeof importElder['MOBILE NO'] === 'string'
                      ? importElder['MOBILE NO'].trim().split(" ")[1]
                      : 'N/A'*/}
                  </td>
                  <td>{/*importElder['OSCA ID NO']*/}</td>
                  <td>{importElder.GENDER}</td>
                  <td>{importElder.VOTER}</td>
                  <td>{importElder.STATUS}</td>
                </tr>
               ))}

            </tbody>
            </table>
    </div>
    </div>
  )
}

export default ImportDataDisplay