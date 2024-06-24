import { useEffect, useState } from "react";
import { notify } from "../../../../Utils/Notify";
import { productsService } from "../../../../Services/ProductsService";
import { appStore } from "../../../../Redux/Store";
import { productActions } from "../../../../Redux/ProductsSlice";

interface AdminPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function AdminPagination({
  totalPages,
  currentPage,
}: AdminPaginationProps): JSX.Element {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    if (page) {
      productsService
        .getProducts({
          page: page.toString(),
        })
        .then((products) => appStore.dispatch(productActions.initAll(products)))
        .catch((err: any) => notify.error(err));
    }
  }, [page]);
  return (
    <>
      {totalPages > 1 && (
        <div className=" flex items-center justify-center">
          <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-transparent p-6 rounded-lg shadow-sm">
            <nav
              className="flex justify-center space-x-2"
              aria-label="Pagination"
            >
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                disabled={currentPage === 1}
                className={
                  "relative inline-flex items-center px-4 py-2 text-sm  border border-fuchsia-100 hover:border-violet-100 text-black font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-white focus:z-10"
                }
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  type="button"
                  onClick={() => setPage(index + 1)}
                  disabled={currentPage === index + 1}
                  className={`px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    currentPage === index + 1 ? "bg-gray-900 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={currentPage === totalPages}
                type="button"
                className={
                  "relative inline-flex items-center px-4 py-2 text-sm  border border-fuchsia-100 hover:border-violet-100 text-black font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-white focus:z-10"
                }
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
