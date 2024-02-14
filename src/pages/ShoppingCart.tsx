import React, { useState, useEffect } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'
import './../components/ShopingCart.scss'
import { ShopingCartItem } from '../components/ShopingCartItem'


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

export const ShopingCart: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, minus, plus }) => {

    useEffect(() => {
        let sum = 0
        cart.map(item => item.stock > 0 ? sum += item.price * item.count - item.price * item.count * item.stock / 100 : sum += item.price * item.count)
        setCartSum(Math.round(sum * 100) / 100);
    }, [cart, setCartSum]);

    const deleteCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [com, setCom] = useState('')

    const submit = () => {
        if (name.length > 0 && email.length > 0 && com.length > 0) {
            setCom('')
            setEmail('')
            setName('')
            setCart([])
        }
    }



    return (
        <div>
            <HeaderAndFooter minus={minus} plus={plus} cartSum={cartSum} totalSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart}>
                <div className="scart">
                    <div className="container">
                        <div className="scart__inner">
                            <h1 className="shopping_cart">Shopping Cart</h1>
                            <div className="shop_in">
                                <div className="scarts__wrapper">
                                    {cart.map(cart => (
                                        <ShopingCartItem deleteCart={deleteCart} minus={minus} plus={plus} cart={cart} />
                                    ))}
                                </div>
                                <div className="totals">
                                    <h2 className="cart__totals">Cart totals</h2>
                                    <div className="subtotal">
                                        <p className="subtotal_name">SUBTOTAL</p>
                                        {Math.round(cartSum) === cartSum ? <span className="subtotal__price">$ {cartSum},00</span> : <span className="subtotal__price">$ {cartSum}</span>}
                                    </div>
                                    <div className="shipping">
                                        <div className="shipping_name">SHIPPING</div>
                                        {cartSum < 100 ? <p className="shipping__var">Shipping will be free when buying from <span className='shipping_red'>$ 100,00</span></p> : <p className="shipping__var">Free delivery on purchase from <span className='shipping_green'>$ 100,00</span></p>}
                                    </div>
                                    <input value={name} onChange={e => setName(e.target.value)} className='scart_name' placeholder='Enter your name*' type="text" />
                                    <input value={email} onChange={e => setEmail(e.target.value)} className='scart_email' placeholder='Enter your Email*' type="email" />
                                    <textarea value={com} onChange={e => setCom(e.target.value)} className='scart_textarea' placeholder='Your questions, wishes, comments' />
                                    <div className="total">
                                        <div className="total_name">TOTAL</div>
                                        {cartSum < 100 ? <div className="total__price">$ {Math.round((cartSum + cartSum * 0.05) * 100) / 100}</div> : <div className="total__price">$ {Math.round(cartSum * 100) / 100}</div>}
                                    </div>
                                    <button onClick={submit} className="pay_purchase">Pay for the purchase</button>



                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </HeaderAndFooter>
        </div>
    )

}
