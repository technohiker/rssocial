import "./CollapseButton.css";
import { Button } from "reactstrap";

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
