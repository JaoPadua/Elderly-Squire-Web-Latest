import React, { useEffect,useState } from "react";
import ElderPortalNavbar from "./ElderPortalNavbar";
import { IoIosDocument } from "react-icons/io";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Stack } from '@mui/material';
import './elderPortalDocument.css';
import Footer from "../Footer/Footer";
import Pagination from '@mui/material/Pagination';


function ElderPortalDocuments() {
    const [alignment, setAlignment] = React.useState('web');
    const [docs, setDocsData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    }

    useEffect(() => {
        const fetchDocuments = async() =>{
          const res = await fetch('http://localhost:8080/api/docsRoute/')
          const data = await res.json()
          
          
         /*console.log(data);*/
      
          if(data && res.ok){
            setDocsData(data)
           console.log('data',data)
          }
        }
      
        fetchDocuments()
      },[])

 
      const handleDownloadClick = async (pdfUrl, pdfTitle) => {
        try {
            const res = await fetch(pdfUrl);
            const blob = await res.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${pdfTitle}.pdf`;
            link.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

      //paginations

      const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const totalPages = Math.ceil(docs.length / itemsPerPage);

    const lastIndex = currentPage * itemsPerPage;

    const firstIndex = lastIndex - itemsPerPage;

    const currentDocs = docs.slice(firstIndex, lastIndex);




    return (
        <div>
            <ElderPortalNavbar />
            <div className="documentContainer">
                <h3>
                    <IoIosDocument />
                    Documents
                </h3>
            </div>
            <div className="tableFormat">
                <TableContainer component={Paper} sx={{ maxWidth: 1300, margin: 'auto', padding: '20px', borderRadius: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>PDF File</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentDocs.map((document) => (
                                <TableRow key={document._id}>
                                    <TableCell>{document.title}</TableCell>
                                    <TableCell>{document.descriptions}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleDownloadClick(document.pdfDocuments.url,document.title)}>
                                            Download PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="paginationContainer">
                <Stack spacing = {2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    showFirstButton 
                    showLastButton
                    shape="rounded"
                    color = "primary"
                   
                />
                </Stack>
            </div>
            {/*<div className="footerWrapper">
                <Footer />
            </div>*/}
        </div>
    );
}


export default ElderPortalDocuments