import React from "react";
import Carousel from "../common/Carousel";
import Resize from "../../utils/Resize";

const AllGallery = () => {
  const isPortrait = Resize();
  
  return (
  <div style={{ pointerEvents: isPortrait ? '' : 'none' }}>
    <Carousel direction="left"/>
    <Carousel direction="right"/>
  </div>
  );
}

export default AllGallery;