"use client"

import ImageGallery from "./ImageGallery";
import { importAll, processImages } from "./imageUtils";

const imageFiles = importAll(require.context("/public/images/LivingBuilding", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const LivingBuilding = () => {
  return <ImageGallery images={processedImages} />;
};

export default LivingBuilding;