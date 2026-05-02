import imageCompression from "browser-image-compression";

export async function compressImage(file) {
  const options = {
    maxSizeMB: 0.25,          // maksimal 250KB per foto
    maxWidthOrHeight: 1280,   // maksimal 1280px
    useWebWorker: true,
    fileType: "image/webp",   // convert ke webp otomatis
  };

  const compressed = await imageCompression(file, options);
  return compressed;
}