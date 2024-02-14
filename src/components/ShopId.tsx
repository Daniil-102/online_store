import React, { useEffect, useState } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Scrollbar } from 'swiper';

import './goodId.scss'

import email from './img/footer/email.svg'
import facebook from './img/footer/facebook.svg'
import instagram from './img/footer/instagram.svg'
import twiter from './img/footer/twiter.svg'
import star from './img/star.svg'
import star1 from './img/star1.svg'
import { Rev } from './Rev';
import { Good } from './Good';
import { toast } from 'sonner';

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
    plus: (id: number, n?: number) => void,
}

export const Product: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, goods, minus, plus }) => {

    interface newReview {
        sel: number;
        name: string;
        email: string;
        rew: string;
    }
    const reviewss = [
        {
            rew: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.',
            name: 'Scarlet withch',
            email: 'scarlet@gmail.com',
            sel: 3
        },
        {
            rew: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.',
            name: 'Scarlet withch',
            email: 'scarlet@gmail.com',
            sel: 3
        },
    ]

    const postsData = localStorage.getItem('reviews')

    const isMounted = React.useRef(false)
    const [count, setCount] = useState(1)
    const [select, setSelect] = useState(0)
    const [selectAll, setSelectAll] = useState(5)
    const [sel, setSel] = useState('desc')
    const [checkbox, setCheckbox] = useState(false)
    const [reviews, setReviews] = useState<newReview[]>(postsData ? JSON.parse(postsData) : reviewss)
    const [rew, setRew] = useState('')
    const [name, setName] = useState('')
    const [emaill, setEmail] = useState('')



    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(reviews)
            localStorage.setItem('reviews', json)
        }
        isMounted.current = true;

    }, [reviews])

    const newRev = () => {
        if (rew !== '' && name !== '' && emaill !== '' && select !== 0) {
            const res = reviews.reduce((sum, review) => sum + review.sel, 0);
            const average = res / reviews.length
            setSelectAll(Math.round(average))


            let newReview = {
                rew: rew,
                name: name,
                email: emaill,
                sel: select
            }
            setReviews([newReview, ...reviews])
            setRew('')
            setSelect(0)
            if (!checkbox) {
                setName('')
                setEmail('')
            }

        }


    }

    useEffect(() => {
        let sum = 0
        cart.map(item => item.stock > 0 ? sum += item.price * item.count - item.price * item.count * item.stock / 100 : sum += item.price * item.count)
        setCartSum(Math.round(sum * 100) / 100);
    }, [cart, setCartSum]);

    useEffect(() => {
        const res = reviews.reduce((sum, review) => sum + review.sel, 0);
        const average = res / reviews.length
        setSelectAll(Math.round(average))
    }, [reviews])

    const addToCart = (good: IGoods) => {
        if (!cart.find((item) => item.id === good.id) && good.sale) {
            setCart((prev) => [...prev, good]);
        } else if (good.sale) {
            toast.success(`${good.title} added to cart`)

        }
        else {
            toast.error(`This item is sold out`)
        }
        plus(good.id, count)
    };
    const deleteCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }
    const { id } = useParams();
    const good = id ? goods[+id - 1] : false

    return (
        <HeaderAndFooter minus={minus} plus={plus} cartSum={cartSum} totalSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart} >
            {good ?
                <div className="good__inner">
                    <div className="container">
                        <div className="good__top">
                            <div className="good__swiper_block">
                                <Swiper
                                    className='good__swiper'
                                    modules={[Pagination, Scrollbar, A11y]}
                                    slidesPerView={1}
                                    scrollbar={{ draggable: true }}
                                >
                                    <SwiperSlide><img src={good.image} alt="good" />
                                        {good.stock > 0 && <div className="good__addition">-%{good.stock}</div>}
                                        {good.sale ? null : <div className="good__addition">Sold out</div>}</SwiperSlide>
                                    <SwiperSlide><img src={good.image} alt="good" /></SwiperSlide>
                                    <SwiperSlide><img src={good.image} alt="good" /></SwiperSlide>
                                    <SwiperSlide><img src={good.image} alt="good" /></SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="good__about">
                                <div className="good_title">{good.title}</div>
                                {good.stock > 0 ? <div className='good_price'><span className="good__last_price">$ {good.price},00</span>
                                    <span className='good__price'>$ {good.price - good.price * good.stock / 100}</span></div>
                                    : <div className='good_price'><span className='good__price'>$ {good.price},00</span></div>}
                                <div className="good_rev">
                                    <div className="good_rev-stars">
                                        <img src={selectAll >= 1 ? star1 : star} alt="star" />
                                        <img src={selectAll >= 2 ? star1 : star} alt="star" />
                                        <img src={selectAll >= 3 ? star1 : star} alt="star" />
                                        <img src={selectAll >= 4 ? star1 : star} alt="star" />
                                        <img src={selectAll === 5 ? star1 : star} alt="star" />
                                    </div>
                                    <div className="good_rev-count">{reviews.length} custom review</div>
                                </div>
                                <div className="good_desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. </div>
                                <div className="add-to-cart">
                                    <div className="good_count">
                                        <button onClick={() => count > 1 && setCount(prev => prev - 1)} className="good_count-minus">-</button>
                                        <div className="good_counter">{count}</div>
                                        <button onClick={() => setCount(prev => prev + 1)} className="good_count-plus">+</button>
                                    </div>
                                    <button onClick={() => { addToCart(good) }} className="adding-to-cart">ADD TO CART</button>
                                </div>
                                <div className="good_social">
                                    <a href="#"><img src={email} alt="social" className="good_social-img" /></a>
                                    <a href="#"><img src={facebook} alt="social" className="good_social-img" /></a>
                                    <a href="#"><img src={instagram} alt="social" className="good_social-img" /></a>
                                    <a href="#"><img src={twiter} alt="social" className="good_social-img" /></a>
                                </div>
                                <div className="sku">SKU: <span>12</span></div>
                                <div className="good_categories">Categories: <span>Fashion, Style</span></div>
                            </div>
                        </div>
                        <div className="good_bottom">
                            <div className="select_buttons">
                                <button onClick={() => setSel('desc')} className={sel === 'desc' ? `desc__button active` : `desc__button`}>Description</button>
                                <button onClick={() => setSel('ad')} className={sel === 'ad' ? `adit__button active` : `adit__button`}>Aditional information</button>
                                <button onClick={() => setSel('rev')} className={sel === 'rev' ? `rev__button active` : `rev__button`}>Reviews({reviews.length})</button>
                            </div>
                            {sel === 'desc' &&
                                <p className="desc_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendum sed.</p>
                            }
                            {sel === 'ad' &&
                                <div className="aditional">
                                    <div className="aditional__weight">Weight: <span>0.3 kg</span></div>
                                    <div className="aditional__dimentions">Dimentions: <span>15 × 10 × 1 cm</span></div>
                                    <div className="aditional__colors">Colors: <span>Black, Browns, White</span></div>
                                    <div className="aditional__material">Material: <span>Metal</span></div>
                                </div>
                            }
                            {sel === 'rev' &&
                                <div className='rev_block'>
                                    <div className="reviews">
                                        <div className="reviews__title">{reviews.length} Reviews for lira earings</div>
                                        {reviews.map(rev => (
                                            <Rev rev={rev} />
                                        ))}
                                    </div>
                                    <div className="add_rev">
                                        <form >
                                            <h4 className="add_rev_title">Add a Review</h4>
                                            <p className="add_rev_p">Your email address will not be published. Required fields are marked *</p>
                                            <div className="rev_textarea">
                                                <textarea value={rew} onChange={(e) => setRew(e.target.value)} placeholder='Your Review*' className="rev_inp-review" />
                                            </div>
                                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name*' type="text" className="rev_inp-name" />
                                            <input value={emaill} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email*' type="email" className="rev_inp-email" />
                                            <div className="b__form-checkbox">
                                                <button onClick={() => setCheckbox(!checkbox)} type='button' className={checkbox ? 'b__form-checkbox_button active' : `b__form-checkbox_button`}></button>
                                                <p className="b__form-checkbox_text">Save my name, email, and website in this browser for the next time I comment</p>
                                            </div>
                                            <p className="rating">Your Rating*</p>
                                            <div className="rating__stars">
                                                <button type='button' onClick={() => setSelect(1)} className="rating__star"><img src={select >= 1 ? star1 : star} alt="star" /></button>
                                                <button type='button' onClick={() => setSelect(2)} className="rating__star"><img src={select >= 2 ? star1 : star} alt="star" /></button>
                                                <button type='button' onClick={() => setSelect(3)} className="rating__star"><img src={select >= 3 ? star1 : star} alt="star" /></button>
                                                <button type='button' onClick={() => setSelect(4)} className="rating__star"><img src={select >= 4 ? star1 : star} alt="star" /></button>
                                                <button type='button' onClick={() => setSelect(5)} className="rating__star"><img src={select >= 5 ? star1 : star} alt="star" /></button>
                                            </div>
                                            <button onClick={() => newRev()} type='button' className="add_rev-button">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            }
                            <div className="similar">
                                <h3 className="similar__title">Similar Items</h3>
                                <div className="similar__wraper">
                                    <Good key={1} good={goods[0]} addToCart={addToCart} />
                                    <Good key={2} good={goods[2]} addToCart={addToCart} />
                                    <Good key={3} good={goods[3]} addToCart={addToCart} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div>Error</div>}
        </HeaderAndFooter>

    )
}
