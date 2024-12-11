import { useEffect, useState } from 'react'

const EnvDisplay = () => {

    /* setting useStates to iniate new Date() & tempreture */
    const [dateTime, setDateTime] = useState(new Date());
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        /* updating Date & Time every minute */
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 60000)

        /* fetching weather data from Open Weather API */
        const fetchTemperature = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=49.9739&lon=9.1492&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);
                const data = await response.json();
                setTemperature(data?.main?.temp?.toFixed(1));
            } catch (err) {
                console.error(err);
            }
        }

        fetchTemperature();

        return () => clearInterval(timer);
    }, [])

    return (
        <p className='environmental_display'>
            {dateTime.toLocaleDateString()} &nbsp;

            {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &nbsp;

            {temperature !== null ? `${temperature} °C` : 'Laden...'}
        </p>
    )
}

export default EnvDisplay