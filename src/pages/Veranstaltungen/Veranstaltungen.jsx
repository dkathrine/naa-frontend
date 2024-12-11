import { Helmet } from 'react-helmet';
import './Veranstaltungen.css';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import PopularCard from '../../components/PopularCard/PopularCard';
import SpecialNewsCard from '../../components/SpecialNewsCard/SpecialNewsCard';
import Footer from '../../components/Footer/Footer';

const Veranstaltungen = () => {
    const [showAll, setShowAll] = useState(false);
    const [shuffledNews, setShuffledNews] = useState([]);

    /* fetch news and randomize news */
    const { data: news, isLoading: newsLoading, error: newsError } = useFetch("news");

    /* fetch veranstaltungen */
    const { data: events, isLoading: eventLoading, error: eventError } = useFetch("veranstaltungen");


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

    /* event filter & sort function */
    /* function to parse dates to filter and sort them */
    const parseCustomDate = (dateString) => {
        const datePattern = /(\d{2})\.(\d{2})\.(\d{4}), (\d{2})\.(\d{2})/;
        const match = dateString.match(datePattern);

        if (match) {
            const [, day, month, year, hour, minute] = match;
            const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:00`;

            return new Date(isoDateString);
        }

        /* return null if date string doesn't match expected format */
        return null;
    };

    /* function to filter and sort events */
    const filterAndSortEvents = (events) => {
        const now = new Date();

        return events
            .filter(event => {
                const eventDate = parseCustomDate(event?.date_time);
                return eventDate && eventDate > now;
            })
            .sort((a, b) => {
                const dateA = parseCustomDate(a?.date_time);
                const dateB = parseCustomDate(b?.date_time);
                return dateA - dateB;
            });
    };

    /* filter & sort dates  */
    const filteredAndSortedEvents = filterAndSortEvents(events);

    /* toggle function for showing less / more events */
    const handleShowMore = () => {
        showAll && window.scrollTo(0, 0);
        setShowAll(!showAll);
    };

    /* amount of initial data loaded and displayed */
    const displayedEvents = showAll ? filteredAndSortedEvents : filteredAndSortedEvents.slice(0, 3);

    /* loading message */
    const loadingMessage = newsLoading || eventLoading ? <div className='loader'></div> : null;

    /* error messages */
    const newsErrorMessage = (!newsLoading && newsError) ? <div className='error_display'><p>Oops! Something went wrong while fetching news data. Please try again later.</p></div> : null;
    const eventErrorMessage = (!eventLoading && eventError) ? <div className='error_display'><p>Oops! Something went wrong while fetching event data. Please try again later.</p></div> : null;

    /* log and view data */
    /*     console.log('raw news:', news);
        console.log('shuffled news:', shuffledNews);
        console.log('popular cards:', popularCardSelect);
        console.log('special cards:', popularCardSelect);
        console.log('recent special article:', recentSpecialNews);
        console.log('displayed event:', displayedEvents); */

    return (
        <main className='events'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Veranstaltungen</title>
                <meta name="description" content="Neues aus Aschaffenburg: Entdecken Sie hier bevorstehende Veranstaltungen in der Region. Erfahren Sie mehr über Konzerte, Festivals, Ausstellungen und andere kulturelle Ereignisse." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Veranstaltungen" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Entdecken Sie hier bevorstehende Veranstaltungen in der Region. Erfahren Sie mehr über Konzerte, Festivals, Ausstellungen und andere kulturelle Ereignisse." />
                <meta property="og:url" content={`https://platzhalterlink.de/veranstaltungen/`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Artikel" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Entdecken Sie hier bevorstehende Veranstaltungen in der Region. Erfahren Sie mehr über Konzerte, Festivals, Ausstellungen und andere kulturelle Ereignisse." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/veranstaltungen/`} />
            </Helmet>

            {loadingMessage}
            {newsErrorMessage}
            {eventErrorMessage}

            <section className='events_container'>
                <h2>Veranstaltungen</h2>
                {
                    displayedEvents.map(event => (
                        <div key={event?.id}>
                            <h3>{`${event?.title}`}</h3>
                            <div className='events_content'>
                                <div className='events_content_left'>
                                    <h4>{`${event?.date_time}`}</h4>
                                    <h4>{`${event?.type}`}</h4>
                                </div>
                                <div>
                                    <p>{`${event?.who}`}</p>
                                    <p>
                                        {`${event?.desc}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <div title={showAll ? 'Weniger anzeigen' : 'Mehr anzeigen'} className='notdienst_button_container'>
                    <button className='notdienst_button' onClick={handleShowMore}>
                        <span>{showAll ? 'Weniger' : 'Mehr'}</span>
                    </button>
                </div>
            </section>

            <section className='events_news_container'>
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

export default Veranstaltungen