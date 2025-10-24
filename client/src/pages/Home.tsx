import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import { fetchNewsHeadlines } from '../services/api';
import { News } from '../types';

const Home: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('recent data center news');

    const getNews = async (p?: string) => {
        setLoading(true);
        try {
            const headlines = await fetchNewsHeadlines({ prompt: p ?? prompt, type: 'news' });
            setNews(headlines);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Recent News in the Data Center Industry</h1>

            <div style={{ marginBottom: 12 }}>
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter scraping prompt or query..."
                    style={{ width: '60%' }}
                />
                <button onClick={() => getNews(prompt)} disabled={loading} style={{ marginLeft: 8 }}>
                    {loading ? 'Loading…' : 'Fetch'}
                </button>
            </div>

            <NewsList news={news} />
        </div>
    );
};

export default Home;