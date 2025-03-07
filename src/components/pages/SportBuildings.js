"use client"

import ImageGallery from "../common/ImageGallery";
import { importAll, processImages } from "../../utils/imageUtils";

const imageFiles = importAll(require.context("/public/images/SportBuildings", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const SportBuildings = () => {
  return <ImageGallery images={processedImages} />;
};

export default SportBuildings;