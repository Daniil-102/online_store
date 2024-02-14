import React, { useEffect } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'
import { Link } from 'react-router-dom';
import './../components/Error.scss'

interface IGoods {
    id: number;
    image: string,
    title: string,
    price: number,
    count: number,
    stock: number,
    sale: boolean
}
interface Props {
    cart: IGoods[];
    setCart: React.Dispatch<React.SetStateAction<IGoods[]>>;
    cartSum: number;
    setCartSum: React.Dispatch<React.SetStateAction<number>>;
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
}

export const Error: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, minus, plus }) => {

    useEffect(() => {
        let sum = 0
        cart.map(item => item.stock > 0 ? sum += item.price * item.count - item.price * item.count * item.stock / 100 : sum += item.price * item.count)
        setCartSum(Math.round(sum * 100) / 100);
    }, [cart, setCartSum]);

    const deleteCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <HeaderAndFooter minus={minus} plus={plus} cartSum={cartSum} totalSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart}>
                <div className="error__inner">
                    <h1 className="error__title">404 ERROR</h1>
                    <p className="error__text">This page not found;<br />back to home and start again</p>
                    <Link onClick={handleLinkClick} to={'/'}><button className="error__home">HOMEPAGE</button></Link>
                </div>
            </HeaderAndFooter>
        </div>
    )

}
