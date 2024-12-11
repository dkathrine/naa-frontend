import { Helmet } from 'react-helmet';
import './Artikel.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Footer from '../../components/Footer/Footer';
import SpecialNewsCard from '../../components/SpecialNewsCard/SpecialNewsCard';

const Artikel = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loaded, setLoaded] = useState(false);
    const [shuffledNews, setShuffledNews] = useState([]);

    /* fetch news and randomize news */
    const { data: news, isLoading: newsLoading, error: newsError } = useFetch("news");

    useEffect(() => {
        if (news.length > 0) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [news]);

    /* shuffle news into a new array */
    useEffect(() => {
        if (news.length > 0) {
            const shuffled = [...news].sort(() => Math.random() - 0.5);
            setShuffledNews(shuffled);
        }
    }, [news]);

    if (newsLoading) {
        return <div className='loader'></div>;
    }

    if (newsError) {
        return <div className='error_display'><p>News Error: {newsError}</p></div>;
    }

    const article = news?.find(d => d.id == id);

    /* filter news for articles with specific category */
    const specialNews = news?.filter(article => article.category === 'Sondermeldung');

    /* find most recent "Sondermeldung" news */
    const recentSpecialNews = specialNews?.reduce((recent, article) => {
        const recentDate = new Date(recent?.date_time);
        const articleDate = new Date(article?.date_time);

        return articleDate > recentDate ? article : recent;
    }, specialNews[0]);

    if (!article || !recentSpecialNews) {
        return <div><p>Error: Article or special news not found</p></div>;
    }

    /* get first shuffled news of new array */
    const popularArticle = shuffledNews?.slice(0, 4);

    const article_img = {
        backgroundImage: `url(${article?.image_url})`
    }

    return (
        <main className='article'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Artikel</title>
                <meta name="description" content="Neues aus Aschaffenburg: Lesen Sie hier den vollständigen Artikel, samt detaillierter Informationen und Hintergründe zum Thema." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Artikel" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Lesen Sie hier den vollständigen Artikel, samt detaillierter Informationen und Hintergründe zum Thema." />
                <meta property="og:url" content={`https://platzhalterlink.de/artikel/${article?.id}`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Artikel" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Lesen Sie hier den vollständigen Artikel, samt detaillierter Informationen und Hintergründe zum Thema." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/artikel/${article?.id}`} />
            </Helmet>

            <section className='article_container'>
                <p className='article_date'>{`${article?.date_time}`}</p>
                <h1 className='article_title'>{`${article?.title}`}</h1>
                <p className='article_author'>{`${article?.author}`}</p>
                <div className={`article_img_container fade-in ${loaded ? 'visible' : ''}`} style={article_img}>
                    {/* image container */}
                </div>
                <p className='article_img_src'>{`${article?.image_source}`}</p>
                <div className='article_content_container'>
                    <p className='article_content'>{`${article?.content}`}</p>
                    {/* Popular News Container */}
                    <div className='article_popular'>
                        <div className='article_popular_title'>
                            <h2>Die beliebtesten Beiträge</h2>
                        </div>

                        <article className='article_popular_cards'>
                            {popularArticle?.map((article) => {
                                const cardStyle = {
                                    backgroundImage: `url(${article?.image_url})`
                                };

                                /* truncate title if it's too long */
                                const truncatedTitle = article?.title?.length > 50 ? article?.title?.substring(0, 50) + "..." : article?.title;

                                return (
                                    <div key={article?.id} className='article_popular_card' onClick={() => {
                                        window.scrollTo(0, 0);
                                        navigate(`/artikel/${article?.id}`)
                                    }}>
                                        <div className={`article_popular_card_left fade-in ${loaded ? 'visible' : ''}`} style={cardStyle}>
                                        </div>
                                        <div className='article_popular_card_right'>
                                            <h2>{truncatedTitle}</h2>
                                        </div>
                                    </div>
                                );
                            })}
                        </article>
                    </div>
                </div>
            </section>

            <section className='article_special_news_container'>
                {/* Special News Container */}
                <article className='lmain_special'>
                    {recentSpecialNews && (
                        <SpecialNewsCard
                            title={recentSpecialNews?.title}
                            pic={recentSpecialNews?.image_url}
                            sum={recentSpecialNews?.summary}
                            article_link={`/artikel/${recentSpecialNews?.id}`}
                        />
                    )}
                </article>
            </section>

            <Footer ads={true} />
        </main>
    )
}

export default Artikel