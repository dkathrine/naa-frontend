import './NavBar.css';
import { /* useState, */ useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const NavBar = ({ active, handleMenuToggle }) => {
    /* 2 comments below are the state & function to handle open&close of burger menu onClick */
    /* const [active, setActive] = useState(false); */
    /*  const handleMenuToggle = () => {
        setActive(!active);
     }; */

    /* declared useNavigate as navigate */
    const navigate = useNavigate();

    useEffect(() => {
        active ?
            document.body.classList.add('menu-open') : document.body.classList.remove('menu-open')

    }, [active]);

    return (
        <>
            <nav className='nav_bar'>
                {/* split the navbar into left & right side */}
                <section className='nav_left'>
                    <a
                        title='Neues aus Aschaffenburg'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}>
                        <img src="/neues-aus-aschaffenburg_logo_schwarz.png" alt="Neues aus Aschaffenburg Logo" title='Neues aus Aschaffenburg Logo' />
                        <p>Neues aus Aschaffenburg</p>
                    </a>
                </section>

                {/* right side */}
                <section className='nav_right'>
                    <a
                        title='Aktuelles'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}>
                        Aktuelles
                    </a>

                    <a
                        title='Veranstaltungen'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/veranstaltungen');
                        }}>
                        Veranstaltungen
                    </a>

                    <a
                        title='Vereine'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/vereine');
                        }}>
                        Vereine
                    </a>

                    <a
                        title='Notdienste'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/notdienste');
                        }}>
                        Notdienste
                    </a>

                    <a
                        title='Politik'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/politik');
                        }}>
                        Politik
                    </a>

                    <a
                        title='Magazine'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/magazine');
                        }}>
                        Magazine
                    </a>
                </section>
            </nav>

            {/* burger menu - "icon" */}
            <section className={`burger_menu_button ${active ? 'active' : ''}`} onClick={handleMenuToggle}>
                <svg className={`ham hamRotate ham1 ${active ? 'active' : ''}`} viewBox="0 0 100 100" width="80" onClick={handleMenuToggle}>
                    <path
                        className="line top"
                        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                    <path
                        className="line middle"
                        d="m 30,50 h 40" />
                    <path
                        className="line bottom"
                        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
                </svg>
            </section>

            <div className='na_logo_mobile_container'>
                <img
                    className='na_logo'
                    src="/neues-aus-aschaffenburg_logo_schwarz.png"
                    alt="Neues aus Aschaffenburg Logo"
                    title='Neues aus Aschaffenburg Logo'
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                />
            </div>

            {/* burger menu - links */}
            <nav className={`burger_menu ${active ? 'active' : ''}`}>
                <ul>
                    <li>
                        <a
                            title='Aktuelles'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/');
                                handleMenuToggle();
                            }}>
                            Aktuelles
                        </a>
                    </li>
                    <li>
                        <a
                            title='Veranstaltungen'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/veranstaltungen');
                                handleMenuToggle();
                            }}>
                            Veranstaltungen
                        </a>
                    </li>
                    <li>
                        <a
                            title='Vereine'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/vereine');
                                handleMenuToggle();
                            }}>
                            Vereine
                        </a>
                    </li>
                    <li>
                        <a
                            title='Notdienste'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/notdienste');
                                handleMenuToggle();
                            }}>
                            Notdienste
                        </a>
                    </li>
                    <li>
                        <a
                            title='Politik'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/politik');
                                handleMenuToggle();
                            }}>
                            Politik
                        </a>
                    </li>
                    <li>
                        <a
                            title='Magazine'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/magazine');
                                handleMenuToggle();
                            }}>
                            Magazine
                        </a>
                    </li>
                </ul>
                <div className='na_logo_mobile_container'>
                    <img className='na_logo_bmenu' src="/neues-aus-aschaffenburg_logo_schwarz.png" alt="Neues aus Aschaffenburg Logo" title='Neues aus Aschaffenburg Logo' />
                </div>
            </nav>
        </>
    )
}

export default NavBar