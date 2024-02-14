import React, { FC } from 'react';
import c from './Header.module.scss';
import { CartCounter } from './CartCounter';
import { RiCloseLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

interface IProps {
    cart: {
        id: number,
        image: string,
        title: string,
        price: number,
        count: number,
        stock: number,
        sale: boolean
    },
    deleteCart: (id: number) => void,
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
}

export const Cart: FC<IProps> = ({ cart, deleteCart, minus, plus }) => {

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    const handleClick = () => {
        deleteCart(cart.id);
    };
    const stock = cart.price - cart.price * cart.stock / 100

    return (
        <div className={c.cart__wrapper}>
            <div className={c.cart__img_div}>
                <img src={cart.image} alt="cart img" className={c.cart__img} />
            </div>
            <div className={c.cart__content}>
                <div className={c.cart__content_info}>
                    <Link onClick={handleLinkClick} to={`/shop/${cart.id}`}><h5 className={c.cart__title}>{cart.title}</h5></Link>
                    <p className={c.cart__desc}>Black / Medium</p>
                    {parseFloat(stock.toFixed()) === stock ? <p className={c.cart__price}><span></span>$ {cart.price - cart.price * cart.stock / 100},00</p>
                        : <p className={c.cart__price}><span className={c.last_price}>$ {cart.price} </span> $ {cart.price - cart.price * cart.stock / 100}</p>}
                </div>
                <CartCounter count={cart.count} id={cart.id} minus={minus} plus={plus} />
                <RiCloseLine onClick={handleClick} className={c.cart__close} />
            </div>
        </div >
    );
};
