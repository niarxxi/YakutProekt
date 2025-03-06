"use client"

import ImageGallery from "./ImageGallery";
import { importAll, processImages } from "./imageUtils";

const imageFiles = importAll(require.context("/public/images/AgriculturalFacilities", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const AgriculturalFacilities = () => {
  return <ImageGallery images={processedImages} />;
};

export default AgriculturalFacilities;