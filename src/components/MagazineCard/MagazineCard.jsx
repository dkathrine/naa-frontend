import './MagazineCard.css';
import { useEffect, useState } from "react";

const MagazineCard = ({ title, date, pic, magazine_link, desc }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (pic.length > 0) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [pic]);

    const recentMagazineStyle = {
        backgroundImage: `url(${pic})`
    }

    // truncate title if it's too long
    const truncatedTitle = title.length > 30 ? title.substring(0, 33) + "..." : title;

    // truncate sum if it's too long
    const truncatedSum = desc.length > 150 ? desc.substring(0, 150) + "..." : desc;

    return (
        <div className='magazine'>
            <div className='magazine_title_container'>
                <h3>{truncatedTitle}</h3>
                <span><strong>{date}</strong></span>
            </div>
            <div className='magazine_container'>
                <a href={`${magazine_link}`} target='blank'>
                    <div className={`magazine_img fade-in ${loaded ? 'visible' : ''}`} style={recentMagazineStyle}>

                    </div>
                </a>
                <div className='magazine_description'>
                    {truncatedSum}
                </div>
            </div>
        </div>
    )
}

export default MagazineCard