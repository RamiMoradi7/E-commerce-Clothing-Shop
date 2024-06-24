import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import { useCurrentUser } from "../../../Utils/CurrentUser";
import { ProductDetailsCarousel } from "../../Common/ImageCarousels/ProductDetailsCarousel";
import "./ProductCard.css";
import EditButton from "../../Common/Buttons/EditButton/EditButton";
import DeleteButton from "../../Common/Buttons/DeleteButton/DeleteButton";

interface ProductCardProps {
  product: ProductModel;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { isAdmin } = useCurrentUser();
  const navigate = useNavigate();
  const toggleHover = () => setHovered(!hovered);

  const extractStockValues = (key: string) => {
    if (key === "color") {
      return product?.stock
        .map((s) => s.color.hex)
        .filter((color, index, self) => self.indexOf(color) === index);
    } else {
      return product?.stock
        .map((s) => s.size.name?.toUpperCase() + " ")
        .filter((size, index, self) => self.indexOf(size) === index);
    }
  };
  return (
    <div
      id="product-card"
      className={hovered ? "animate" : ""}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div id="product-front">
        <div className="image_overlay" />
        <ProductDetailsCarousel imageUrls={product?.imageUrls} />

        <div id="view_details">
          {isAdmin && (
            <div className="flex justify-between items-center mt-2 w-full">
              <DeleteButton
                _id={product?._id}
                name={product?.name}
                fnQuery={productsService.deleteProduct}
              />
              <EditButton _id={product._id} identifier="products" />
            </div>
          )}
          {!isAdmin && (
            <>
              <div
                className="text-gray-600"
                onClick={() => navigate(`/products/details/${product?._id}`)}
              >
                Details
              </div>
            </>
          )}
        </div>
        <div className="stats">
          <div className="stats-container">
            <div className="product_price">
              {+product.price}₪
              <img
                width={35}
                height={35}
                src={product?.brand.imageUrl}
                alt={product?.name}
              />
            </div>
            <span className="font-thin text-lg text-black">
              {product.name}
              <p className="text-xs text-black">
                {product.audience?.name} {product.category?.name}
                <br />
                {product.subCategory?.name}
              </p>
            </span>
            <div className="product-options">
              <strong>Available Sizes</strong>
              <div className="sizes-container">
                {extractStockValues("size")}
              </div>
              <strong>Available Colors</strong>
              <div className="colors">
                {extractStockValues("color").map((s) => (
                  <div
                    key={s}
                    className={`c-${s.toLowerCase()}`}
                    style={{ backgroundColor: s }}
                  >
                    <span />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
