import { useEffect } from "react";

/* dynamically change favicons based on user color-scheme preference */
const useFaviconChanger = () => {
  useEffect(() => {
    /* define light-mode favicons */
    const lightFavicons = [
      { id: 'favicon-16-light', href: '/favicon-16x16-light.png' },
      { id: 'favicon-32-light', href: '/favicon-32x32-light.png' },
      { id: 'favicon-48-light', href: '/favicon-48x48-light.png' },
    ];

     /* define dark-mode favicons */
    const darkFavicons = [
      { id: 'favicon-16-dark', href: '/favicon-16x16-dark.png' },
      { id: 'favicon-32-dark', href: '/favicon-32x32-dark.png' },
      { id: 'favicon-48-dark', href: '/favicon-48x48-dark.png' },
    ];

    /* set favicons logic */
    const setFavicons = (favicons) => {
      favicons.forEach(({ id, href }) => {
        let link = document.getElementById(id);

        /* create link element if it doesn't exist */
        if (!link) {
          link = document.createElement('link');
          link.id = id; /* set link id */
          link.rel = 'icon'; /* set link rel */

          /* append created link element to document head */
          document.head.appendChild(link);
        }

        /* set link href to light/dark favicons href */
        link.href = href;
      });
    };

    /* create query to detect user color-scheme preference */
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    /* handle changes in the query */
    const handleChange = (e) => {

      /* if user prefers dark mode set dark favicons */
      if (e.matches) {
        setFavicons(darkFavicons);

      /* else set light favicons */
      } else {
        setFavicons(lightFavicons);
      }
    };

    /* add event listener for changes in the query */
    mediaQuery.addEventListener('change', handleChange);

    /* set initial favicons based on preference */
    handleChange(mediaQuery);

    /* cleanup event listener when component unmounts */
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
};

export default useFaviconChanger;