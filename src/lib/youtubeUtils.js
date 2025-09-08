/**
 * Generates a YouTube embed URL from a video ID.
 * @param {string} videoId The YouTube video ID.
 * @returns {string} The embeddable YouTube URL.
 */
export const createYouTubeEmbedUrl = (videoId) => {
  if (!videoId || typeof videoId !== 'string' || videoId.length !== 11) {
      console.warn('Invalid YouTube video ID provided:', videoId);
      return '';
  }
  return `https://www.youtube.com/embed/${videoId}`;
};