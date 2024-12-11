import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import EnvDisplay from '../../components/EnvDisplay/EnvDisplay';
import Footer from '../../components/Footer/Footer';
import PictureCard from '../../components/PictureCard/PictureCard';
import PopularCard from '../../components/PopularCard/PopularCard';
import SpecialNewsCard from '../../components/SpecialNewsCard/SpecialNewsCard';
import useFetch from '../../hooks/useFetch';
import './LandingPage.css';
import { useEffect, useState } from 'react';

const LandingPage = () => {
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    const [shuffledNews, setShuffledNews] = useState([]);


    /* fetch news and randomize news */
    const { data: news, randomData: randomNews, isLoading: newsLoading, error: newsError } = useFetch("news");


    useEffect(() => {
        if (news.length > 0) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [news]);

    /* truncate title if it's too long */
    const truncatedTitle = randomNews?.title?.length > 50 ? randomNews.title.substring(0, 50) + "..." : randomNews?.title || '';


    /* shuffle news into a new array */
    useEffect(() => {
        if (news.length > 0) {
            const shuffled = [...news].sort(() => Math.random() - 0.5);
            setShuffledNews(shuffled);
        }
    }, [news]);

    /* get first 5 shuffled news of new array */
    const pictureCardSelect = shuffledNews?.slice(0, 5);

    /* get first 4 shuffled news of new array */
    const popularCardSelect = shuffledNews?.slice(0, 4);

    /* filter for articles with specific category */
    const specialNews = shuffledNews?.filter(article => article.category === 'Sondermeldung');

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

    const header_img = {
        backgroundImage: `url(${randomNews?.image_url || './oops_no_image.webp'})`
    }

    /* loading message */
    const loadingMessage = newsLoading ? <div className='loader'></div> : null;

    /* error message */
    const errorMessage = !newsLoading && newsError ? <div className='error_display'><p>Oops! Something went wrong while fetching news data. Please try again later.</p></div> : null;

    /* log and view data */
    /*     console.log('raw news:', news);
        console.log('random single article:', randomNews);
        console.log('random single article:', randomNews.image_descr);
        console.log('shuffled news:', shuffledNews);
        console.log('picture cards:', pictureCardSelect);
        console.log('popular cards:', popularCardSelect);
        console.log('special cards:', popularCardSelect);
        console.log('recent special article:', recentSpecialNews);
        console.log('recent special article:', recentSpecialNews.image_descr); */

    return (
        <main className='landing_page'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Aktuelles</title>
                <meta name="description" content="Neues aus Aschaffenburg: Entdecken Sie hier die neuesten Nachrichten, beliebtesten Artikel und aktuellsten Sondermeldungen." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Aktuelles" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Entdecken Sie hier die neuesten Nachrichten, beliebtesten Artikel und aktuellsten Sondermeldungen." />
                <meta property="og:url" content={`https://platzhalterlink.de/`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Aktuelles" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Entdecken Sie hier die neuesten Nachrichten, beliebtesten Artikel und aktuellsten Sondermeldungen." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/`} />
            </Helmet>

            {loadingMessage}
            {errorMessage}

            {/* Landingpage Header */}
            <section className={`landingpage_header fade-in ${loaded ? 'visible' : ''}`} style={header_img}>
                <div className='lheader_date_clock_temp'>
                    <EnvDisplay />
                </div>
                <div className='lheader_title'>
                    <h1 title={truncatedTitle}>{truncatedTitle}</h1>
                    <ButtonLink name="Artikel lesen" link={`/artikel/${randomNews?.id}`} opac={true} />
                </div>
                <div className='lheader_categories'>
                    <div title="Hier geht es zu den anstehenden Veranstaltungen" className='lheader_category' onClick={(e) => {
                        e.preventDefault();
                        navigate('/veranstaltungen')
                    }}>
                        <h3>Veranstaltungen</h3>
                        <p>Alle Artikel zum Thema Veranstaltungen</p>
                    </div>
                    <div title="Hier geht es zu den laufenden Vereinen" className='lheader_category' onClick={(e) => {
                        e.preventDefault();
                        navigate('/vereine')
                    }}>
                        <h3>Vereine</h3>
                        <p>Alle Artikel zum Thema Verein</p>
                    </div>
                    <div title="Hier geht es zu den aktuellen Themen der Politik" className='lheader_category' onClick={(e) => {
                        e.preventDefault();
                        navigate('/politik')
                    }}>
                        <h3>Politik</h3>
                        <p>Alle Artikel zum Thema Politik</p>
                    </div>
                    <div title="Hier geht es zu den erreichbaren Notdiensten" className='lheader_category' onClick={(e) => {
                        e.preventDefault();
                        navigate('/notdienste')
                    }}>
                        <h3>Notdienste</h3>
                        <p>Alle Artikel zum Thema Notdienst</p>
                    </div>
                </div>
            </section>

            {/* Landingpage Main */}
            <section className='landingpage_main'>
                {/* Newest News Container */}
                <div className='lmain_newest'>
                    <h2>Neuste Beiträge</h2>
                    <article className='lmain_newest_cards'>
                        {pictureCardSelect.map((article, index) => (
                            <PictureCard
                                key={index}
                                title={article?.title || 'Title not available'}
                                alt={article?.image_descr || 'Image not available'}
                                pic={article?.image_url || './oops_no_image.webp'}
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
                                pic={article?.image_url || './oops_no_image.webp'}
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
                            pic={recentSpecialNews?.image_url || './oops_no_image.webp'}
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

export default LandingPage