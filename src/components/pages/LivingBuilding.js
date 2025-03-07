"use client"

import ImageGallery from "../common/ImageGallery";
import { importAll, processImages } from "../../utils/imageUtils";

const imageFiles = importAll(require.context("/public/images/LivingBuilding", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const LivingBuilding = () => {
  return <ImageGallery images={processedImages} />;
};

export default LivingBuilding;