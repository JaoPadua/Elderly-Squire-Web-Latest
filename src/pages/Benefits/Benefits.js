import React from 'react'
import CardItemF from '../Application/CardItemF';
import '../Application/Function.css';

function Benefits(){
    return (
        <div className='cards'>
          <h1>Benefits for Senior Citizens</h1>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                <CardItemF
                  src='beneImage/medicine.png'
                  text='Medicine and drug purchases'
                  label='Medical-related privileges'
                />
                <CardItemF
                  src='beneImage/medical-assistance.png'
                  text='Medical supplies, accessories and equipment'
                  label='Medical-related privileges'
                 
                />
                <ul className='cards__items'></ul>
                <CardItemF
                  src='beneImage/teeth.png'
                  text='Medical and dental services'
                  label='Medical-related privileges'
                 
                />
                <CardItemF
                  src='beneImage/doctor.png'
                  text='Professional fees of attending physician'
                  label='Medical-related privileges'
                  
                />
              </ul>
              <ul className='cards__items'>
                <CardItemF
                  src='beneImage/medical.png'
                  text='Professional fees of licensed health workers providing home health care services'
                  label='Medical-related privileges'
                  
                />
                <CardItemF
                  src='beneImage/transportation.png'
                  text='Air and Sea'
                  label='Transportation'
                  
                />
                <ul className='cards__items'></ul>
                <CardItemF
                  src='beneImage/train.png'
                  text='Land: LRT, MRT, PNR, buses, jeepneys, taxi and shuttle services'
                  label='Transportation'
                 
                />
                <CardItemF
                  src='beneImage/hotel.png'
                  text='Hotels, restaurants, theaters, cinemas, concert halls, circuses, leisure and amusement'
                  label='Hotels, restaurants, recreational facilities, places of leisure'
                  
                />
              </ul>
              <ul className='cards__items'>
                <CardItemF
                  src='beneImage/groups.png'
                  text='Fees, charges and rental for sports facilities and equipment'
                  label='Recreation centers'
                  
                />
                <CardItemF
                  src='beneImage/coffin.png'
                  text='Funeral and burial expenses include casket or urn, embalming, cremation cost, and other services.'
                  label='Funeral services'
                  
                />
                <CardItemF
                  src='beneImage/eco-house.png'
                  text='Grant of a minimum of 5% discount relative to the monthly use of water and electricity, provided that the meter is registered under the name of the senior citizen residing therein and does not exceed 100 kWh and 30 m³.'
                  label='EXEMPTIONS'
                 
                />
                <CardItemF
                  src='beneImage/taxes.png'
                  text=' Exemption from payment of individual income tax of those who are considered to be minimum wage earners.'
                  label='Tax exemption'
                 
                />
                </ul>
                <ul className='cards__items'>
                <CardItemF
                  src='beneImage/dental.png'
                  text='Free medical and dental services'
                  label='FREEBIES'
                  
                />
                <CardItemF
                  src='beneImage/vaccinated.png'
                  text='Free vaccinations'
                  label='FREEBIES'
                  
                />
                <CardItemF
                  src='beneImage/pension.png'
                  text='Indigent senior citizens shall be entitled to a monthly stipend amounting to P500 to augment daily subsistence and other medical needs.'
                  label='Social Pension'
                 
                />
                <CardItemF
                  src='beneImage/heartbeat.png'
                  text='All senior citizens are covered by the national health insurance program of PhilHealth.'
                  label='Mandatory PhilHealth coverage'
                  
                />
                </ul>
                <ul className='cards__items'>
                <CardItemF
                  src='beneImage/school.png'
                  text='The social safety assistance shall include, but not be limited to, food, medicines, and financial assistance for house repair to cushion effects of economic, disaster and calamity shocks.'
                  label='Social safety nets'
                 
                />
                <CardItemF
                  src='beneImage/death.png'
                  text='Assistance of a minimum of P2,000.00 shall be given to the nearest surviving relative who took care of the deceased senior citizen.'
                  label='Death Benefits assistance'
                  
                />
                <CardItemF
                  src='beneImage/bank.png'
                  text='Express lanes shall be provided in all private, banking, commercial and government establishments; priority shall be given in their absence.'
                  label='Express lanes'
                 
                />
                <CardItemF
                  src='beneImage/retirement-plan.png'
                  text='Continuance of the same benefits and privileges by GSIS, SSS and PAG-IBIG as enjoyed by those in active service.'
                  label='Benefits and privileges for retirees'
                  
                />
                </ul>
            </div>
          </div>
        </div>
      );
}

export default Benefits