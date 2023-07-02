import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFlip, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/scrollbar';
import './Swiper.scss';
import { SwiperItem } from './SwiperItem';
import swiper1 from './img/swiper1.jpg';
import swiper2 from './img/swiper2.jpg';
import swiper3 from './img/swiper3.jpg';
import swiper4 from './img/swiper4.jpg';
import swiper5 from './img/swiper5.jpg';

SwiperCore.use([EffectFlip, Navigation, Pagination]);

interface IItemsSwiper {
    id: number;
    title: string;
    price: string;
}

const items: IItemsSwiper[] = [
    { id: 1, title: 'Gold big hoops', price: '$ 68,00' },
    { id: 2, title: 'New collection', price: '$ 121,56' },
    { id: 3, title: 'Blue charpet', price: '$ 45,99' },
    { id: 4, title: 'Exosted jorning', price: '$ 187,99' },
    { id: 5, title: 'Crosing rouning', price: '$ 36,98' }
];
const getBackgroundImage = (id: number) => {
    switch (id) {
        case 1:
            return swiper1;
        case 2:
            return swiper2;
        case 3:
            return swiper3;
        case 4:
            return swiper4;
        case 5:
            return swiper5;
        default:
            return '';
    }
};

export const Swiperr: React.FC = () => {
    const renderCustomPagination = () => {
        return (
            <div className="swiper-pagination">
                {items.map((item) => (
                    <span key={item.id} className="swiper-pagination-bullet" />
                ))}
            </div>
        );
    };

    return (
        <div className='container'>
            <Swiper
                className='swiper'
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                // navigation
                pagination={{ clickable: true }}
            >

                {items.map((item) => (
                    <SwiperSlide key={item.id} className='swiper_slide' style={{ backgroundImage: `url(${getBackgroundImage(item.id)})` }}>
                        <SwiperItem item={item} />
                    </SwiperSlide>
                ))}
                {renderCustomPagination()}

            </Swiper>

        </div>
    );
};
