import { Icon } from "../Icon/Icon";
import "./HamburgerButton.css";
import { ReactElement, useState, useRef, useEffect } from "react";

export function HamburgerButton({ buttons }: IHamburgerButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  /** Adds event listener for when mouse click occurs outside of hamburger button/menu. */
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  //Checks if hamburger button was clicked, and if so, toggle it.
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        ref={buttonRef}
        tabIndex={0}
        className="hamburger-lines"
        onClick={handleButtonClick}
      >
        <Icon name="hamburger" />
      </div>
      <div
        ref={menuRef}
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
