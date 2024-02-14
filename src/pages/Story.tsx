import React, { useEffect } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'

import second from './../components/img/blog/big.jpg'
import first from './../components/img/blog/big1.jpg'
import './../components/story.scss'

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

export const Story: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, minus, plus }) => {

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
                <div className="story__container">
                    <h1 className="story__title">About</h1>
                    <h6 className="story__subtittle">Who we are and why we do what we do!</h6>
                    <p className="story__text">Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac sodales lectus placerat quis. </p>
                    <h3 className="story__trends">Top trends</h3>
                    <img className='story__first' src={first} alt="img" />
                    <p className="story__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. </p>
                    <ul className="story__list">
                        <li className="story__item">consectetur adipiscing elit. Aliquam placerat</li>
                        <li className="story__item">Lorem ipsum dolor sit amet consectetur</li>
                    </ul>
                    <h3 className="story__produce">Produced with care</h3>
                    <img className='story__second' src={second} alt="img" />
                    <p className="story__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendu.</p>

                </div>
            </HeaderAndFooter>
        </div>
    )

}
