"use client"

import ImageGallery from "./ImageGallery";
import { importAll, processImages } from "./imageUtils";

const imageFiles = importAll(require.context("/public/images/PublicBuildings", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const PublicBuildings = () => {
  return <ImageGallery images={processedImages} />;
};

export default PublicBuildings;