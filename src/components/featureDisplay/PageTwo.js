import React from 'react'
import CardItem from '../CardItem';
import './PageTwo.css';

function PageTwo() {
    return (
      <div className='cards'>
        <h1>Elderly Squire Features</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src='images/Medicine.svg'
                text='Elderly Squire does have Alarm notification for taking Medicine'
                label='Medicine Reminder'
                path='/'
              />
              <CardItem
                src='images/HealthTips.svg'
                text='Elderly Squire gives you Health tips and tricks  '
                label='Health Tips'
                path='/'
              />
            <ul className='cards__items'></ul>
              <CardItem
                src='images/GAupdate.svg'
                text='Elderly Squire does update you from the latest Elderly Assistance'
                label='Government Updates'
                path='/'
              />
              <CardItem
                src='images/Informations.svg'
                text='Elderly Squire in cooperation with Schools Division of manila updates you about the benefits and updates within manila'
                label='Informations'
                path='/'
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default PageTwo;