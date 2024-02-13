import React from 'react'
import { Link } from 'react-router-dom'


interface IProps {
    article: {
        id: number,
        img: string,
        category: string,
        date: string,
        title: string,
        desc: string,
    }
}

export const BlogItem: React.FC<IProps> = ({ article }) => {
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className='article__wrapper'>
            <img className='article__img' src={article.img} alt={article.title} />
            <h3 className='article__title'>{article.title}</h3>
            <div className="date_categ">
                <span className='article__category'>{article.category} - </span>
                <span className='article__date'>{article.date}</span>
            </div>

            <p className='article__desc'>{article.desc}</p>

            <Link onClick={handleLinkClick} className='article__link' to={`/blog/${article.id}`} >Read More</Link>
        </div>
    )
}
