import React, { useState, useEffect } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'
import search from './../components/img/shop_search.svg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'


import { BlogItem } from '../components/BlogItem'
import './../components/Blog.scss'

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
    articles: {
        id: number,
        img: string,
        category: string,
        date: string,
        title: string,
        desc: string,
    }[],
    minus: (id: number) => void,
    plus: (id: number, n?: number) => void,
}

export const Blog: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, articles, minus, plus }) => {
    const [prev, setPrev] = useState(true)
    const [inp, setInp] = useState('')
    const [categ, setCateg] = useState('')

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
                <div className="blog">
                    <div className="container">
                        <h2 className="blog__title">Blog</h2>
                        <div className="blog__search_top">
                            <input value={inp} onChange={e => setInp(e.target.value)} placeholder='Search...' type="text" />
                            <img src={search} alt="search" />
                        </div>

                        <div className="blog__content">
                            <aside className='blog__aside'>
                                <div className="blog__search">
                                    <input value={inp} onChange={e => setInp(e.target.value)} placeholder='Search...' type="text" />
                                    <img src={search} alt="search" />
                                </div>
                                <div className="categories">
                                    <h4 className="blog__categories">Categories</h4>
                                    <ul>
                                        <li className="categories__item"><button onClick={() => setCateg('Fashion')} className={categ === 'Fashion' ? "categories__item_but active" : 'categories__item_but'}>Fashion</button></li>
                                        <li className="categories__item"><button onClick={() => setCateg('Style')} className={categ === 'Style' ? "categories__item_but active" : 'categories__item_but'}>Style</button></li>
                                        <li className="categories__item"><button onClick={() => setCateg('Accessories')} className={categ === 'Accessories' ? "categories__item_but active" : 'categories__item_but'}>Accessories</button></li>
                                        <li className="categories__item"><button onClick={() => setCateg('Season')} className={categ === 'Season' ? "categories__item_but active" : 'categories__item_but'}>Season</button></li>
                                    </ul >
                                </div >
                            </aside >
                            <div className="articles">
                                <div className="articles__wrapper">
                                    {categ === '' ? articles
                                        .filter(article => article.title.toLowerCase().includes(inp.toLowerCase())).length > 0 ?
                                        articles.filter(article => article.title.toLowerCase().includes(inp.toLowerCase()))
                                            .slice(prev ? 0 : 4, prev ? 4 : articles.length)
                                            .map(article => (
                                                <BlogItem key={article.id} article={article} />
                                            ))
                                        : <div className="article__empty">There are no match</div>
                                        : articles
                                            .filter(article => { return (article.title.toLowerCase().includes(inp.toLowerCase()) && article.category === categ) }).length > 0 ?
                                            articles.filter(article => { return (article.title.toLowerCase().includes(inp.toLowerCase()) && categ === article.category) })
                                                .slice(prev ? 0 : 4, prev ? 4 : articles.length)
                                                .map(article => (
                                                    <BlogItem key={article.id} article={article} />
                                                ))
                                            : <div className="article__empty">There are no match</div>}
                                </div>
                                <div className={prev ? `blog__buttons` : `blog__buttons active`}>
                                    {categ !== '' ? articles.filter(article => { return (article.title.toLowerCase().includes(inp.toLowerCase()) && article.category === categ) }).length > 4 &&
                                        <>
                                            {!prev && <button onClick={() => setPrev(true)} className="blog__arrow_prev"><IoIosArrowBack /></button>}

                                            <button onClick={() => setPrev(true)} className={prev ? `blog__prev active` : `blog__prev`}>1</button>
                                            <button onClick={() => setPrev(false)} className={!prev ? `blog__next active` : `blog__next`}>2</button>
                                            {prev && <button onClick={() => setPrev(false)} className="blog__arrow_next"><IoIosArrowForward /></button>}
                                        </>
                                        : articles.filter(article => article.title.toLowerCase().includes(inp.toLowerCase())).length > 4 &&
                                        <>
                                            {!prev && <button onClick={() => setPrev(true)} className="blog__arrow_prev"><IoIosArrowBack /></button>}

                                            <button onClick={() => setPrev(true)} className={prev ? `blog__prev active` : `blog__prev`}>1</button>
                                            <button onClick={() => setPrev(false)} className={!prev ? `blog__next active` : `blog__next`}>2</button>
                                            {prev && <button onClick={() => setPrev(false)} className="blog__arrow_next"><IoIosArrowForward /></button>}
                                        </>}


                                </div>

                            </div>

                        </div >
                        <div className="categories phone">
                            <h4 className="blog__categories">Categories</h4>
                            <ul>
                                <li className="categories__item"><button onClick={() => setCateg('Fashion')} className={categ === 'Fashion' ? "categories__item_but active" : 'categories__item_but'}>Fashion</button></li>
                                <li className="categories__item"><button onClick={() => setCateg('Style')} className={categ === 'Style' ? "categories__item_but active" : 'categories__item_but'}>Style</button></li>
                                <li className="categories__item"><button onClick={() => setCateg('Accessories')} className={categ === 'Accessories' ? "categories__item_but active" : 'categories__item_but'}>Accessories</button></li>
                                <li className="categories__item"><button onClick={() => setCateg('Season')} className={categ === 'Season' ? "categories__item_but active" : 'categories__item_but'}>Season</button></li>
                            </ul>
                        </div>

                    </div >
                </div >
            </HeaderAndFooter >
        </div >
    )

}

