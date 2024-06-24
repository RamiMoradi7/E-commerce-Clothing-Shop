import { useNavigate } from "react-router-dom";
import HeroSectionImage from "../../Assets/Images/HeroPage.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div className="hero text-left py-20 bg-deep-orange-50 bg-blend-multiply relative w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HeroSectionImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-20"></div>
        <div className="relative z-0">
          <div className="max-w-xl mx-auto text-white">
            <div className="mb-12">
              <p className="px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-teal-accent-400">
                Hello & Welcome !
              </p>
              <h2 className=" mb-6 text-opacity-20 text-4xl font-bold tracking-tight">
                Trendy Threads
              </h2>
              <p className="text-lg">
                Discover the latest in fashion at Trendy Threads Online. From
                stylish clothing to trendy shoes and accessories, we offer a
                curated selection that keeps you ahead of the curve.
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-full md:w-auto">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                <span className="mr-3">Start Shopping</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4"
                >
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    points="4,4 22,4 19,14 4,14 "
                  />
                  <circle
                    cx="4"
                    cy="22"
                    r="2"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                    stroke="none"
                    fill="currentColor"
                  />
                  <circle
                    cx="20"
                    cy="22"
                    r="2"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                    stroke="none"
                    fill="currentColor"
                  />
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    points="1,1 4,4 4,14 2,18 23,18 "
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
