import { Helmet } from 'react-helmet';
import './Magazine.css';
import useFetch from '../../hooks/useFetch';
import MagazineCard from '../../components/MagazineCard/MagazineCard';
import SpecialNewsCard from '../../components/SpecialNewsCard/SpecialNewsCard';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

const Magazine = () => {
    const [showAll, setShowAll] = useState(false);
    const [loaded, setLoaded] = useState(false);

    /* fetch magazines */
    const { data: magazine, isLoading: magazineLoading, error: magazineError } = useFetch("magazine");
    /* fetch news */
    const { data: news, isLoading: newsLoading, error: newsError } = useFetch("news");

    /* filter news for articles with specific category */
    const specialNews = news?.filter(article => article?.category === 'Sondermeldung');

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

    /* find most recent "Magazine" */
    const recentMagazine = magazine?.length > 0 ? magazine?.reduce((recent, magazine) => {
        const recentDate = new Date(recent?.date_time);
        const magazineDate = new Date(magazine?.date_time);

        /* error catch invalid date_time */
        if (recentDate?.toString() === 'Invalid Date' || magazineDate?.toString() === 'Invalid Date') {
            throw new Error('Invalid date_time' + `${recentDate, magazineDate}`);
        }

        return magazineDate > recentDate ? magazine : recent;
    }, magazine[0]) : null;

    /* create a new array excluding the most recent magazine */
    const magazinesWithoutRecent = magazine?.filter(mag => mag !== recentMagazine);

    /* sort magazines by date_time in descending order (newest first) */
    const sortedMagazines = magazinesWithoutRecent?.sort((a, b) => {
        const dateA = new Date(a.date_time);
        const dateB = new Date(b.date_time);
        return dateB - dateA;
    });

    /* toggle function for showing less / more events */
    const handleShowMore = () => {
        showAll && window.scrollTo(0, 0);
        setShowAll(!showAll);
    };

    /* amount of initial data loaded and displayed */
    const displayedMagazines = showAll ? sortedMagazines : sortedMagazines.slice(0, 3);

    useEffect(() => {
        if (recentMagazine?.image_url.length > 0) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [recentMagazine?.image_url]);

    /* loading message */
    const loadingMessage = newsLoading || magazineLoading ? <div className='loader'></div> : null;

    /* error message */
    const errorMessage = !newsLoading && newsError || !magazineLoading && magazineError ? <div className='error_display'><p>Oops! Something went wrong while fetching news data. Please try again later.</p></div> : null;

    const recentMagazineStyle = {
        backgroundImage: `url(${recentMagazine?.image_url})`
    }

    // truncate summary if it's too long
    const truncatedSum = recentMagazine?.content.length > 1450 ? recentMagazine?.content.substring(0, 1550) + "..." : recentMagazine?.content;

    return (
        <main>
            <Helmet>
                <title>Neues aus Aschaffenburg - Politik</title>
                <meta name="description" content="Neues aus Aschaffenburg: Entdecken Sie hier die aktuellsten Sondermeldungen und Highlights aus der Welt der Magazine." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Magazine" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Entdecken Sie hier die aktuellsten Sondermeldungen und Highlights aus der Welt der Magazine." />
                <meta property="og:url" content={`https://platzhalterlink.de/magazine/`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Politik" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Entdecken Sie hier die aktuellsten Sondermeldungen und Highlights aus der Welt der Magazine." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/artikel/magazine/`} />
            </Helmet>

            {loadingMessage}
            {errorMessage}

            <section className='magazine_content'>
                <h2 id='magazine_headline'>Magazine</h2>
                <section className='magazine_container'>
                    {/* most recent magazine */}
                    <div className='recent_magazine'>
                        <div className='recent_magazine_title_container'>
                            <h3>{recentMagazine?.title}</h3>
                            <span><strong>{recentMagazine?.date_time}</strong> <i>neu</i></span>
                        </div>
                        <div className='recent_magazine_container'>
                            <a href={`${recentMagazine?.magazine_url}`} target='blank'>
                                <div className={`recent_magazine_img ${loaded ? 'visible' : ''}`} style={recentMagazineStyle}>

                                </div>
                            </a>
                            <div className='recent_magazine_description'>
                                {truncatedSum}
                            </div>
                        </div>
                    </div>

                    {/* other magazine's displayed through a loop */}
                    <div className='magazine_loop'>
                        {displayedMagazines?.map((magazine, index) => (
                            <MagazineCard
                                key={index}
                                title={magazine?.title || 'Title not available'}
                                date={magazine?.date_time || 'Date not available'}
                                pic={magazine?.image_url || './oops_no_image.jpg'}
                                magazine_link={magazine?.magazine_url || '/'}
                                desc={magazine?.summary || 'Description not available'}
                            />
                        ))}
                    </div>

                    <div title={showAll ? 'Weniger anzeigen' : 'Mehr anzeigen'} className='notdienst_button_container'>
                        <button className='notdienst_button' onClick={handleShowMore}>
                            <span>{showAll ? 'Weniger' : 'Mehr'}</span>
                        </button>
                    </div>
                </section>

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
        </main >
    )
}

export default Magazine