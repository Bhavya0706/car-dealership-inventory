import { useEffect, useState } from "react";
import {
    Link,
    NavLink,
    useLocation,
    useNavigate
} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
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
            <Link to="/" className="navbar-logo">
                Car Dealership
            </Link>

            <nav className="navbar-links">
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
        </header>
    );
}

export default Navbar;