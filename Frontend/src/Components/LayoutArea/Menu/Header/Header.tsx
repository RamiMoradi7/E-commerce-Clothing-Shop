import AuthMenu from "../../../AuthArea/AuthMenu/AuthMenu";

export default function Header(): JSX.Element {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto flex h-6 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block lg:flex-1"></div>
        <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
          Get free delivery on orders over 400₪
        </p>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <AuthMenu />
        </div>
      </div>
    </div>
  );
}
