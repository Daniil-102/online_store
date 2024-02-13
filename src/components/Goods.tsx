import React, { FC } from 'react'
import { Good } from './Good'
import './Good.scss'


import { Link } from 'react-router-dom'


interface IProps {
    addToCart: (
        item:
            {
                id: number;
                image: string;
                title: string;
                price: number;
                count: number,
                stock: number,
                sale: boolean
            }
    ) => void,
    goods: IGoods[]
}

interface IGoods {
    id: number;
    image: string,
    title: string,
    price: number,
    count: number,
    stock: number,
    sale: boolean
}
export const Goods: FC<IProps> = ({ addToCart, goods }) => {

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };


    return (
        <div className="container">
            <div className='goods'>

                <div className="goods__top">
                    <h3 className="goods__title">Shop The Latest</h3>
                    <Link onClick={handleLinkClick} to={'/shop'} className="goods__link">View All</Link>
                </div>
                <div className="goods__wraper">
                    {goods.map(good => (

                        <Good key={good.id} good={good} addToCart={addToCart} />
                    ))}
                </div>


            </div>
        </div>

    )
}
