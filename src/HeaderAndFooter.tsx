import React, { ReactNode } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

interface ComponentProps {
    children: ReactNode;
    cart: IGoods[];
    deleteCart: (id: number) => void,
    setCart: React.Dispatch<React.SetStateAction<IGoods[]>>,
    cartSum: number,
    totalSum: number,
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
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


export const HeaderAndFooter: React.FC<ComponentProps> = ({ children, cartSum, setCart, deleteCart, cart, minus, plus }) => {



    return (
        <>
            <Header minus={minus} plus={plus} totalSum={cartSum} cartSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart} />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};