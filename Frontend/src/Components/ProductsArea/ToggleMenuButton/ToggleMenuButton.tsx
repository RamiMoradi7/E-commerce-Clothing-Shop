import "./ToggleMenuButton.css";
interface ToggleMenuButtonProps {
  setIsFilterMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToggleMenuButton({
  setIsFilterMenuHidden,
}: ToggleMenuButtonProps): JSX.Element {

  return (
    <div className="checkbox-wrapper-35 hidden lg:block w-36">
      <input
        value="private"
        name="switch"
        id="switch"
        type="checkbox"
        className="switch"
        onClick={() => setIsFilterMenuHidden((open) => !open)}
      />

      <label htmlFor="switch">
        <span className="switch-x-toggletext">
          <span className="switch-x-unchecked">
            <span className="switch-x-hiddenlabel"> </span>Hide
          </span>
          <span className="switch-x-checked">
            <span className="switch-x-hiddenlabel"> </span>Show
          </span>
        </span>
        <span className="switch-x-text ml-2">Filters</span>
      </label>
    </div>
  );
}
