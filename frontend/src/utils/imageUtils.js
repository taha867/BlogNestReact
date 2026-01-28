/**
 * Gets full image URL from relative path or returns absolute URL as-is
 * returns Full image URL or null if no path provided
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${baseUrl}${cleanPath}`;
};
