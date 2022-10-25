import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { NAV_DATA } from "../../const";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        {NAV_DATA.map(({ path, heading }, index) => {
          return (
            <CustomLink to={path} key={index}>
              {heading}
            </CustomLink>
          );
        })}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
