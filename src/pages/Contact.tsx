import React, { useState, useEffect } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'
import arrow from './../components/img/select_arow.svg'
import './../components/Contact.scss'

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

export const Contact: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, minus, plus }) => {

    const [active, setActive] = useState('');
    const [select, setSelect] = useState('Subject');

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
                <div>
                    <div className="container">
                        <div className="contact__title">Contact Us</div>
                        <div className="contact__content">Say Hello send us your thoughts about our products or share your ideas with our Team!</div>
                        <form className="contact__form">
                            <input placeholder='First name' type="text" className="contact__name contact__input" />
                            <input placeholder='Last name' type="text" className="contact__lastname contact__input" />
                            <input placeholder='Email' type="email" className="contact__email contact__input" />
                            <div className='contact__subject'>
                                <span onClick={() => active === '' ? setActive('active') : setActive('')}>{select}</span>
                                <img onClick={() => active === '' ? setActive('active') : setActive('')} src={arrow} alt="arrow" />
                                <div className={`contact__subjects ${active}`}>
                                    <ul>
                                        <li onClick={() => { setSelect('Problem'); active === '' ? setActive('active') : setActive('') }} className={`contact__subject_item ${active}`}>Problem</li>
                                        <li onClick={() => { setSelect('Desire'); active === '' ? setActive('active') : setActive('') }} className={`contact__subject_item ${active}`}>Desire</li>
                                        <li onClick={() => { setSelect('Gratitude'); active === '' ? setActive('active') : setActive('') }} className={`contact__subject_item ${active}`}>Gratitude</li>
                                    </ul>
                                </div>
                            </div>

                            <textarea placeholder='Message' className={`contact__message ${active}`}></textarea>
                            <button className="contact__send">SEND</button>
                        </form>




                    </div>
                </div>
            </HeaderAndFooter>
        </div>
    )

}
