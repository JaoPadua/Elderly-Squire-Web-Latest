import React, { useEffect, useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext';
import { Box, Typography, Grid, TextField } from "@mui/material";
import ElderPortalNavbar from "./ElderPortalNavbar";
import PersonIcon from "@mui/icons-material/Person";
import { MdEmail } from "react-icons/md";
import "./elderPortalProfile.css";

function ElderPortalProfile() {
    const [elder, setElder] = useState(null);
    const [error, setError] = useState('');
    const { elderUser } = useAuthContext();

    useEffect(() => {
        const fetchElderDetails = async () => {
            if (!elderUser.elderID) return; // Ensure there's an elder ID
            try {
                const response = await fetch(`https://capstone-project-api-backend.vercel.app/api/elderPortal/elderProfile/${elderUser.elderID}`, {
                    headers: {
                        'Authorization': `Bearer ${elderUser.token}`
                    }
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Failed to fetch details");
                setElder(data);
            } catch (error) {
                console.error('Error fetching Elder by ID:', error);
                setError('Failed to load profile data.');
            }
        };

        fetchElderDetails();
    }, [elderUser.elderID, elderUser.token]);

    if (error) return <div>Error: {error}</div>;
    if (!elder) return <div>Loading...</div>;

    return (
        <div>
            <ElderPortalNavbar />
            <div className="container-fluid">
                <div className="titleHolder">
                    <Typography component="h1" variant="h5">PROFILE</Typography>
                    <div className="cards__container">
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: "2rem" }}>
                            <Typography variant="h6" gutterBottom>
                                <PersonIcon /> Personal Details
                            </Typography>
                            <Box noValidate component='form' sx={{ width: '100%', mt: '2rem' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField label="Last Name" value={elder.lastName || ''} InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField label="First Name" value={elder.firstName || ''} InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField label="Middle Name" value={elder.middleName || ''} InputProps={{ readOnly: true }} />
                                    </Grid>
                                </Grid>
                                <MdEmail size={'2em'} />
                                <Typography variant="h6" gutterBottom>Contact Details</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField label="Email" value={elder.email || ''} InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField label="Contact Number" value={elder.contactNumber || ''} InputProps={{ readOnly: true }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElderPortalProfile;
