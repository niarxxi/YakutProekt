"use client"

import ImageGallery from "./ImageGallery";
import { importAll, processImages } from "./imageUtils";

const imageFiles = importAll(require.context("/public/images/SportBuildings", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const SportBuildings = () => {
  return <ImageGallery images={processedImages} />;
};

export default SportBuildings;