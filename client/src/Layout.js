import { Outlet, Link } from "react-router-dom";
import "./styles/navbar.css"

const Layout = () => {
  return (
    <>
      <div className="navbar">
            <Link className="link-nav" to="/">Home</Link>
            <Link className="link-nav" to="/calculator">Calculator</Link>
            <Link className="link-nav" to="/information">Information</Link>
      </div>
      <Outlet />
    </>
  )
};

export default Layout;