import React from 'react'
import CardItemF from './CardItemF';
import './Function.css';

function Function() {
  return (
    <div className='cards'>
      <h1>Elderly Squire Features and Functionalities</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItemF
              src='images/Medicine.svg'
              text='Elderly Squire does have Alarm notification for taking Medicine'
              label='Medicine Reminder'
              path='/'
            />
            <CardItemF
              src='images/HealthTips.svg'
              text='Elderly Squire gives you Health tips and tricks  '
              label='Health Tips'
              path='/'
            />
            <ul className='cards__items'></ul>
            <CardItemF
              src='images/GAupdate.svg'
              text='Elderly Squire does update you from the latest Elderly Assistance'
              label='Government Updates'
              path='/'
            />
            <CardItemF
              src='images/Informations.svg'
              text='Elderly Squire in cooperation with Office of Senior Citizen Affair updates you about the benefits and updates within manila'
              label='Informations'
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItemF
              src='images/CalendarF.svg'
              text='Elderly Squire does have Online Calendar'
              label='Calendar'
              path='/'
            />
            <CardItemF
              src='images/Todo.svg'
              text='Elderly Squire does have ToDo list'
              label='To-Do List'
              path='/'
            />
            <ul className='cards__items'></ul>
            <CardItemF
              src='images/chtsp.svg'
              text='Elderly Squire does have Chat Support Functionality'
              label='Chat Support'
              path='/'
            />
            <CardItemF
              src='images/DataProcess.svg'
              text='Elderly Squire in cooperation with Office of Senior Citizen Affairs process your information if you are recognize as senior citizen'
              label='Data Process'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Function;