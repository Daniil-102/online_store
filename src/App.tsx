import { Toaster } from 'sonner'
import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';

import { Main } from './pages/Main';
import { Shop } from './pages/Shop';
import { Blog } from './pages/Blog';
import { Story } from './pages/Story';
import { ShopingCart } from './pages/ShoppingCart';
import { Error } from './pages/Error';
import { Contact } from './pages/Contact'
import { Privacy } from './pages/Privacy';
import { BlogItemId } from './components/BlogItemId';
import { Product } from './components/ShopId';

import img1 from './components/img/goods/1.jpg'
import img2 from './components/img/goods/2.jpg'
import img3 from './components/img/goods/3.jpg'
import img4 from './components/img/goods/4.jpg'
import img5 from './components/img/goods/5.jpg'
import img6 from './components/img/goods/6.jpg'

import im1 from './components/img/blog/1.jpg'
import im2 from './components/img/blog/2.jpg'
import im3 from './components/img/blog/3.jpg'
import im4 from './components/img/blog/4.jpg'



interface IGoods {
  id: number;
  image: string,
  title: string,
  price: number,
  count: number,
  stock: number,
  sale: boolean
}
interface article {
  id: number,
  img: string,
  category: string,
  date: string,
  title: string,
  desc: string,
}

const goods: IGoods[] = [
  { id: 1, image: img1, title: 'Hal Earrings', price: 22, count: 1, stock: 21, sale: true },
  { id: 2, image: img2, title: 'Lira Earrings', price: 22, count: 1, stock: 0, sale: true },
  { id: 3, image: img3, title: 'Kaede Hair Pin Set Of 3', price: 30, count: 1, stock: 0, sale: false },
  { id: 4, image: img4, title: 'Hair Pin Set of 3', price: 30, count: 1, stock: 0, sale: true },
  { id: 5, image: img5, title: 'Plaine Necklace', price: 19, count: 1, stock: 0, sale: false },
  { id: 6, image: img6, title: 'Yuki Hair Pin Set of 3', price: 29, count: 1, stock: 13, sale: true }
]

const articles: article[] = [
  { id: 1, img: im1, category: 'Fashion', date: 'October 8, 2020', title: 'Top Trends From Spring', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
  { id: 2, img: im2, category: 'Style', date: 'November 4, 2020', title: 'Best styles decisions', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
  { id: 3, img: im3, category: 'Season', date: 'October 8, 2020', title: 'Beatiful neackles for home', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
  { id: 4, img: im4, category: 'Accessories', date: 'December 21, 2020', title: 'Your own style', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
  { id: 5, img: im3, category: 'Fashion', date: 'May 11, 2020', title: 'Fashion in small town', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
  { id: 6, img: im1, category: 'Accessories', date: 'December 13, 2020', title: 'Rings for first time', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
  { id: 7, img: im2, category: 'Style', date: 'October 18, 2020', title: 'How to look beauty', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
  { id: 8, img: im4, category: 'Style', date: 'May 26, 2020', title: 'Hair and style', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  faucibus augue, a maximus elit ex vitae libero... ' },
]


const App: React.FC = () => {
  const cardDate = localStorage.getItem('cart')
  const isMounted = useRef(false)
  const [cart, setCart] = useState<IGoods[]>(cardDate ? JSON.parse(cardDate) : []);
  const [cartSum, setCartSum] = useState(0);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cart)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true;

  }, [cart, setCartSum])

  const plusCount = (id: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
  };

  const minusCount = (id: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id && item.count > 1) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    });
  };

  return (
    <div className="wrapper">
      <Toaster position="top-right" />

      <Router>
        <Routes>

          <Route path="/" element={<Main minus={minusCount} plus={plusCount} goods={goods} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/shop" element={<Shop minus={minusCount} plus={plusCount} goods={goods} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/shop/:id" element={<Product minus={minusCount} plus={plusCount} goods={goods} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/blog" element={<Blog minus={minusCount} plus={plusCount} articles={articles} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/blog/:id" element={<BlogItemId minus={minusCount} plus={plusCount} articles={articles} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/story" element={<Story minus={minusCount} plus={plusCount} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/cart" element={<ShopingCart minus={minusCount} plus={plusCount} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/contact" element={<Contact minus={minusCount} plus={plusCount} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="/privacy" element={<Privacy minus={minusCount} plus={plusCount} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />
          <Route path="*" element={<Error minus={minusCount} plus={plusCount} cart={cart} setCart={setCart} cartSum={cartSum} setCartSum={setCartSum} />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
