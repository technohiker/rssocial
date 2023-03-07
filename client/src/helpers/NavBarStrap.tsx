import { v4 as uuid } from "uuid";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

/** Receives info for routes, which is created into multiple links.  Wrapped around ReactStrap components. */
export function NavBarStrap({ routes }: INavBarProps) {
  return (
    <>
      {routes.map(({ exact = true, path, text }) => (
        <NavItem key={uuid()}>
          <NavLink exact={exact} to={path}>
            {text}
          </NavLink>
        </NavItem>
      ))}
    </>
  );
}

export interface INavBarProps {
  routes: INavBar[];
}

export interface INavBar {
  exact?: boolean;
  path: string;
  text: string;
}
