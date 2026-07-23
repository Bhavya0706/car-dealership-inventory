import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Nevbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (savedUser && token) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Car Dealership
                </Link>

                <nav className="navbar-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/cars"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Cars
                    </NavLink>

                    {user?.role === "admin" && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Admin Dashboard
                        </NavLink>
                    )}
                </nav>

                <div className="navbar-auth">
                    {user ? (
                        <>
                            <span className="navbar-username">
                                Hi, {user.name}
                            </span>

                            <button
                                type="button"
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="login-link"
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="register-link"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;