import React from "react";
import "./Modals.css";
import {useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button } from "@mui/material";

function Modals({ setOpenModal,userId }) {
    const [users,setUsers] = useState([])
    const {user} = useAuthContext()
    const [pdfFIle, setPdfFile] = useState(null)

    useEffect(() => {
      //console.log("user",userId)
      //console.log("users", users)
      const fetchUserById = async () => {
         // Replace with the actual user ID you want to fetch
    
        try {
          const res = await fetch(`https://capstone-project-api-backend.vercel.app/api/usersRoute/${userId}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });          
          const data = await res.json();
    
          //console.log(data);
          if (res.ok) {
            // Check if data is an array or an object
            if (Array.isArray(data)) {
              // Assuming data is an array, use the first element
              setUsers(data[0]);
            } else if (typeof data === 'object' && data !== null) {
              // Assuming data is an object
              setUsers(data);
            } else {
              console.error('Unexpected data format:', data);
            }
          }
        } catch (error) {
          console.error('Error fetching user by ID:', error);
        }
      };
  
    
      fetchUserById();
    }, [userId]);
  

    const showPdf = (pdfUrl)=>{
      window.open(pdfUrl,"_blank","noreferrer")
      //setPdfFile(`http://localhost:8080/uploads/${ProofOfValidID}`)
    }

    // open pdf with title name 
{/*const downloadPdf = (pdfUrl, filename) => {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = filename;
  link.click();
};

const handleDownloadClick = (ProofOfValidID, SurName,FirstName,MiddleName) => {
  const pdfTitle = `${SurName}, ${FirstName}, ${MiddleName}`;
  downloadPdf(ProofOfValidID, `${pdfTitle}.pdf`);
};*/}


  
    return (
      <div className="modalBackgroundDetails">
        <div className="modalContainerDetails">
          <div className="titleCloseBtn">
            <button onClick={() => setOpenModal(false)}>X</button>
          </div>
          <div className="title">
            <h1>Elder details</h1>
          </div>
          <div className="table-containerDetails">
          {user && user.token ? ( // Check if user is authenticated
            <table className="tbody">
              <thead>
              <tr>
                <th>Name</th>
                <th>TypeofApplication</th>
                <th>Nationality</th>
                <th>Barangay</th>
                <th>Zone</th>
                <th>District</th>
                <th>CivilStatus</th>
                <th>Status</th>
                <th>ValidID</th>
                <th>Proof of ValidID</th>  {/* Adjust the column headers as needed */}
              </tr>
              </thead>
              <tbody>
                {users ? (
                  <tr key={users._id}>
                  <td>{users.SurName} {users.FirstName}  {users.MiddleName}  {users.Suffix}</td>
                  <td>{users.TypeofApplication}</td>
                  <td>{users.Nationality}</td>
                  <td>{users.Barangay}</td>
                  <td>{users.Zone}</td>
                  <td>{users.District}</td>
                  <td>{users.CivilStatus}</td>
                  <td>{users.Status}</td>
                  <td>{users.ValidIdPresented}</td>
                  <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => showPdf(users.ProofOfValidID.url)}
                  >
                    Show Proof of Valid ID
                    </Button>
                  </td>
                  </tr>
                ) : (
                  <tr>
                    <td>No user data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <div className="not-authorized-message">
              <p>You need to be logged in to view this content.</p>
            </div>
          )}
          </div>
          <div className="footer">
            <button onClick={() => setOpenModal(false)} id="cancelBtn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

export default Modals;
