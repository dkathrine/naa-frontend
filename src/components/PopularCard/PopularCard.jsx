import './PopularCard.css';
import ButtonLink from '../ButtonLink/ButtonLink.jsx';
import { useEffect, useState } from 'react';

const PopularCard = ({ title, sum, pic, article_link, alt }) => {
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
        <div title={title} className='popular_card'>
            <div className={`popular_card_left fade-in ${loaded ? 'visible' : ''}`} style={cardStyle}>
                <span className="screenreader_only">{alt}</span>
                {/* image container */}
            </div>
            <div className='popular_card_right'>
                <div className='popular_pb'>
                    <h2 className="popular_card_title">{truncatedTitle}</h2>
                </div>
                <p>{truncatedSum}</p>
                <div className='button_div'>
                    <ButtonLink name="Artikel lesen" link={article_link} />
                </div>
            </div>
        </div>
    )
}

export default PopularCard