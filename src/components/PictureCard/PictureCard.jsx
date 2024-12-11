import './PictureCard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PictureCard = ({ title, pic, article_link, alt }) => {
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (pic.length > 0) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [pic]);

    // truncate title if it's too long
    const truncatedTitle = title?.length > 50 ? title?.substring(0, 50) + "..." : title;

    const cardStyle = {
        backgroundImage: `url(${pic})`
    }

    return (
        <div title={`Hier gehts zum Artikel ${title}`} className='picture_card' onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            navigate(article_link);
        }}>
            <div className={`picture_card_pic fade-in ${loaded ? 'visible' : ''}`} style={cardStyle}>
                <span className="screenreader_only">{alt}</span>
                <p className="picture_card_title">{truncatedTitle}</p>
            </div>
        </div>
    )
}

export default PictureCard