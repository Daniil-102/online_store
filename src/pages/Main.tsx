import React, { useEffect } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'
import { Swiperr } from '../components/Swiper'
import { Goods } from '../components/Goods'

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
    goods: IGoods[],
    minus: (id: number) => void,
    plus: (id: number) => void,
}

export const Main: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, goods, minus, plus }) => {

    useEffect(() => {
        let sum = 0
        cart.map(item => item.stock > 0 ? sum += item.price * item.count - item.price * item.count * item.stock / 100 : sum += item.price * item.count)
        setCartSum(Math.round(sum * 100) / 100);
    }, [cart, setCartSum]);

    const addToCart = (good: IGoods) => {
        if (!cart.find((item) => item.id === good.id) && good.sale) {
            setCart((prev) => [...prev, good]);
        }
    };
    const deleteCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    return (
        <div className='wrapper'>
            <HeaderAndFooter minus={minus} plus={plus} cartSum={cartSum} totalSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart} >
                <Swiperr />
                <Goods goods={goods} addToCart={addToCart} />
            </HeaderAndFooter>
        </div>
    )
}
