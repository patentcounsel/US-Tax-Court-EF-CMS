import { useEffect } from 'react';

/**
 * Simple hook that allows you to embed a third-party JavaScript when a component references this hook.
 * Use this with caution; we do not want to embed third party scripts in the private application.
 *
 * @param {String} url URL to place inside of the src attribute of a script tag.
 */
export const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
