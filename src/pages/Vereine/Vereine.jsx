import { Helmet } from 'react-helmet';
import './Vereine.css';
import useFetch from '../../hooks/useFetch';
import PopularCard from '../../components/PopularCard/PopularCard';
import SpecialNewsCard from '../../components/SpecialNewsCard/SpecialNewsCard';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

const Vereine = () => {
    /* fetch news and randomize news */
    const { data: news, isLoading: newsLoading, error: newsError } = useFetch("news");
    const [shuffledNews, setShuffledNews] = useState([]);

    /* fetch vereine */
    const { data: verein, isLoading: vereinLoading, error: vereinError } = useFetch("vereine");

    /* sort verein alphabetically, ignoring numbers and special characters at the start of the name */
    const sortedVerein = verein?.sort((a, b) => a?.name.replace(/^[^a-zA-Z]+/, "").localeCompare(b?.name.replace(/^[^a-zA-Z]+/, "")));


    /* shuffle news into a new array */
    useEffect(() => {
        if (news.length > 0) {
            const shuffled = [...news].sort(() => Math.random() - 0.5);
            setShuffledNews(shuffled);
        }
    }, [news]);

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
    const loadingMessage = newsLoading || vereinLoading ? <div className='loader'></div> : null;

    /* error messages */
    const newsErrorMessage = (!newsLoading && newsError) ? <div className='error_display'><p>Oops! Something went wrong while fetching news data. Please try again later.</p></div> : null;
    const vereinErrorMessage = (!vereinLoading && vereinError) ? <div className='error_display'><p>Oops! Something went wrong while fetching verein data. Please try again later.</p></div> : null;

    /* log and view data */
    /*     console.log('raw news:', news);
        console.log('sorted verein data:', sortedVerein);
        console.log('shuffled news:', shuffledNews);
        console.log('popular cards:', popularCardSelect);
        console.log('special cards:', popularCardSelect);
        console.log('recent special article:', recentSpecialNews); */

    return (
        <main className='vereine'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Vereine</title>
                <meta name="description" content="Neues aus Aschaffenburg: Entdecken Sie Vereine in Aschaffenburg und Umgebung. Finden Sie Informationen zu lokalen Sportvereinen, Kulturvereinen, und vielem mehr." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Vereine" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Entdecken Sie Vereine in Aschaffenburg und Umgebung. Finden Sie Informationen zu lokalen Sportvereinen, Kulturvereinen, und vielem mehr." />
                <meta property="og:url" content={`https://platzhalterlink.de/vereine/`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Vereine" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Entdecken Sie Vereine in Aschaffenburg und Umgebung. Finden Sie Informationen zu lokalen Sportvereinen, Kulturvereinen, und vielem mehr." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/vereine/`} />
            </Helmet>

            {loadingMessage}
            {newsErrorMessage}
            {vereinErrorMessage}

            <section className='vereine_container'>
                <h2>Vereine</h2>
                <article className='vereine_content_container'>
                    {sortedVerein.map((verein, index) => (
                        /* console.log(verein.url); -> add return if testing for urls */
                        <div className='vereine_content' key={index}>
                            <h3>{verein?.name}</h3>
                            <div className='vereine_content_bottom'>
                                <p>{verein?.type}</p>
                                <div className='vereine_button_container'>
                                    <a title={`Hier geht es nach ${verein?.name}`} href={verein?.url} target="_blank" rel="noopener noreferrer">
                                        <div className='vereine_button'>
                                            Zum Verein
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </article>
            </section>

            <section className='vereine_news_container'>
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

export default Vereine