import { Link } from "react-router-dom";
import { Button } from "reactstrap";
export function LinkButton({ link, text, className }: ILinkButton) {
  return (
    <Link to="/">
      <Button className={className}>{text}</Button>
    </Link>
  );
}

interface ILinkButton {
  link: string;
  text: string;
  className?: string;
}
