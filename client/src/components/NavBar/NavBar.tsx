import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import { NavBarStrap, INavBar } from "../../helpers/NavBarStrap";

/** Display NavBar to let user navigate to different pages. */
export function NavBar({ text, routes }: INavProps) {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          {text}
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavBarStrap routes={routes} />
        </Nav>
      </Navbar>
    </div>
  );
}

interface INavProps {
  text: string;
  routes: INavBar[];
}
