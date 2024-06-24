import { Carousel } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface CarouselProps {
  imageUrls: string[];
}

export function ProductDetailsCarousel({ imageUrls }: CarouselProps) {
  const images = imageUrls?.map((url, i) => (
    <img
      key={i}
      src={url}
      alt={`${i}`}
      className="h-full w-full object-cover rounded-xl"
    />
  ));

  return (
    <Carousel
      className="relative rounded-xl overflow-hidden"
      placeholder={""}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute top-2 flex justify-between w-full px-4">
          <button
            className="focus:outline-none"
            onClick={() =>
              setActiveIndex((prev) => (prev === 0 ? length - 1 : prev - 1))
            }
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-2 w-2 cursor-pointer rounded-full border border-solid border-gray-700 ${
                  activeIndex === i ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <button
            className="focus:outline-none"
            onClick={() =>
              setActiveIndex((prev) => (prev === length - 1 ? 0 : prev + 1))
            }
          >
            <ArrowRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      )}
    >
      {images && images.length > 0 ? images : ""}
    </Carousel>
  );
}
