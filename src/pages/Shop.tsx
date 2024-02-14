import React, { useState, useEffect, ChangeEvent } from 'react'
import { HeaderAndFooter } from '../HeaderAndFooter'
import { Good } from '../components/Good';

import './../components/Shop.scss'
import searchImg from './../components/img/shop_search.svg'
import { BiArrowBack } from 'react-icons/bi';

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

export const Shop: React.FC<Props> = ({ cart, setCart, cartSum, setCartSum, goods, minus, plus }) => {

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
    const [min, setMin] = useState('0');
    const [max, setMax] = useState('30');
    const [sale, setSale] = useState(false)
    const [stock, setStock] = useState(false)
    const [search, setSearch] = useState('')
    const [searchFilter, setSearchFilter] = useState('')
    const [filtersOpen, setFiltersOpen] = useState(false)

    const minPrice = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value >= 0) {
            setMin(e.target.value);
        } else {
            setMin('')
        }
    }

    const maxPrice = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value > 0) {
            setMax(e.target.value);
        } else {
            setMax('')
        }
    }
    const [sortOption, setSortOption] = useState('');

    const handleSortOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };
    const sortByOption = (a: IGoods, b: IGoods) => {
        switch (sortOption) {
            case 'name':
                return a.title.localeCompare(b.title);
            case 'cheapest':
                return (a.price - a.price * a.stock / 100) - (b.price - b.price * b.stock / 100);
            case 'expensive':
                return (b.price - b.price * b.stock / 100) - (a.price - a.price * a.stock / 100);
            default:
                return 0;
        }
    };
    let sortedGoods = [...goods];


    return (
        <div>
            {filtersOpen && <div className="filters__inner">
                <div className="filters">
                    <button onClick={() => setFiltersOpen(false)} className="filters__back">
                        <BiArrowBack />
                    </button>
                    <form action="#" className="phone_shop__form">
                        <div className="phone_form__input">
                            <input onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    setSearchFilter(search);
                                }
                            }} value={search} onChange={e => setSearch(e.target.value)} placeholder='Search...' type="text" className="phone_shop__input" />
                            <button type='button' className="phone_shop__input_button">
                                <img onClick={() => setSearchFilter(search)} src={searchImg} alt="search" className="shop__input_button-img" />
                            </button>
                        </div>
                        <div className="phone_form__select">
                            <select className='phone_select__by' name="sort" value={sortOption} onChange={handleSortOptionChange}>
                                <option value="">Sort by</option>
                                <option value="name">Name</option>
                                <option value="cheapest">Cheapest</option>
                                <option value="expensive">Expencive</option>
                            </select>
                        </div>
                        <div className="phone_price__input">
                            <span className='phone_price'>Price:</span>
                            <input
                                className='phone_price__min phone_price__inp'
                                type="number"
                                value={min}
                                onChange={minPrice}
                            />
                            <input
                                className='phone_price__max phone_price__inp'
                                type="number"
                                value={max}
                                onChange={maxPrice}
                            />
                        </div>
                        <div className="phone_min_max">
                            <div className="phone_min">min</div>
                            <div className="phone_max">max</div>
                        </div>

                        <div className="phone_sale">
                            <span className="phone_sale__name">On sale</span>
                            <button onClick={() => setSale(!sale)} type='button' className={sale ? `sale__button_div active` : `sale__button_div`}>
                                <span className={sale ? 'sale__circle active' : 'sale__circle'}></span>
                            </button>
                        </div>
                        <div className="phone_stock">
                            <span className="phone_stock__name">In stock</span>
                            <button onClick={() => setStock(!stock)} type='button' className={stock ? `stock__button_div active` : `stock__button_div`}>
                                <span className={stock ? 'stock__circle active' : 'stock__circle'}></span>
                            </button>
                        </div>




                    </form>
                </div>
            </div>}
            <HeaderAndFooter minus={minus} plus={plus} cartSum={cartSum} totalSum={cartSum} setCart={setCart} deleteCart={deleteCart} cart={cart}>
                <div className="container">
                    <h3 className="goods__title shop__title">Shop The Latest</h3>
                    <div className="shop__inner">
                        <aside className='aside'>
                            <form action="#" className="shop__form">
                                <div className="form__input">
                                    <input onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            setSearchFilter(search);
                                        }
                                    }} value={search} onChange={e => setSearch(e.target.value)} placeholder='Search...' type="text" className="shop__input" />
                                    <button type='button' className="shop__input_button">
                                        <img onClick={() => setSearchFilter(search)} src={searchImg} alt="search" className="shop__input_button-img" />
                                    </button>
                                </div>
                                <div className="form__select">
                                    <select className='select__by' name="sort" value={sortOption} onChange={handleSortOptionChange}>
                                        <option value="">Sort by</option>
                                        <option value="name">Name</option>
                                        <option value="cheapest">Cheapest</option>
                                        <option value="expensive">Expencive</option>
                                    </select>
                                </div>
                                <div className="price__input">
                                    <span className='price'>Price:</span>
                                    <input
                                        className='price__min price__inp'
                                        type="number"
                                        value={min}
                                        onChange={minPrice}
                                    />
                                    <input
                                        className='price__max price__inp'
                                        type="number"
                                        value={max}
                                        onChange={maxPrice}
                                    />
                                </div>
                                <div className="min_max">
                                    <div className="min">min</div>
                                    <div className="max">max</div>
                                </div>

                                <div className="sale">
                                    <span className="sale__name">On sale</span>
                                    <button onClick={() => setSale(!sale)} type='button' className={sale ? `sale__button_div active` : `sale__button_div`}>
                                        <span className={sale ? 'sale__circle active' : 'sale__circle'}></span>
                                    </button>
                                </div>
                                <div className="stock">
                                    <span className="stock__name">In stock</span>
                                    <button onClick={() => setStock(!stock)} type='button' className={stock ? `stock__button_div active` : `stock__button_div`}>
                                        <span className={stock ? 'stock__circle active' : 'stock__circle'}></span>
                                    </button>
                                </div>



                            </form>
                        </aside>

                        <button onClick={() => setFiltersOpen(true)} className="filter__button">Filters</button>



                        <div className="shop_goods__wraper">
                            {searchFilter !== '' ? (
                                sortedGoods.filter(good => good.price - good.price * good.stock / 100 >= parseFloat(min) && good.price - good.price * good.stock / 100 <= parseFloat(max))
                                    .filter(good =>
                                        good.title.toLowerCase().includes(searchFilter.toLowerCase())

                                    ).filter(good => sale ? good.sale === true : true)
                                    .filter(good => stock ? good.stock > 0 : true)
                                    .length > 0 ? (
                                        sortedGoods
                                            .filter(good => good.price - good.price * good.stock / 100 >= parseFloat(min) && good.price - good.price * good.stock / 100 <= parseFloat(max))
                                            .filter(good =>
                                                good.title.toLowerCase().includes(searchFilter.toLowerCase())
                                            ))
                                        .filter(good => sale ? good.sale === true : true)
                                        .filter(good => stock ? good.stock > 0 : true)
                                        .sort(sortByOption)
                                        .map(good => (
                                            <Good key={good.id} good={good} addToCart={addToCart} />
                                        ))
                                    : (
                                        <div className="emptyGood">There are no such goods</div>
                                    )
                            ) : (
                                sortedGoods
                                    .filter(good => good.price - good.price * good.stock / 100 >= parseFloat(min) && good.price - good.price * good.stock / 100 <= parseFloat(max))
                                    .sort(sortByOption)
                                    .filter(good => sale ? good.sale === true : true)
                                    .filter(good => stock ? good.stock > 0 : true)
                                    .length > 0 ? (
                                    sortedGoods
                                        .filter(good => good.price - good.price * good.stock / 100 >= parseFloat(min) && good.price - good.price * good.stock / 100 <= parseFloat(max))
                                        .sort(sortByOption)
                                        .filter(good => sale ? good.sale === true : true)
                                        .filter(good => stock ? good.stock > 0 : true)
                                        .map(good => (
                                            <Good key={good.id} good={good} addToCart={addToCart} />
                                        ))) : (<div className="emptyGood">There are no such goods</div>)
                            )}
                        </div>

                    </div>

                </div>
            </HeaderAndFooter>
        </div>
    )

}
