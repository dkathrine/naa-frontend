import { useState, useEffect } from 'react';

/* dynamic fetch hook with randomizer logic for variable endpoints */
const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [randomData, setRandomData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /* fetch logic */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/${endpoint}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data;
                try {
                    data = await response.json();
                } catch (error) {
                    console.error(error);
                    throw new Error('Invalid API Endpoint');
                }
                setData(data);

                /* randomizer logic */
                const random = Math.floor(Math.random() * data.length);
                setRandomData(data[random]);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
                /* log successful endpoint connection */
                console.log('endpoint fetched:', endpoint);
            }
        };
        fetchData();
    }, [endpoint]);
    return { data, randomData, isLoading, error };
};

export default useFetch;


/* old static fetch hook - not relevant */
// const FetchNews = () => {
//     const [news, setNews] = useState([]);
//     const [randomArticle, setRandomArticle] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//      /* fetch logic */
//     useEffect(() => {
//         const fetchNews = async () => {
//             try {
//                 const response = await fetch('/news.json');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 let data;
//                 try {
//                     data = await response.json();
//                 } catch (error) {
//                     console.error(error);
//                     throw new Error('Invalid JSON');
//                 }
//                 setNews(data);

//                 /* randomizer logic */
//                 const random = Math.floor(Math.random() * data.length);
//                 setRandomArticle(data[random]);
//             } catch (error) {
//                 console.error(error);
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchNews();
//     }, []);
//     return { news, randomArticle, isLoading, error };
// };

// export default FetchNews;