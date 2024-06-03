import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

import { MdPerson, MdPhone, MdEmail,MdLocationOn } from "react-icons/md";



function Footer() {
  return (
    <div className='footer-container'>
     <div className='footer-logo'>
              Elderly Squire
              <span>A Capstone Project of Students from CCIT National University Manila</span>
          </div>
      <div className='footer-links'>
      <div className='footer-link-items'>
        <h2>Contact Us</h2>
        <div className='contact-grid'>
        <div className='contact-detail'>
          <MdPerson /><span>Ms. Elinor Jacinto - Officer-In-Charge</span>
        </div>
        <div className='contact-detail'>
          <MdLocationOn /><span>Rm. 115 Ground Floor, Manila City Hall Building</span>
        </div>
        <div className='contact-detail'>
          <MdPhone /><span>(02) 8-571-3878 / 5-310-3371 / 5-310-3372</span>
        </div>
        <div className='contact-detail'>
          <MdEmail /><span>osca@manila.gov.ph</span>
        </div>
        <div className='contact-detail'>
        <Link
          to='https://www.facebook.com/ManilaOSCA/'
          target='_blank'
          aria-label='Facebook'
          className='facebook-link'
        >
          <FaFacebook /><span>Facebook Page</span>
        </Link>
        </div>
      </div>
</div>
      </div>
        </div>
  );
}

export default Footer;