import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(savedUser);

        if (user.role !== "admin") {
            return <Navigate to="/cars" replace />;
        }

        return children;
    } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return <Navigate to="/login" replace />;
    }
}

export default AdminRoute;