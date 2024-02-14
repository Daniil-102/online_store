import React, { FC } from 'react';
import c from './Header.module.scss';

interface IProps {
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
    id: number,
    count: number
}



export const CartCounter: FC<IProps> = ({ minus, plus, id, count }) => {

    const onMinus = () => {
        minus(id)
    }
    const onPlus = () => {
        plus(id)
    }

    return (
        <div className={c.cart__count_wrapper}>
            <span className={c.qty}>QTY:</span>
            <button onClick={onMinus} className={c.cart__count_minus}>-</button>
            <span className={c.cart__count}>{count}</span>
            <button onClick={onPlus} className={c.cart__count_plus}>+</button>
        </div>
    );
};
