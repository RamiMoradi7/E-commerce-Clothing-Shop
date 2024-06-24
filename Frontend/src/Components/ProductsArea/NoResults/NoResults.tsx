import NoResultsImage from "../../Assets/Images/NoResults.png";

export default function NoResults(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-full mt-6">
      <div className="bg-gray-100 border border-red-300 p-8 rounded-lg shadow-md text-center">
        <p className="text-3xl text-gray-700 font-bold mb-4">
          Oops, no results found!
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Please try again with different criteria.
        </p>
        <img
          src={NoResultsImage}
          alt="No Results Found"
          className="w-64 h-64 object-contain mx-auto"
        />
      </div>
    </div>
  );
}
