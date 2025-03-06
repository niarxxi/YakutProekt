"use client"

import ImageGallery from "./ImageGallery";
import { importAll, processImages } from "./imageUtils";

const imageFiles = importAll(require.context("/public/images/HealthFacilities", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const HealthFacilities = () => {
  return <ImageGallery images={processedImages} />;
};

export default HealthFacilities;