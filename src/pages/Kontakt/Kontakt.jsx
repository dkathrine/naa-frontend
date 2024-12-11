import { Helmet } from 'react-helmet';
import './Kontakt.css';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';

const Kontakt = () => {
    /* form field state object */
    const [formFields, setFormFields] = useState({
        title: '',
        customTitle: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    });

    /* error message state object */
    const [errors, setErrors] = useState({
        titleError: '',
        customTitleError: '',
        firstNameError: '',
        lastNameError: '',
        phoneError: '',
        emailError: '',
        messageError: ''
    });

    /* form submission state */
    const [formSubmitted, setFormSubmitted] = useState(false);

    /* form reset handler */
    const handleFormReset = () => {
        setFormFields({
            title: '',
            customTitle: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            message: '',
        });
    };

    /* input change handler */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prevFields => ({ ...prevFields, [name]: value }));
    };

    /* handler function for form input fields */
    const handleSubmit = async (e) => {
        e.preventDefault();
        /* create empty errors object */
        let errorMsgs = {};
        
        /* validate firstName field */
        if (!formFields.firstName) {
            errorMsgs = {...errorMsgs, firstNameError: 'Vorname fehlt!'};
        } else if (!/^[\p{L}\p{M}]{1,64}(?:([-]\s*[\p{L}\p{M}]+|\s[\p{L}\p{M}]+)*)$/gu.test(formFields.firstName.trim())) {
            errorMsgs = {...errorMsgs, firstNameError: 'Kein gültiger Vorname!'};
        }

        /* validate lastName field */
        if (!formFields.lastName) {
            errorMsgs = {...errorMsgs, lastNameError: 'Nachname fehlt!'};
        } else if (!/^[\p{L}\p{M}]{1,64}(?:([-]\s*[\p{L}\p{M}]+|\s[\p{L}\p{M}]+)*)$/gu.test(formFields.lastName.trim())) {
            errorMsgs = {...errorMsgs, lastNameError: 'Kein gültiger Nachname!'};
        }

        /* validate phone field */
        if (formFields.phone && !/^\d{10,20}$/.test(formFields.phone)) {
            errorMsgs = {...errorMsgs, phoneError: 'Keine gültige Telefonnummer!'};
        };

        /* validate email field */
        if (!formFields.email) {
            errorMsgs = {...errorMsgs, emailError: 'E-Mail Adresse fehlt!'};
        } else if (formFields.email.trim().length < 6) {
            errorMsgs = {...errorMsgs, emailError: 'Mindestens 6 Zeichen!'};
        } else if (formFields.email.trim().length > 100) {
            errorMsgs = {...errorMsgs, emailError: 'Maximal 100 Zeichen!'};
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,63}$/.test(formFields.email.trim())) {
            errorMsgs = {...errorMsgs, emailError: 'Keine gültige E-Mail Adresse!'};
        }

        /* validate message field */
        if (!formFields.message) {
            errorMsgs = {...errorMsgs, messageError: 'Inhalt fehlt!'};
        } else if (formFields.message.trim().length < 30) {
                errorMsgs = {...errorMsgs, messageError: 'Mindestens 30 Zeichen!'};
        } else if (formFields.message.trim().length > 2000) {
            errorMsgs = {...errorMsgs, messageError: 'Maximal 2000 Zeichen!'};
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
                /* handle customTitle field */
                if (key === 'title') {
                    if (value !== 'Andere' && value !== '') {
                        formData.append('title', value);
                    } else if (formFields.customTitle) {
                        formData.append('customTitle', formFields.customTitle);
                    };
                } else if (key !== 'customTitle') {
                    formData.append(key, value);
                };
            };
        });
        formData.append('dateTime', dateTime);

        /* log formData */
        for (let [key, value] of formData.entries()) {
            if (key === 'image_url') {
            console.log(`${key}:`, value.name);
            } else {
            console.log(`${key}:`, value);
            };
        };

        /* send formData to server for further use */
        try {
            const response = await fetch('/api/send-email', { /* replace '/api/send-email' with a real API endpoint */
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            /* throw error if status is not ok (200-299) */
            if (!response.ok) {
                throw new Error(`Status: ${response.status}, ${response.statusText}`);
            };

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
            };
        } finally {
            /* set formSubmitted state to true */
            console.log('setting formSubmitted to true...');
            setFormSubmitted(true);
            console.log('formSubmitted set to true.');
             /* reset form fields */
            handleFormReset();
            /* clear errors state */
            setErrors({});
        };
    };

    return (
        <main className='kontakt'>
            <Helmet>
                <title>Neues aus Aschaffenburg - Kontakt</title>
                <meta name="description" content="Neues aus Aschaffenburg: Kontaktieren Sie uns für Ihren Artikel, Anfragen, Support, Feedback oder anderen Anliegen. Wir sind gerne für Sie da." />
            </Helmet>

            <section className="kontakt_container">
                <h2>Kontakt</h2>
                <div className='kontakt_main'>
                    <div className='kontakt_left'>
                        <h3>Sie möchten Ihren Artikel veröffentlichen <br /> oder haben Fragen?</h3>
                    </div>

                    <div className="kontakt_form">
                        <form onSubmit={handleSubmit} noValidate>
                            <h4>Senden Sie uns eine Nachricht</h4>
                            <span>{errors.titleError}</span>
                            <select name="title" value={formFields.title} onFocus={(e) => { if (!e.target.value) e.target.options[0].hidden = true; }} onChange={handleInputChange} style={{ cursor: "pointer" }}>
                                <option value="" disabled>Anrede . . .</option>
                                <option value="Herr">Herr</option>
                                <option value="Frau">Frau</option>
                                <option value="Divers">Divers</option>
                                <option value="Andere">Andere</option>
                            </select>
                            
                            {formFields.title === 'Andere' && (
                                <>
                                    <span>{errors.customTitleError}</span>
                                    <input 
                                        type="text" 
                                        name="customTitle" 
                                        placeholder="Hier gewünschte Anrede eingeben . . ." 
                                        value={formFields.customTitle} 
                                        onChange={handleInputChange} 
                                    />
                                </>
                            )}

                            <span>{errors.firstNameError}</span>
                            <input name="firstName" type="text" placeholder="Vorname* . . ." className="input_field" value={formFields.firstName} onChange={handleInputChange} />

                            <span>{errors.lastNameError}</span>
                            <input name="lastName" type="text" placeholder="Nachname* . . ." className="input_field" value={formFields.lastName} onChange={handleInputChange} />

                            <span>{errors.phoneError}</span>
                            <input name="phone" type="text" placeholder="Telefon . . ." className="input_field" value={formFields.phone} onChange={handleInputChange} />

                            <span>{errors.emailError}</span>
                            <input name="email" type="email" placeholder="E-Mail* . . ." className="input_field" value={formFields.email} onChange={handleInputChange} />

                            <p className='kontakt_p'>Ihre Nachricht:</p>
                            <span>{errors.messageError}</span>
                            <textarea name="message" placeholder="..." className="message_field" value={formFields.message} onChange={handleInputChange}></textarea>

                            <button type="submit" className="submit_button">{formSubmitted? 'Versendet!' : 'Senden'}</button>
                        </form>
                    </div>
                </div>
            </section>
            
            <Footer />
        </main>
    )
}

export default Kontakt