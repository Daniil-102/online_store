import React, { useState } from 'react'
import './Good.scss'
import { BsFillCartPlusFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';



interface IGoodProps {
    good: {
        id: number,
        image: string,
        title: string,
        price: number,
        count: number,
        stock: number,
        sale: boolean
    },

    addToCart: (
        event:
            {
                id: number;
                image: string;
                title: string;
                price: number;
                count: number;
                stock: number;
                sale: boolean
            }
    ) => void

}


export const Good: React.FC<IGoodProps> = ({ good, addToCart }) => {
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    const [isShow, setShow] = useState(false)

    const handleClick = () => {
        addToCart(good);
        console.log(good)
        if (good.sale) {
            toast.success(`${good.title} added to cart`)
        } else {
            toast.error(`This item is sold out`)
        }
    };

    return (
        <div className='good'>
            <div className="good_cart" onClick={handleClick}>
                <BsFillCartPlusFill />
            </div>
            <div className='good__img-inner' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} >
                <img className='good__img' src={good.image} alt="good" />
                {good.stock > 0 ? <div className="good__addition">-%{good.stock}</div> : null}
                {good.sale ? null : <div className="good__addition">Sold out</div>}
                {isShow && <button className="good__img-link" onClick={handleClick}>ADD TO CART</button>}
            </div>

            <h6 className="good__title"><Link onClick={handleLinkClick} to={`/shop/${good.id}`}>{good.title}</Link></h6>
            {good.stock > 0 ? <><span className="good__last_price">$ {good.price},00</span>
                <span className='good__price'>$ {good.price - good.price * good.stock / 100}</span></>
                : <span className='good__price'>$ {good.price},00</span>}
        </div>
    )
}
