import React, { FC, useState, } from 'react'
import { Link } from 'react-router-dom'

import shoppingCart from './../shopping-cart.svg'
import styles from "./Header.module.scss"
import { RiCloseLine } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { Cart } from './Cart';
import './../App.scss'

interface IGoods {
    id: number;
    image: string,
    title: string,
    price: number,
    count: number,
    stock: number,
    sale: boolean
}
interface IHeaderProps {
    cart: IGoods[];
    deleteCart: (id: number) => void,
    setCart: React.Dispatch<React.SetStateAction<IGoods[]>>,
    cartSum: number,
    totalSum: number,
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
}


export const Header: FC<IHeaderProps> = ({ setCart, cart, deleteCart, cartSum, totalSum, minus, plus }) => {

    const [show, setShow] = useState(false)
    const [active, setActive] = useState('')

    const showMenu = () => {
        setShow(true)
    }
    const closeMenu = () => {
        setShow(false)
    }
    const showCart = () => {
        setActive('active');
    };
    const closeCart = () => {
        setActive('');
    };

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };




    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.icon}>
                        <Link onClick={handleLinkClick} to={'/'} className={styles.icon__link}>
                            <span>S</span>HOPPE
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <nav className={styles.nav}>
                            <ul className={styles.list}>
                                <li className={styles.list__item}><Link onClick={handleLinkClick} to={'/shop'}>Shop</Link></li>
                                <li className={styles.list__item}><Link onClick={handleLinkClick} to={'/blog'}>Blog</Link></li>
                                <li className={styles.list__item}><Link onClick={handleLinkClick} to={'/story'}>Our Story</Link></li>
                            </ul>
                        </nav>
                        <button onClick={showCart} className={styles.shoppingCart}>
                            <img src={shoppingCart} alt="shopping cart" className={styles.cart__img} />
                        </button>
                        <div onClick={showMenu} className={styles.menu}>
                            <span className={styles.menu__line}></span>
                            <span className={styles.menu__line}></span>
                            <span className={styles.menu__line}></span>
                        </div>
                    </div>
                    <div className={`carts__wrapper ${active}`}>
                        <div>
                            <button onClick={closeCart} className={styles.cart__back}>
                                <BiArrowBack />
                            </button>
                            <h3 className={styles.carts__title}>Shopping bag</h3>
                            {cart.length ? <p className={styles.carts__counter}>{cart.length} items</p> : null}
                            {cart.length ? cart.map(item => (
                                <Cart key={item.id} cart={item} deleteCart={deleteCart} plus={plus} minus={minus} />
                            )) :
                                <div className={styles.cart__empty}>Empty </div>

                            }
                        </div>

                        <div className={styles.carts__down}>
                            <div className={styles.carts__price}>
                                <span className={styles.carts__items}>Subtotal ({cart.length} items)</span>
                                <span className={styles.carts__price}>$ {cartSum}</span>
                            </div>
                            <div className={styles.carts__link}>
                                <Link onClick={handleLinkClick} to={'/cart'} >VIEW CART</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {show ? (<div className={styles.phone_menu}>
                <RiCloseLine onClick={closeMenu} className={styles.phone_button} />

                <ul className={styles.phone_list}>
                    <li className={styles.phone_list__item}><Link onClick={handleLinkClick} to={'/shop'}>Shop</Link></li>
                    <li className={styles.phone_list__item}><Link onClick={handleLinkClick} to={'/blog'}>Blog</Link></li>
                    <li className={styles.phone_list__item}><Link onClick={handleLinkClick} to={'/story'}>Our Story</Link></li>
                </ul>
            </div>) : null}
        </header>
    )
}
