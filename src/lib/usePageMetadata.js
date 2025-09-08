import { useEffect } from 'react';

const DEFAULT_DESCRIPTION = "Posicionar a Avivamiento como un referente digital, reflejando su énfasis en la manifestación sobrenatural de Dios, la sanidad y la restauración.";

const usePageMetadata = ({ title, description, url }) => {
  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | Avivamiento` : 'Avivamiento: El Lugar de su Presencia';

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || DEFAULT_DESCRIPTION);

    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title ? `${title} | Avivamiento` : 'Avivamiento: El Lugar de su Presencia');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description || DEFAULT_DESCRIPTION);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', url || window.location.href);

    // Clean up function (optional, but good practice for single-page apps)
    return () => {
      // You might want to reset to default or remove specific tags if necessary
      // For simplicity, we'll leave them as they are for now, as they are usually overwritten
      // by subsequent calls or on page unload.
    };
  }, [title, description, url]);
};

export default usePageMetadata;
