import { Helmet } from 'react-helmet';
import './Politik.css';
import useFetch from '../../hooks/useFetch';
import PictureCard from '../../components/PictureCard/PictureCard';
import PopularCard from '../../components/PopularCard/PopularCard';
import SpecialNewsCard from '../../components/SpecialNewsCard/SpecialNewsCard';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

const Politik = () => {
    /* fetch news and randomize news */
    const { data: news, isLoading: newsLoading, error: newsError } = useFetch("news");
    const [shuffledNews, setShuffledNews] = useState([]);

    /* shuffle news into a new array */
    useEffect(() => {
        if (news.length > 0) {
            const shuffled = [...news].sort(() => Math.random() - 0.5);
            setShuffledNews(shuffled);
        }
    }, [news]);

    /* filter news for articles with specific category */
    const politicNews = shuffledNews?.filter(article => article.category === 'Politik');

    /* get first 5 shuffled news of new array */
    const pictureCardSelect = politicNews?.slice(0, 5);

    /* get first 4 shuffled news of new array */
    const popularCardSelect = shuffledNews?.slice(0, 4);

    /* filter news for articles with specific category */
    const specialNews = shuffledNews?.filter(article => article?.category === 'Sondermeldung');

    /* find most recent "Sondermeldung" news */
    const recentSpecialNews = specialNews?.length > 0 ? specialNews?.reduce((recent, article) => {
        const recentDate = new Date(recent?.date_time);
        const articleDate = new Date(article?.date_time);

        /* error catch invalid date_time */
        if (isNaN(recentDate) || isNaN(articleDate)) {
            throw new Error('Invalid date_time');
        }

        return articleDate > recentDate ? article : recent;
    }, specialNews[0]) : null;

    /* loading message */
    const loadingMessage = newsLoading ? <div className='loader'></div> : null;

    /* error message */
    const errorMessage = !newsLoading && newsError ? <div className='error_display'><p>Oops! Something went wrong while fetching news data. Please try again later.</p></div> : null;

    /* log and view data */
    /*     console.log('raw news:', news);
        console.log('shuffled news:', shuffledNews);
        console.log('filtered politic category:', politicNews);
        console.log('picture cards:', pictureCardSelect);
        console.log('popular cards:', popularCardSelect);
        console.log('special cards:', popularCardSelect);
        console.log('recent special article:', recentSpecialNews); */

    return (
        <main className='politic'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Politik</title>
                <meta name="description" content="Neues aus Aschaffenburg: Finden Sie hier brandaktuelle Nachrichten, Ereignisse und Geschehnisse aus der Welt der Politik." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Politik" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Finden Sie hier brandaktuelle Nachrichten, Ereignisse und Geschehnisse aus der Welt der Politik." />
                <meta property="og:url" content={`https://platzhalterlink.de/politik/`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Politik" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Finden Sie hier brandaktuelle Nachrichten, Ereignisse und Geschehnisse aus der Welt der Politik." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/artikel/politik/`} />
            </Helmet>

            {loadingMessage}
            {errorMessage}

            <section className='politic_content'>
                {/* Newest News Container */}
                <div className='lmain_newest'>
                    <h2>Politik</h2>
                    <article className='lmain_newest_cards'>
                        {pictureCardSelect.map((article, index) => (
                            <PictureCard
                                key={index}
                                title={article?.title || 'Title not available'}
                                alt={article?.image_descr || 'Image not available'}
                                pic={article?.image_url || './oops_no_image.jpg'}
                                sum={article?.summary || 'Summary not available'}
                                article_link={`/artikel/${article?.id}`}
                            />
                        ))}
                    </article>
                </div>

                {/* Popular News Container */}
                <div className='lmain_popular'>
                    <h2>Die beliebtesten Beiträge</h2>
                    <article className='lmain_popular_cards'>
                        {popularCardSelect.map((article, index) => (
                            <PopularCard
                                key={index}
                                title={article?.title || 'Title not available'}
                                alt={article?.image_descr || 'Image not available'}
                                pic={article?.image_url || './oops_no_image.jpg'}
                                sum={article?.summary || 'Summary not available'}
                                article_link={`/artikel/${article?.id}`}
                            />
                        ))}
                    </article>
                </div>

                {/* Special News Container */}
                <article className='lmain_special'>
                    {recentSpecialNews && (
                        <SpecialNewsCard
                            title={recentSpecialNews?.title || 'Title not available'}
                            alt={recentSpecialNews?.image_descr || 'Image not available'}
                            pic={recentSpecialNews?.image_url || './oops_no_image.jpg'}
                            sum={recentSpecialNews?.summary || 'Summary not available'}
                            article_link={`/artikel/${recentSpecialNews?.id}`}
                        />
                    )}
                </article>
            </section>

            <Footer ads={true} />
        </main>
    )
}

export default Politik