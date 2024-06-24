import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../Redux/AppState";
import { ProductsState } from "../../Redux/ProductsSlice";
import { useTitle } from "../../hooks/useTitle";
import useUserLocation from "../../hooks/useUserLocation";
import Loader from "../Common/Loader/Loader";
import NoResults from "../ProductsArea/NoResults/NoResults";
import Pagination from "../ProductsArea/Pagination/Pagination";
import ProductCard from "../ProductsArea/ProductCard/ProductCard";
import FilterMenu from "../ProductsArea/SidebarFilter/FilterMenu/FilterMenu";
import SidebarFilter from "../ProductsArea/SidebarFilter/SidebarFilter/SidebarFilter";
import ToggleMenuButton from "../ProductsArea/ToggleMenuButton/ToggleMenuButton";

function ProductList(): JSX.Element {
  useTitle("Products");
  useUserLocation();
  const [isFilterMenuHidden, setIsFilterMenuHidden] = useState(false);
  const {
    loading: isLoading,
    result: { products, currentPage, total, totalPages },
  } = useSelector<AppState, ProductsState>((appState) => appState.result);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-end items-center px-4 rounded-lg">
        <SidebarFilter isFilterMenuHidden={isFilterMenuHidden} />
      </div>
      <div className="flex justify-start ml-12 px-4 h-full">
        <ToggleMenuButton setIsFilterMenuHidden={setIsFilterMenuHidden} />
      </div>
      <div className="flex">
        {!isFilterMenuHidden && (
          <aside
            className={`${
              isFilterMenuHidden ? "hidden" : "h-screen sticky left-12"
            }`}
          >
            <div className="hidden md:block lg:block">
              <FilterMenu />
            </div>
          </aside>
        )}
        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex justify-between items-start">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
            {products.length > 0 ? (
              products.map((p) => <ProductCard key={p._id} product={p} />)
            ) : (
              <NoResults />
            )}
          </div>
        </main>
      </div>
      <Pagination
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
      />
    </>
  );
}

export default ProductList;
