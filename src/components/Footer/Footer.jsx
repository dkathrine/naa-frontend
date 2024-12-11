import './Footer.css';
import { useNavigate } from 'react-router-dom';
import ButtonLink from '../ButtonLink/ButtonLink';

const Footer = ({ ads }) => {
    const navigate = useNavigate();
    return (
        <div className='footer'>
            <div className={ads ? 'footer_ads' : 'footer_ads_none'}>
                <div className='footer_ads_headline'>
                    <h2>Sie möchten Ihren Artikel veröffentlichen?</h2>
                </div>
                <div className='footer_ads_button_container'>
                    <ButtonLink name='Hier entlang' link='/upload' opac={true} />
                </div>
            </div>
            <div className='footer_top'>
                <div className='footer_left'>
                    <a
                        title='Neues aus Aschaffenburg'
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo(0, 0);
                            navigate('/');
                        }}>
                        <img src="/neues-aus-aschaffenburg_logo_weiss.png" alt="NA_logo" />
                        <p>Neues aus Aschaffenburg</p>
                    </a>
                </div>
                <div className='footer_right'>
                    <div className='fr_pages'>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/');
                            }}>
                            Aktuelles
                        </a>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/veranstaltungen');
                            }}>
                            Veranstaltungen
                        </a>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/vereine');
                            }}>
                            Vereine
                        </a>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/notdienste');
                            }}>
                            Notdienste
                        </a>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/politik');
                            }}>
                            Politik
                        </a>

                    </div>
                    <div className='fr_rechtliches'>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/upload');
                            }}>
                            Artikel veröffentlichen!
                        </a>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/kontakt');
                            }}>
                            Kontakt
                        </a>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/impressum');
                            }}>
                            Impressum
                        </a>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo(0, 0);
                                navigate('/datenschutzerklärung');
                            }}>
                            Datenschutzerklärung
                        </a>
                    </div>
                </div>
            </div>
            <div className='footer_bottom'>
                <p>Copyright © 2023 Neues aus Aschaffenburg</p>
            </div>
        </div>
    )
}

export default Footer