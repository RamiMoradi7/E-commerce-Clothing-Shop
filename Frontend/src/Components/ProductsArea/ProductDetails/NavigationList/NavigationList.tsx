import { NavLink } from "react-router-dom";
import { ProductModel } from "../../../../Models/ProductModel";

interface NavigationListProps {
  product: ProductModel;
}

export default function NavigationList({
  product,
}: NavigationListProps): JSX.Element {
  const { name, audience, category, subCategory, brand } = product;
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <div className="flex items-center">
              <NavLink
                to={`/products?audience=${audience?._id}`}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                {audience?.name}
              </NavLink>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <NavLink
                to={`/products?category=${category?._id}`}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                {category?.name}
              </NavLink>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <NavLink
                to={`/products?subCategory=${subCategory?._id}`}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                {subCategory?.name}
              </NavLink>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <NavLink
                to={`/products?brand=${brand?._id}`}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                <img width={35} src={brand.imageUrl} />
              </NavLink>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>

          <li className="text-sm">
            <NavLink
              to={`/products?name=${name}`}
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {name}
            </NavLink>
          </li>
        </ol>
      </nav>
    </>
  );
}
