import { Helmet } from 'react-helmet';
import './Notdienst.css';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import PopularCard from '../../components/PopularCard/PopularCard';
import SpecialNewsCard from '../../components/SpecialNewsCard/SpecialNewsCard';
import Footer from '../../components/Footer/Footer';

const Notdienst = () => {
    const [showAll, setShowAll] = useState(false);
    const [shuffledNews, setShuffledNews] = useState([]);

    /* fetch news and randomize news */
    const { data: news, isLoading: newsLoading, error: newsError } = useFetch("news");

    /* fetch notdienste */
    const { data: notdienst, isLoading: notdienstLoading, error: notdienstError } = useFetch("notdienste");

    /* sort notdienst alphabetically, ignoring numbers and special characters at the start of the name */
    const sortedNotdienst = notdienst?.sort((a, b) => a.name.replace(/^[^a-zA-Z]+/, "").localeCompare(b.name.replace(/^[^a-zA-Z]+/, "")));


    /* shuffle news into a new array */
    useEffect(() => {
        if (news.length > 0) {
            const shuffled = [...news].sort(() => Math.random() - 0.5);
            setShuffledNews(shuffled);
        }
    }, [news]);

    /* get first 4 shuffled news of new array */
    const popularCardSelect = shuffledNews.slice(0, 4);

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

    /* toggle function for showing less / more events */
    const handleShowMore = () => {
        showAll && window.scrollTo(0, 0)
        setShowAll(!showAll);
    };


    /* amount of initial data loaded and displayed */
    const displayedNotdienst = showAll ? sortedNotdienst : sortedNotdienst.slice(0, 3);

    /* loading message */
    const loadingMessage = newsLoading || notdienstLoading ? <div className='loader'></div> : null;

    /* error messages */
    const newsErrorMessage = (!newsLoading && newsError) ? <div className='error_display'><p>Oops! Something went wrong while fetching news data. Please try again later.</p></div> : null;
    const notdienstErrorMessage = (!notdienstLoading && notdienstError) ? <div className='error_display'><p>Oops! Something went wrong while fetching notdienst data. Please try again later.</p></div> : null;

    /* log and view data */
    /*     console.log('raw news:', news);
        console.log('shuffled news:', shuffledNews);
        console.log('popular cards:', popularCardSelect);
        console.log('special cards:', popularCardSelect);
        console.log('recent special article:', recentSpecialNews);
        console.log('displayed notdienst:', displayedNotdienst); */

    return (
        <main className='notdienst'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Notdienst</title>
                <meta name="description" content="Neues aus Aschaffenburg: Finden Sie hier Informationen zu Notdiensten in Ihrer Region." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Notdienste" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Finden Sie hier Informationen zu Notdiensten in Ihrer Region." />
                <meta property="og:url" content={`https://platzhalterlink.de/notdienste/`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Notdienste" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Finden Sie hier Informationen zu Notdiensten in Ihrer Region." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/notdienste/`} />
            </Helmet>

            {loadingMessage}
            {newsErrorMessage}
            {notdienstErrorMessage}

            <section className='notdienst_container'>
                <h2>Notdienste</h2>

                {displayedNotdienst.map((item, index) => (
                    <div className='notdienst_content' key={index}>
                        <div>
                            <h3>{item?.name}</h3>
                            <p>{item?.date_time}</p>
                            <p>Tel.: {item?.tel}</p>
                        </div>
                        <div>
                            <p>{item?.location}</p>
                        </div>
                    </div>
                ))}

                <div title={showAll ? 'Weniger anzeigen' : 'Mehr anzeigen'} className='notdienst_button_container'>
                    <button className='notdienst_button' onClick={handleShowMore}>
                        <span>{showAll ? 'Weniger' : 'Mehr'}</span>
                    </button>
                </div>
            </section>

            <section className='notdienst_news_container'>
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

export default Notdienst