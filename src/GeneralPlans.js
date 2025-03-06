"use client"

import ImageGallery from "./ImageGallery";
import { importAll, processImages } from "./imageUtils";

const imageFiles = importAll(require.context("/public/images/GeneralPlans", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const GeneralPlans = () => {
  return <ImageGallery images={processedImages} />;
};

export default GeneralPlans;