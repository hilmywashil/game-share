import { Navigate } from "react-router-dom";

const AdminCheck = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AdminCheck;
