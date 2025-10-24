import React from 'react';
import { News } from '../../types';

interface NewsListProps {
    news: News[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
    return (
        <div>
            <h2>Recent News</h2>
            <ul>
                {news.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;