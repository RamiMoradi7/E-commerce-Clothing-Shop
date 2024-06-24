import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { audiencesService } from "../../../Services/AudiencesService";
import { categoriesService } from "../../../Services/CategoriesService";
import { constructProductUrl } from "../../../Utils/ConstructProductUrl";
import { useCurrentUser } from "../../../Utils/CurrentUser";
import { useFetch } from "../../../hooks/useFetch";
import DashboardButton from "../../AdminArea/DashboardButton/DashboardButton";
import TrendyThreadsLogo from "../../Assets/Images/TrendyThreadsLogo.png";
import CartButton from "../../CartArea/Buttons/CartButton/CartButton";
import MenuSearch from "../../ProductsArea/SidebarFilter/SearchBar/MenuSearch";
import Header from "./Header/Header";
import MobileMenu from "./MobileMenu/MobileMenu";

export default function Menu(): JSX.Element {
  const { isAdmin } = useCurrentUser();
  const { result: audiences } = useFetch(audiencesService.getAll);
  const { result: categories } = useFetch(categoriesService.getAll);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAudience, setActiveAudience] = useState<string>("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };
  const handleSelectChange = (categoryId: string, subCategoryId: string) => {
    if (categoryId) {
      navigate(
        constructProductUrl({
          audience: activeAudience,
          category: categoryId,
          subCategory: subCategoryId,
        })
      );
      setActiveAudience(null);
    }
  };

  return (
    <>
      <MobileMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        audiences={audiences}
        categories={categories}
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
        handleSelectChange={handleSelectChange}
      />
      <header className="relative w-full">
        <nav aria-label="Top">
          <Header />

          {/* <!-- Secondary navigation --> */}
          <div className="bg-white">
            <div className=" max-w-full px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-24 items-center justify-between">
                  <div className="hidden lg:flex lg:items-center">
                    <NavLink to={"/"}>
                      <span className="sr-only">Trendy Threads</span>
                      <img
                        className="h-14 w-auto"
                        src={TrendyThreadsLogo}
                        alt="TrendyThreads logo"
                      />
                    </NavLink>
                  </div>
                  <div className="hidden h-full lg:flex">
                    <div className="mx-12">
                      <div className="flex h-full justify-center">
                        <div className="flex">
                          <div className="relative flex space-x-6">
                            {audiences?.map((a) => (
                              <button
                                key={a._id}
                                className={`border-transparent text-gray-700 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                                  activeAudience === a._id
                                    ? "border-indigo-600 text-indigo-600"
                                    : ""
                                }`}
                                onMouseEnter={() => setActiveAudience(a._id)}
                                onClick={() =>
                                  activeAudience === a._id
                                    ? setActiveAudience(null)
                                    : setActiveAudience(a._id)
                                }
                              >
                                {a.name}
                              </button>
                            ))}
                          </div>

                          <div
                            className={`absolute inset-x-0 top-full z-10 text-gray-500 sm:text-sm transition-all duration-200 ease-in-out ${
                              activeAudience !== null
                                ? "opacity-100 block"
                                : "opacity-0 pointer-events-none"
                            }`}
                            onMouseLeave={() => setActiveAudience(null)}
                          >
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            ></div>
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className=" gap-x-8 gap-y-10 pb-12 pt-10">
                                  <div className="flex justify-evenly w-full">
                                    {categories?.map((category) => (
                                      <div key={category._id}>
                                        <div className="flex items-center">
                                          <button
                                            className="font-medium  text-gray-900 hover:text-gray-600"
                                            onClick={() =>
                                              handleSelectChange(
                                                category._id,
                                                ""
                                              )
                                            }
                                          >
                                            {category.name}
                                          </button>
                                          <img
                                            src={category.imageUrl}
                                            alt={`${category.name}-img`}
                                            width={28}
                                            height={28}
                                            className="ml-3"
                                          />
                                        </div>
                                        <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                          {category.subCategories.map(
                                            (subCategory) => (
                                              <li
                                                className="flex"
                                                key={subCategory._id}
                                              >
                                                <div
                                                  onClick={() =>
                                                    handleSelectChange(
                                                      category._id,
                                                      subCategory._id
                                                    )
                                                  }
                                                  className="hover:text-gray-800"
                                                >
                                                  {subCategory.name}
                                                </div>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => toggleMenu()}
                    >
                      <span className="sr-only">Open menu</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </button>
                    <div className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MenuSearch />
                    </div>
                  </div>
                  <NavLink to={"/"} className="lg:hidden flex items-center">
                    <span className="sr-only">Trendy Threads</span>
                    <img
                      src={TrendyThreadsLogo}
                      className="h-10 w-auto"
                      alt="Trendy Threads Logo"
                    />
                  </NavLink>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:-ml-8">
                      <div className="flex space-x-6">
                        <div className="hidden lg:flex">
                          <div className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <MenuSearch />
                          </div>
                        </div>
                      </div>
                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      ></span>
                      <div className="flow-root">
                        <div className="group -m-2 flex items-center p-2">
                          {isAdmin ? <DashboardButton /> : <CartButton />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
