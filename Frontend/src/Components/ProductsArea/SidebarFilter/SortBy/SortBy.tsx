import { useSearchNavigate } from "../../../../hooks/useSearchNavigate";
import "./SortBy.css";

export default function SortBy(): JSX.Element {
  const { setSearchParam } = useSearchNavigate();

  function sortProductsByPrice(sortValue: string) {
    setSearchParam("priceSort", sortValue);
  }

  return (
    <>
      <div className="paste-button">
        <div className="dropdown-content">
          <ul className="text-sm text-gray-700 dark:text-gray-200">
            <li>
              <p
                id="top"
                onClick={() => {
                  sortProductsByPrice("high-to-low");
                }}
                className="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Price: High-Low
              </p>
            </li>
            <li>
              <p
                id="middle"
                onClick={() => sortProductsByPrice("low-to-high")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Price: Low-High
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
