"use client"

import ImageGallery from "../common/ImageGallery";
import { importAll, processImages } from "../../utils/imageUtils";

const imageFiles = importAll(require.context("/public/images/HealthFacilities", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const HealthFacilities = () => {
  return <ImageGallery images={processedImages} />;
};

export default HealthFacilities;