import React, { useState, useEffect } from 'react'
import CardItemB from './CardItemN';
import './News.css';

function News() {

    const [newsData, setNewsData] = useState([]);

   
   
    useEffect(() => {
        const fetchNews = async() =>{
          const res = await fetch('https://capstone-project-api-backend.vercel.app/api/newsRoute/')
          const data = await res.json()
          
          
         //console.log(data);
      
          if(data && res.ok){
            setNewsData(data)
           //console.log(data)
          }
        }
      
        fetchNews()
      },[])
    return (
        <div className='cards'>
            <h1>Elderly Squire News</h1>

            <div className='cards__wrapper__news'>
                <ul className='cards__items__news'>
                {newsData && newsData.slice(0,4).map((newsItem) => (
                    <CardItemB
                      key={newsItem._id}
                      src={newsItem.img}
                      title={newsItem.Title}
                      text={newsItem.Description}
                      path={newsItem.link}
                        />
                        ))}
                    </ul>
                </div>
            </div>
    );
}

export default News;