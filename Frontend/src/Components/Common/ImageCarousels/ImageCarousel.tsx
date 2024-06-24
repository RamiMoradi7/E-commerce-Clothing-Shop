import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageCarousel.css";

interface ImageCarouselProps {
  imageUrls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
  return (
    <div className="image-carousel-root">
      <Carousel
        showArrows={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={7000}
        stopOnHover={true}
        dynamicHeight={false}
      >
        {imageUrls.map((imageUrl, idx) => (
          <div key={idx}>
            <img className="images" src={imageUrl} alt={`Product ${idx + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
