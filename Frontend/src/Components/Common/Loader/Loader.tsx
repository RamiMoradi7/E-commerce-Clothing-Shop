import LoaderImage from "../../Assets/Images/LandingPageShoes.jpg";

export default function Loader(): JSX.Element {
  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <img src={LoaderImage} className="rounded-full h-28 w-28" alt="" />
    </div>
  );
}
