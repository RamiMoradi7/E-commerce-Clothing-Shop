import { useEffect, useState } from "react";
import { useSearchNavigate } from "../../../hooks/useSearchNavigate";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
}

export default function Pagination({
  currentPage,
  total,
  totalPages,
}: PaginationProps): JSX.Element {
  const { setSearchParam } = useSearchNavigate();
  const [page, setPage] = useState(currentPage);

  const handleNextClick = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setSearchParam("page", nextPage.toString());
  };

  const handlePreviousClick = () => {
    const prevPage = page - 1;
    setPage(prevPage);
    setSearchParam("page", prevPage.toString());
  };
  const handlePageNumberClick = (pageNumber: number) => {
    setPage(pageNumber);
    setSearchParam("page", pageNumber.toString());
  };
  useEffect(() => {
    if (currentPage > totalPages) {
      setSearchParam("page", totalPages.toString());
    } else {
      setPage(currentPage);
    }
  }, [currentPage, totalPages,setSearchParam]);

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
                onClick={handlePreviousClick}
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
                  onClick={() => handlePageNumberClick(index + 1)}
                  disabled={currentPage === index + 1}
                  className={`px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    currentPage === index + 1 ? "bg-gray-900 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextClick}
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
