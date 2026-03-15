export const getImageSrc = (image) => {
    if (!image) return 'https://via.placeholder.com/300';
    if (image.startsWith('http')) return image;
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${image}`;
};
