import imageMetadata from "./imageMetadata";

export const processImages = (imageFiles) => {
  return imageFiles.map((filePath) => {
    const fileName = filePath
      .split("/")
      .pop()
      .replace(/\.(png|jpe?g|svg)$/, "");

    const key = fileName.split(".")[0];
    
    const metadata = imageMetadata[key] || {
      title: `Изображение ${key}`,
      description: `Описание для изображения ${key} отсутствует`,
    };

    return {
      src: filePath,
      title: metadata.title,
      description: metadata.description,
    };
  });
};

export const importAll = (r) => r.keys().map(r);