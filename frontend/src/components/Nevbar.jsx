import { NavLink } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar">
        <NavLink to="/" className="navbar-logo">
                Car<span>Deal</span>
            </NavLink>
            <div className="navbar-links">
                <NavLink to="/cars">Cars</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register" className="register-link">
                    Register
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;