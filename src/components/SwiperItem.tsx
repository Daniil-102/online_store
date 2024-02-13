import React from 'react';
import './Swiper.scss';
import { Link } from 'react-router-dom';


interface IItemsSwiper {
    id: number;
    title: string;
    price: string;
}


export const SwiperItem: React.FC<{ item: IItemsSwiper }> = ({ item }) => {
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className='swiper_inner'>

            <h3 className="swiper_title">{item.title}</h3>
            <p className="swiper_price">{item.price}</p>
            <Link to={`/shop/${item.id}`} onClick={handleLinkClick}><button className='swiper_button'>View Product</button></Link>
        </div>


    );
};
