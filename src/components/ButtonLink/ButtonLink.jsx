import './ButtonLink.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonLink = ({ name, link, opac }) => {
    /* if opac props are true another css class will be applied setting the buttons opacity to 50%*/
    /* the link + the name that will be displayed on the button are provided by props */

    const [title, setTitle] = useState('');

    const navigate = useNavigate();
    /* declared useNavigate as navigate */

    useEffect(() => {
        const titleHandler = () => {
            /* break down the link */
            const parts = link.split('/').filter(Boolean);
            if (parts.length > 0) {
                /* take the first part */
                const location = parts[0];
                /* capitalize first letter */
                const capitalizedLocation = location.charAt(0).toUpperCase() + location.slice(1);
                /* set title */
                setTitle(`Hier geht es zum ${capitalizedLocation}`);
            }
        };

        titleHandler();
    }, [link]);

    return (
        <>
            <a title={`${title}`} className={opac ? 'button_link_opac' : 'button_link'} onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                navigate(`${link}`);
            }}>
                {`${name}`}
            </a>
        </>
    )
}

export default ButtonLink