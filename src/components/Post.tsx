import React from 'react'
import avatar from './img/blog/avatar.png'


interface Props {
    post: {
        name: string,
        email: string,
        web: string,
        comment: string
    }
}

export const Post: React.FC<Props> = ({ post }) => {
    const date = new Date();
    const day = date.getDate()
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear()


    return (
        <div className="post__wrapper">
            <img className='post__avatar' src={avatar} alt="avatar" />
            <div className="post__content">
                <div className="post__top">
                    <h4 className="post__name">{post.name}</h4>
                    <span>{day} {month}, {year}</span>
                </div>
                <p className="post__comment">{post.comment}</p>
            </div>
        </div>

    )
}
