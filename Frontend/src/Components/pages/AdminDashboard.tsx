import { CloseRounded, MenuSharp } from "@mui/icons-material";
import { useTitle } from "../../hooks/useTitle";
import { DashboardOption } from "../../types/DashboardOption";
import DashboardItem from "../AdminArea/DashboardItem/DashboardItem";
import {
  AudienceIcon,
  BrandIcon,
  CategoryIcon,
  ColorIcon,
  ProductIcon,
  SizeIcon,
} from "../AdminArea/Icons/Icons";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

export default function AdminDashboard(): JSX.Element {
  useTitle("Dashboard");
  const {
    isMenuOpen,
    setIsMenuOpen,
    selectedMenuItem,
    handleMenuItemClick,
    renderMenuItem,
  } = useAdminDashboard();

  const dashboardOptions: DashboardOption[] = [
    { name: "Products", svg: ProductIcon },
    { name: "Audiences", svg: AudienceIcon },
    { name: "Categories", svg: CategoryIcon },
    { name: "Brands", svg: BrandIcon },
    { name: "Sizes", svg: SizeIcon },
    { name: "Colors", svg: ColorIcon },
  ];

  return (
    <>
      <div className={isMenuOpen ? "flex" : "flex flex-col-reverse"}>
        {isMenuOpen && (
          <aside
            className={`${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } bg-gradient-to-br from-gray-800 to-gray-900 h-screen sticky top-4 my-4 ml-4 w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 transform`}
          >
            <div className="relative border-b border-white/20">
              <div className="flex items-center gap-4 py-6 px-8">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                  Admin Dashboard
                </h6>
              </div>
              <button
                className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <CloseRounded />
                </span>
              </button>
            </div>
            <div className="m-4">
              <ul className="mb-4 flex flex-col gap-1">
                {dashboardOptions.map((option) => (
                  <DashboardItem
                    key={option.name}
                    name={option.name}
                    svg={option.svg}
                    handleMenuItemClick={handleMenuItemClick}
                    selectedMenuItem={selectedMenuItem}
                  />
                ))}
              </ul>
            </div>
          </aside>
        )}
        <div className="p-2 xl:ml-10 flex flex-col items-center w-full">
          <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
              <div className="capitalize">
                <nav aria-label="breadcrumb" className="w-max">
                  <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                    <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                      <p
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                      >
                        dashboard
                      </p>

                      <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                        /
                      </span>
                    </li>
                    <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {selectedMenuItem}
                      </p>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="flex items-center">
                <button
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <MenuSharp />
                  </span>
                </button>
              </div>
            </div>
          </nav>
          <div className={`mt-2 transition-all  ${!isMenuOpen && " transition-all w-full"}`}>
            {renderMenuItem()}
          </div>
        </div>
      </div>
    </>
  );
}
