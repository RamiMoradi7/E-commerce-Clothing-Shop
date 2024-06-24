interface ProductImageGalleryProps {
  imageUrls: string[];
}

export default function ProductImageGallery({
  imageUrls,
}: ProductImageGalleryProps): JSX.Element {
  return (
    <>
      <div className=" border border4 border-gray-800 mx-auto mt-6 max-w-lg sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block max-h-full">
          <img
            src={imageUrls[0]}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-y-8">
          {imageUrls.slice(1).map((imageUrl, index) => (
            <div
              key={index}
              className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg max-h-96"
            >
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
