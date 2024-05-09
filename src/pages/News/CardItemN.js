import React from 'react';
import { Link } from 'react-router-dom'
import './News.css'



function CardItemN(props) {
    const handleReadMoreClick = () => {
        window.open(props.path, '_blank');
      };

      
    return (
        <>
            <li className='cards__item'>
                <li className='cards__item__link' to={props.title}>
                <figure className='cards__item__pic-wrap' data-category={props.label}>
                        <img
                            className='cards__item__img'
                            alt='Elderly Squire Image'
                            src={props.src}
                        />
                    </figure>
                    <div className='cards__item__info'>
                        <h2 className='cards__item__text'>{props.title}</h2>
                    </div>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__text'>{props.text}</h5>
                    </div>
                    <div className='btn'>
                        <button onClick={handleReadMoreClick}>
                       
                              Read More
                        </button>
                    </div>
                </li>
            </li>
        </>
    );
}

export default CardItemN;