import './SpecialNewsCard.css';
import ButtonLink from '../ButtonLink/ButtonLink';
import { useEffect, useState } from 'react';

const SpecialNewsCard = ({ title, sum, pic, article_link, alt }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (pic.length > 0) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [pic]);

    // truncate title if it's too long
    const truncatedTitle = title?.length > 50 ? title.substring(0, 50) + "..." : title;

    // truncate sum if it's too long
    const truncatedSum = sum?.length > 150 ? sum?.substring(0, 150) + "..." : sum;

    const cardStyle = {
        backgroundImage: `url(${pic})`
    }

    return (
        <div title={title} className='special_news_card'>
            <div className={`special_news_card_left fade-in ${loaded ? 'visible' : ''}`} style={cardStyle}>
                <span className="screenreader_only">{alt}</span>
                {/* image container */}
            </div>
            <div className='special_news_card_right'>
                <h3>Sondermeldung</h3>
                <h2 className="special_news_card_title">{truncatedTitle}</h2>
                <div className='ellipsis'>
                    <p>{truncatedSum}</p>
                </div>
                <div className='button_div' title='abc'>
                    <ButtonLink name="Artikel lesen" link={article_link} />
                </div>
            </div>
        </div>
    )
}

export default SpecialNewsCard