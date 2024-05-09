import React from 'react';
import ElderPortalNavbar from './ElderPortalNavbar';
import Map from '../img/Maps.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Footer from '../Footer/Footer';
import { IoIosContact } from "react-icons/io";
import { FaRegBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import "./elderPortalContact.css";

function ElderPortalContact() {
  return (

    <div >
      <ElderPortalNavbar />

      <div>
        <div>
          <h1>Contact Us</h1>
        </div>
        <Box display={"flex"} alignItems={'center'}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <div className='contactContainer' style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <img src={Map} alt='Map logo' />
              </div>
            </Grid>
            <Grid item xs={8}>
              <ul>
                <li>
                  <TextField fullWidth label="Name" id="name" />
                </li>
                <li>
                  <TextField fullWidth label="Email" id="email" />
                </li>
                <li>
                  <TextField fullWidth label="Topic of Inquiry" id="inquiry" />
                </li>
                <li>
                  <TextField
                    id="description-id"
                    fullWidth
                    label="Description"
                    name='Description'
                    multiline
                    rows={4}
                    defaultValue="Please let us know your concern"
                  />
                </li>
                <li>
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <ul>
                <li>
                  <FaRegBuilding size={'2em'} />
                  <h3>OSCA Hotline</h3>
                </li>
                <li>
                  <IoIosContact size={'2em'} />
                  <h3> Ms. Elinor Jacinto - Officer-In-Charge </h3>
                </li>
                <li>
                  <FaLocationDot size={'2em'} />
                  <h3> Rm. 115 Ground Floor, Manila City Hall Building</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02) 8-571-3878 / 5-310-3371 / 5-310-3372</h3>
                </li>
                <li>
                  <MdEmail size={'2em'} />
                  <h3> osca@manila.gov.ph </h3>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <ul>
                <li>
                  <FaRegBuilding size={'2em'} />
                  <h3>Emergency 911 Hotline</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02) 925-9111 [telephone] </h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02) 928-7281 [telefax]</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> +63966-5000-299 [Globe] </h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> +63932-318-0440 [Smart] </h3>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <ul>
                <li>
                  <FaRegBuilding size={'2em'} />
                  <h3>Bureau of Fire Protection</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> 	(02) 426-0219 </h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02) 426-3812</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02)426-0246</h3>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <ul>
                <li>
                  <FaRegBuilding size={'2em'} />
                  <h3>Philippine National Police</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (2) 722-0650 </h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> +63917-847-5757</h3>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <ul>
                <li>
                  <FaRegBuilding size={'2em'} />
                  <h3>Metro Manila Development Authority</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02) 882-0925 (Flood Control) </h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02) 882-4150-77 </h3>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <div>
                <li>
                  <FaRegBuilding size={'2em'} />
                  <h3>Manila Traffic Hotline</h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> 	(02)527-3087 </h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02)527-3088 </h3>
                </li>
                <li>
                  <BsFillTelephoneFill size={'2em'} />
                  <h3> (02)527-3065 </h3>
                </li>

              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Footer />
    </div >
  );
}

export default ElderPortalContact