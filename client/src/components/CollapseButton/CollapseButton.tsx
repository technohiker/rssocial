import "./CollapseButton.css";
import { Button } from "reactstrap";

/** Button shaped like an arrow.  Rotates, and runs function when clicked.
 *  Meant to be used to collapse/expand a section.
 */
export function CollapseButton({
  active,
  changeActive,
}: {
  active: boolean;
  changeActive: () => void;
}) {
  return (
    <Button
      className={`collapsable-button ${active ? "rotate-arrow" : ""}`}
      onClick={changeActive}
    >
      Hi
    </Button>
  );
}
