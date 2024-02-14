import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderAndFooter } from '../HeaderAndFooter';
import { Error } from '../pages/Error';

import big from './img/blog/big.jpg'
import big1 from './img/blog/big1.jpg'
import facebook from './img/blog/facebook.svg'
import instagram from './img/blog/instagram.svg'
import twitter from './img/blog/twitter.svg'
import { Post } from './Post';

interface IGoods {
    id: number;
    image: string,
    title: string,
    price: number,
    count: number,
    stock: number,
    sale: boolean
}
interface Iarticle {
    id: number,
    img: string,
    category: string,
    date: string,
    title: string,
    desc: string,
}
interface Props {
    cart: IGoods[];
    setCart: React.Dispatch<React.SetStateAction<IGoods[]>>;
    cartSum: number;
    setCartSum: React.Dispatch<React.SetStateAction<number>>;
    articles: Iarticle[],
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
}
interface post {
    name: string,
    email: string,
    web: string,
    comment: string
}


export const BlogItemId: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, articles, minus, plus }) => {
    const postsData = localStorage.getItem('posts')

    const [checkbox, setCheckbox] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [web, setWeb] = useState('')
    const [comment, setComment] = useState('')
    const [posts, setPosts] = useState<post[]>(postsData ? JSON.parse(postsData) : [])
    const isMounted = React.useRef(false)

    const setPost = () => {
        if (name.length && email.length && comment.length) {
            const post = {
                name: name,
                email: email,
                web: web,
                comment: comment
            }
            setPosts([...posts, post])
            if (checkbox) {
                setWeb('');
                setComment('')
            } else {
                setName('')
                setEmail('')
                setWeb('');
                setComment('')
            }
        }


    }
    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(posts)
            localStorage.setItem('posts', json)
        }
        isMounted.current = true;

    }, [posts])

    useEffect(() => {
        let sum = 0
        cart.map(item => item.stock > 0 ? sum += item.price * item.count - item.price * item.count * item.stock / 100 : sum += item.price * item.count)
        setCartSum(Math.round(sum * 100) / 100);
    }, [cart, setCartSum]);


    const deleteCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }


    const { id } = useParams();
    const article = id ? articles[+id - 1] : false


    return (
        <>
            {article ?
                <HeaderAndFooter minus={minus} plus={plus} cartSum={cartSum} totalSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart}>
                    < div className="container" >


                        <div className='blog__item'>
                            <h2 className='b__title'>{article.title}</h2>
                            <div className="b__author_date">
                                by<span> ANNY JOHNSON - </span>{article.date}
                            </div>
                            <img src={big} alt="img" className="b__first" />
                            <div className="blog__container">
                                <p className="b__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue.</p>
                                <p className='b__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.</p>
                                <div className='b__second_block'><img src={big1} alt="img" className="b__second" /></div>
                                <h4 className="b__trends">Top trends</h4>
                                <p className="b__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero.</p>
                                <ul>
                                    <li className="b__item">consectetur adipiscing elit. Aliquam placerat</li>
                                    <li className="b__item">Lorem ipsum dolor sit amet consectetur</li>
                                    <li className="b__item">sapien tortor faucibus augue</li>
                                    <li className="b__item">a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis</li>
                                </ul>
                                <div className="b__info">
                                    <div className="b__tags"><span>Tags</span> Fashion, Style, Season</div>
                                    <div className="b__share"><span>Share</span>
                                        <div className="b__links">
                                            <img src={facebook} alt="icon" className="b__link_img" />
                                            <img src={instagram} alt="icon" className="b__link_img" />
                                            <img src={twitter} alt="icon" className="b__link_img" />
                                        </div>
                                    </div>
                                </div>
                                <form className="b__form">
                                    <h3 className="b__form-title">Leave a Reply</h3>
                                    <p className="b__form-text">Your email address will not be published. Required fields are marked *</p>
                                    <input
                                        placeholder='Enter your name*'
                                        type="text"
                                        className="b__form-name b__inp"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <input
                                        placeholder='Enter your Email*'
                                        type="email"
                                        className="b__form-email b__inp"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        placeholder='Enter your Website'
                                        type="text"
                                        className="b__form-web b__inp"
                                        value={web}
                                        onChange={(e) => setWeb(e.target.value)} />
                                    <div className="b__form-checkbox">
                                        <button onClick={() => setCheckbox(!checkbox)} type='button' className={checkbox ? 'b__form-checkbox_button active' : `b__form-checkbox_button`}></button>
                                        <p className="b__form-checkbox_text">Save my name, email, and website in this browser for the next time I comment</p>
                                    </div>
                                    <textarea
                                        placeholder='Your comment*'
                                        className='b__form-textarea'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <button onClick={e => { e.preventDefault(); setPost() }} className="b__form_button">POST COMMENT</button>
                                </form>
                                <div className="posts">
                                    <h3 className="posts__title">Comments({posts.length})</h3>
                                    {posts.map((post, index) => <Post post={post} key={index} />)}

                                </div>
                            </div>
                        </div>

                    </div >
                </HeaderAndFooter >
                : <Error minus={minus} plus={plus} setCartSum={setCartSum} cartSum={cartSum} setCart={setCart} cart={cart} />}
        </>
    )

}
