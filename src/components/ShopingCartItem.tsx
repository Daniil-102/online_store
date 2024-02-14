import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


interface Props {
    cart: {
        id: number;
        image: string,
        title: string,
        price: number,
        count: number,
        stock: number,
        sale: boolean
    },
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
    deleteCart: (id: number) => void
}



export const ShopingCartItem: React.FC<Props> = ({ cart, minus, plus, deleteCart }) => {

    const stock = cart.price - cart.price * cart.stock / 100

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    const handleClick = () => {
        deleteCart(cart.id);
    };

    return (
        <div className="scart__wrapper">
            <img className='scart__img' src={cart.image} alt="img" />
            <div className="scart__content">
                <div className="scart__content-left">
                    <Link onClick={handleLinkClick} to={`/shop/${cart.id}`}><h3 className="scart__title">{cart.title}</h3></Link>
                    <p className="scart__desc">Black / Medium</p>
                    {parseFloat(stock.toFixed()) === stock ? <p className='scart__price'><span></span>$ {cart.price - cart.price * cart.stock / 100},00</p>
                        : <p className='scart__price'><span className='scart_last__price'>$ {cart.price},00 </span> $ {cart.price - cart.price * cart.stock / 100}</p>}
                </div>
                <div className="scart__content-counter">
                    <button onClick={() => minus(cart.id)} className="scart_but">-</button>
                    <span className="scart__count">{cart.count}</span>
                    <button onClick={() => plus(cart.id)} className="scart_but">+</button>

                </div>
                <RiCloseLine onClick={handleClick} className='scart__close' />
            </div>
        </div>
    )
}
