import React from 'react'
import CardItemB from './CardItemN';
import './News.css';

function News() {
    return (
        <div className='cards'>
            <h1>Elderly Squire News</h1>

            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItemB
                        src='images/sss4.jpg'
                        text=' LOOK: The Manila city government is set to distribute Christmas Gift box for senior citizens in the nation’s capital.'
                        path='/'
                    />
                    <CardItemB
                        src='images/sss1.jpg'
                        text='Manila City Mayor Francisco “Isko Moreno” Domagoso said this on Sunday, April 17, during the inauguration and turn-over of Binondominium units to its recipients.
                            '
                        path='/'
                    />
                    <CardItemB
                        src='images/sss2.jpg'
                        text='Manila City Mayor Isko Moreno Domagoso lifted on Monday, November 8, the use of face shields in the City of Manila.
                            '
                        path='/'
                    />
                    <CardItemB
                        src='images/sss3.jpg'
                        text='Inaprubahan ko na po ang pagpapalabas ng Allowance para sa ating mga minamahal na Senior Citizen mula sa ika-5 distrito, na nagkakahalaga ng 83.7 Million Pesos.  
                            '
                        path='/'
                    />
                </ul>
            </div>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItemB
                        src='images/sss5.jpg'
                        text=' LOOK: Yorme Isko signed the release of P59,272,500.00 for cash assistance to 22,852 senior citizens in District 3 for the moth of January until September 2021.'
                        path='/'
                    />
                    <CardItemB
                        src='images/sss6.jpg'
                        text='Mga Batang Maynila, umabot na sa P45,767,000 ay naibigay nating tulong pinansyal para sa ating mga lolo at lola sa District 4, Martes, Agosto 17!
                            '
                        path='/'
                    />
                    <CardItemB
                        src='images/sss7.jpg'
                        text='LOOK: Manila Mayor Francisco ‘Isko Moreno’ Domagoso signed for release P71,688,500 budget for senior citizens of District IV on Friday, August 13.Each senior citizen will receive a total of P3,000.00 based from the budget allocated for the months of January, February, March, April, May and June.
                            '
                        path='/'
                    />
                    <CardItemB
                        src='images/sss8.jpg'
                        text='ALERTO BALITA: Yorme Isko may ‘nutritious’ regalo para sa mga lolo at lola ng Maynila. May masustansyang regalo na handog si Punong Lungsod Francisco ‘Isko Moreno’ Domagoso sa ating mga lolo at lola ngayong nakasailalim sa Enhanced Community Quarantine (ECQ) ang Maynila.  
                            '
                        path='/'
                    />
                </ul>
            </div>
        
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItemB
                            src='images/FirstNews.jpeg'
                            text=' Mayor Isko Moreno distributes food packs at Canonigo covered court as part of his birthday celebration., #BagongMaynila'
                            path='/'
                        />
                        <CardItemB
                            src='images/SecondNews.jpg'
                            text='Office of the Senior Citizens Affairs(OSCA) gives personally Paymaya cards to senior citizens and it totals to 40,495 total distributed cards that are registered and activated to the senior citizens.
                            '
                            path='/'
                        />
                        <CardItemB
                            src='images/ThirdNews.jpg'
                            text='3 Months allowance for registered senior citizens, can be claimed starting January until March
                            '
                            path='/'
                        />
                        <CardItemB
                            src='images/FourthNews.jpg'
                            text='Giving Cash allowance for the senior citizens still ongoing as of June 2,2021
                            '
                            path='/'
                        />
                    </ul>
                </div>
            </div>
    );
}

export default News;