"use client"

import ImageGallery from "./ImageGallery";
import { importAll, processImages } from "./imageUtils";

const imageFiles = importAll(require.context("/public/images/SchoolInstitutions", false, /\.(png|jpe?g|svg)$/));
const processedImages = processImages(imageFiles);

const SchoolInstitutions = () => {
  return <ImageGallery images={processedImages} />;
};

export default SchoolInstitutions;