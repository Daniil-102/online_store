import React, { useState, ChangeEvent } from 'react'
import './Footer.scss'

import icon1 from './img/footer/in.svg'
import icon2 from './img/footer/facebook.svg'
import icon3 from './img/footer/instagram.svg'
import icon4 from './img/footer/twiter.svg'
import arrow from './img/footer/footer_arrow.svg'
import { Link } from 'react-router-dom'



export const Footer: React.FC = () => {

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    const [inp, setInp] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInp(event.target.value);
    };

    return (
        <div className='container'>
            <div className="footer__top">
                <div className="footer__links">
                    <Link onClick={handleLinkClick} to={'/contact'} className="footer__link">CONTACT</Link>
                    <Link onClick={handleLinkClick} to={'/privacy'} className="footer__link">TERMS OF SERVICES</Link>
                    <Link onClick={handleLinkClick} to={'/contact'} className="footer__link">SHIPPING AND RETURNS</Link>
                </div>
                <div className='input__block'>
                    <input value={inp} onChange={(e) => handleChange(e)} placeholder='Give an email, get the newsletter.' type="text" className="footer__input" />
                    <button className='footer__arrow' onClick={() => setInp('')}>
                        <img src={arrow} alt="arrow" />
                    </button>
                </div>
            </div>
            <div className="footer__bottom">
                <p className="footer__terms">
                    © 2021 Shelly. <span>Terms of use </span>and<span> privacy policy. </span>
                </p>
                <div className='footer__icons-block'>
                    <span className="follow">Follow us</span>
                    <div className="footer__icons">
                        <a href="#">
                            <img src={icon1} alt="icon" className="footer__icon" />
                        </a>
                        <a href="#">
                            <img src={icon2} alt="icon" className="footer__icon" />
                        </a>
                        <a href="#">
                            <img src={icon3} alt="icon" className="footer__icon" />
                        </a>
                        <a href="#">
                            <img src={icon4} alt="icon" className="footer__icon" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}
