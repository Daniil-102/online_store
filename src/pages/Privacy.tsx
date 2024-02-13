import React, { useEffect } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'
import './../components/Privacy.scss'

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
    plus: (id: number) => void,
}

export const Privacy: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, minus, plus }) => {

    useEffect(() => {
        let sum = 0
        cart.map(item => item.stock > 0 ? sum += item.price * item.count - item.price * item.count * item.stock / 100 : sum += item.price * item.count)
        setCartSum(Math.round(sum * 100) / 100);
    }, [cart, setCartSum]);

    const deleteCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    return (
        <div>
            <HeaderAndFooter minus={minus} plus={plus} cartSum={cartSum} totalSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart}>
                <div className="privacy">
                    <div className="container">
                        <div className="privacy__inner">
                            <h2 className="privacy__title">Privacy Policy</h2>
                            <p className="privacy__first">Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac sodales lectus placerat quis. </p>
                            <h3 className="privacy__security">Security</h3>
                            <p className="privacy__security_text">
                                Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque.
                            </p>
                            <h3 className="cookies">Cookies</h3>
                            <ul className="cookies__list">
                                <li className="cookies__item">Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin.</li>
                                <li className="cookies__item">Nam fringilla molestie velit, eget pellentesque risus scelerisque a</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </HeaderAndFooter>
        </div>
    )

}
