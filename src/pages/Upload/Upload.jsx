import { Helmet } from 'react-helmet';
import './Upload.css';
import Footer from '../../components/Footer/Footer';
import { useState, useRef } from 'react';

const Upload = () => {
    /* form field state object */
    const [formFields, setFormFields] = useState({
        author: '',
        title: '',
        imgSrc: '',
        image: null,
        category: '',
        sum: '',
        desc: ''
    });

    /* error message state object */
    const [errors, setErrors] = useState({
        authorError: '',
        titleError: '',
        imgSrcError: '',
        imageError: '',
        categoryError: '',
        sumError: '',
        descError: ''
    });

    /* form submission state */
    const [formSubmitted, setFormSubmitted] = useState(false);

    /* set initial reference for file input to null */
    const fileInputRef = useRef(null);

    /* form reset handler */
    const handleFormReset = () => {
        setFormFields({
            author: '',
            title: '',
            imgSrc: '',
            image: null,
            category: '',
            sum: '',
            desc: '',
        });

        /* reset file input value */
        fileInputRef.current.value = null;
    };

    /* input change handler */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prevFields => ({ ...prevFields, [name]: value }));
    };

    /* input change handler for image file */
    const handleImageChange = (e) => {
        setFormFields(prevFields => ({ ...prevFields, image: e.target.files[0] }));
    };

    /* form submit handler */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* create empty errors object */
        let errorMsgs = {};

        /* validate author field */
        if (!formFields.author) {
            errorMsgs = {...errorMsgs, authorError: 'Autor fehlt!'};
        } else if (formFields.author.trim().length < 2) {
            errorMsgs = {...errorMsgs, authorError: 'Mindestens 2 Zeichen!'}; 
        } else if (formFields.author.trim().length > 64) {
            errorMsgs = {...errorMsgs, authorError: 'Maximal 64 Zeichen!'}; 
        };

        /* validate title field */
        if (!formFields.title) {
            errorMsgs = {...errorMsgs, titleError: 'Titel fehlt!'};
        } else if (formFields.title.trim().length < 10) {
            errorMsgs = {...errorMsgs, titleError: 'Mindestens 10 Zeichen!'}; 
        } else if (formFields.title.trim().length > 100) {
            errorMsgs = {...errorMsgs, titleError: 'Maximal 100 Zeichen!'}; 
        };

        /* validate imgSrc field */
        if (!formFields.imgSrc) {
            errorMsgs = {...errorMsgs, imgSrcError: 'Bildquelle fehlt!'};
        } else if (formFields.imgSrc.trim().length < 10) {
            errorMsgs = {...errorMsgs, imgSrcError: 'Mindestens 10 Zeichen!'}; 
        } else if (formFields.imgSrc.trim().length > 64) {
            errorMsgs = {...errorMsgs, imgSrcError: 'Maximal 64 Zeichen!'};
        };

        /* validate image file field */
        if (!formFields.image) {
            errorMsgs = {...errorMsgs, imageError: 'Bild hochladen!'};
        } else {
            const fileType = formFields.image.type;
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/webp'];
            const maxSize = 2.5 * 1024 * 1024; /* max: 2.5 MB */
            /* check for valid file type and size */
            if (!validTypes.includes(fileType)) {
                errorMsgs = {...errorMsgs, imageError: 'Erlaubte Formate: .jpg, .jpeg, .png, .bmp, .webp '};

            } else if (formFields.image.size > maxSize) {
                errorMsgs = {...errorMsgs, imageError: 'Maximale Dateigröße: 2.5 MB'};
            };
        };

        /* validate category field */
        if (!formFields.category) {
            errorMsgs = {...errorMsgs, categoryError: 'Kategorie auswählen!'};
        };

        /* validate sum field */
        if (!formFields.sum) {
            errorMsgs = {...errorMsgs, sumError: 'Inhalt fehlt!'};
        } else if (formFields.sum.trim().length < 100) {
            errorMsgs = {...errorMsgs, sumError: 'Mindestens 100 Zeichen!'};
        } else if (formFields.sum.trim().length > 500) {
            errorMsgs = {...errorMsgs, sumError: 'Maximal 500 Zeichen!'};
        };

        /* validate desc field */
        if (!formFields.desc) {
            errorMsgs = {...errorMsgs, descError: 'Inhalt fehlt!'};
        } else if (formFields.desc.trim().length < 1000) {
            errorMsgs = {...errorMsgs, descError: 'Mindestens 1000 Zeichen!'};
        } else if (formFields.desc.trim().length > 20000) {
            errorMsgs = {...errorMsgs, descError: 'Maximal 20000 Zeichen!'};
        };

        /* set errors object to state and return if errors exist */
        if (Object.keys(errorMsgs).length > 0) {
            setErrors(errorMsgs);
            return;
        };

        /* get current datetime */
        const now = new Date();
        const dateTime = now.toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZoneName: 'short'
        });

        /* create new FormData object constant and append form fields */
        const formData = new FormData();
        Object.entries(formFields).forEach(([key, value]) => {
            if (value !== undefined && value !== '') { 
                formData.append(key, value);
            }
        });
        formData.append('date_time', dateTime);

        /* log formData */
        for (let [key, value] of formData.entries()) {
            if (key === 'image_url') {
            console.log(`${key}:`, value.name);
            } else {
            console.log(`${key}:`, value);
            };
        };

        /* send formData to endpoint */
        try {
            const response = await fetch('/api/send-article', { /* replace '/api/send-article' with real API endpoint */
                method: 'POST',
                /* due to the file upload, manually setting a header becomes redundant, because the web browser will automatically set it to 'multipart/form-data */
            /*  headers: {
                    'Content-Type': 'application/json',
                }, */
                /* therefore also no need for JSON.stringify() as formData is not being converted to JSON */
                body: formData /* JSON.stringify(Object.fromEntries(formData)), */
            });
            /* throw error if status is not ok (200-299) */
            if (!response.ok) {
                throw new Error(`Status: ${response.status}, ${response.statusText}`);
            }

            /* parse response data as JSON */
            const data = await response.json().catch(error => {
                /* log errors that occur while parsing*/
                console.error(`Error: ${error.message}`);
            });

            /* log parsed data */
            console.log(data);

        } catch (error) {
            /* log status if response error */
            if (error.response) {
                console.error(`Server responded with: ${error.response.status}`);
              /* log error message if no response */  
            } else {
                console.error(`Error: ${error.message}`);
            }
        } finally {
            /* set formSubmitted state to true */
            console.log('setting formSubmitted to true...');
            setFormSubmitted(true);
            console.log('formSubmitted set to true.');
            /* reset form fields */
            handleFormReset();
            /* clear errors state */
            setErrors({});
        }
    };

    return (
        <main className='upload'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Upload</title>
                <meta name="description" content="Neues aus Aschaffenburg: Laden Sie hier gerne eigene Artikel hoch. Teilen Sie Ihre Nachrichten, Meinungen und Geschichten mit der Welt." />

                {/* open graph meta tags */}
                <meta property="og:title" content="Neues aus Aschaffenburg - Upload" />
                <meta property="og:description" content="Neues aus Aschaffenburg: Laden Sie hier gerne eigene Artikel hoch. Teilen Sie Ihre Nachrichten, Meinungen und Geschichten mit der Welt." />
                <meta property="og:url" content={`https://platzhalterlink.de/upload/`} />

                {/* twitter meta tags */}
                <meta name="twitter:title" content="Neues aus Aschaffenburg - Upload" />
                <meta name="twitter:description" content="Neues aus Aschaffenburg: Laden Sie hier gerne eigene Artikel hoch. Teilen Sie Ihre Nachrichten, Meinungen und Geschichten mit der Welt." />
                <meta name="twitter:url" content={`https://platzhalterlink.de/artikel/upload/`} />
            </Helmet>

            <section className='upload_form_container'>
                <div className="kontakt_form">
                    <form onSubmit={handleSubmit} noValidate>
                        <h4>Stellen sie Ihren Artikel online!</h4>
                        <span>{errors.authorError}</span>
                        <input type="text" name="author" value={formFields.author} onChange={handleInputChange} placeholder="Autor . . ." className="input_field" />

                        <span>{errors.titleError}</span>
                        <input type="text" name="title" value={formFields.title} onChange={handleInputChange} placeholder="Titel . . ." className="input_field" />

                        <span>{errors.imgSrcError}</span>
                        <input type="text" name="imgSrc" value={formFields.imgSrc} onChange={handleInputChange} placeholder="Bildquelle . . ." className="input_field" />

                        <span>{errors.imageError}</span>
                        <input type="file" name="image" ref={fileInputRef} onChange={handleImageChange} className="input_field" style={{ cursor: "pointer" }} />

                        <span>{errors.categoryError}</span>
                        <select name="category" value={formFields.category} onFocus={(e) => { if (!e.target.value) e.target.options[0].hidden = true; }} onChange={handleInputChange} style={{ cursor: "pointer" }}>
                            <option value="" disabled>Kategorien . . .</option>
                            <option value="Sondermeldung">Sondermeldung</option>
                            <option value="Politik">Politik</option>
                            <option value="Wirtschaft">Wirtschaft</option>
                            <option value="Technologie">Technologie</option>
                            <option value="Wissenschaft">Wissenschaft</option>
                            <option value="Kultur">Kultur</option>
                            <option value="Sport">Sport</option>
                            <option value="Gesellschaft">Gesellschaft</option>
                            <option value="Reise">Reise</option>
                            <option value="Meinungen">Meinungen</option>
                            <option value="Lokales">Lokales</option>
                            <option value="Sonstiges">Sonstiges</option>
                        </select>

                        <p className='kontakt_p'>Ihre Zusammenfassung:</p>
                        <textarea name="sum" value={formFields.sum} onChange={handleInputChange} placeholder="Beschreiben Sie hier kurz den Inhalt Ihres Artikels ..." className="sum_field message_field" />
                        <span>{errors.sumError}</span>

                        <p className='kontakt_p'>Ihr Artikel:</p>
                        <textarea name="desc" value={formFields.desc} onChange={handleInputChange} placeholder="Schreiben Sie hier Ihren ausführlichen Artikel ..." className="desc_field message_field" />
                        <span>{errors.descError}</span>

                        <button type="submit" className="submit_button">{formSubmitted? 'Versendet!' : 'Senden'}</button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default Upload