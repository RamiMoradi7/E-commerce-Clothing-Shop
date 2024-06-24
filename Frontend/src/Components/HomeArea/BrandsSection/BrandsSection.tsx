import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandModel } from "../../../Models/BrandModel";
import { brandsService } from "../../../Services/BrandsService";
import { notify } from "../../../Utils/Notify";
export default function BrandsSection() {
  const [brands, setBrands] = useState<BrandModel[]>(null);
  const navigate = useNavigate();
  const navigateBrandId = _.debounce((brandId: string) => {
    navigate(`/products?brand=${brandId}`);
  }, 300);

  useEffect(() => {
    brandsService
      .getAll()
      .then((brands) => setBrands(brands))
      .catch((err: any) => notify.error(err));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center items-center md:justify-start">
        {brands?.map((brand) => (
          <div
            key={brand._id}
            onClick={() => navigateBrandId(brand._id)}
            className="mt-10 transform transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
          >
            <img
              key={brand._id}
              className="my-4 md:my-0 mx-2 md:mx-4 bg-transparent"
              src={brand.imageUrl}
              width={90}
              max-height={55}
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
