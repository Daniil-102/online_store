import React from 'react'

import star from './img/star.svg'
import star1 from './img/star1.svg'


interface Props {
    rev: {
        sel: number;
        name: string;
        email: string;
        rew: string;
    },


}


export const Rev: React.FC<Props> = ({ rev }) => {



    const date = new Date();
    const day = date.getDate()
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear()


    return (
        <div className='rev__wrapper'>
            <div className="rev__start">
                <h4 className="rev__title">{rev.name}</h4>
                <span className="rev__date">{day + " " + month + ", " + year}</span>
            </div>
            <div className="rev_rating__stars">
                <img src={rev.sel >= 1 ? star1 : star} alt="star" />
                <img src={rev.sel >= 2 ? star1 : star} alt="star" />
                <img src={rev.sel >= 3 ? star1 : star} alt="star" />
                <img src={rev.sel >= 4 ? star1 : star} alt="star" />
                <img src={rev.sel >= 5 ? star1 : star} alt="star" />
            </div>
            <p className="rev__descrip">{rev.rew}</p>

        </div>
    )
}
