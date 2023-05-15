import "./HamburgerButton.css";
import { ReactElement, useState } from "react";

export function HamburgerButton({ buttons }: IHamburgerButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleButtons = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* <button onClick={toggleButtons} className="hamburger-button"></button> */}
      <div className="hamburger-lines" onClick={toggleButtons}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
      <div
        className={`hamburger-options d-flex flex-column ${
          isVisible ? "" : "hidden"
        }`}
      >
        {buttons}
      </div>
    </>
  );
}
interface IHamburgerButtonProps {
  buttons: ReactElement<React.JSXElementConstructor<HTMLButtonElement>>[];
}
